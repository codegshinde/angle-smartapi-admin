"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "multipleOrderPlaceRouteOptions", {
    enumerable: true,
    get: function() {
        return multipleOrderPlaceRouteOptions;
    }
});
const _API = require("../../../models/API");
const _Order = require("../../../models/Order");
const _TempOrder = require("../../../models/TempOrder");
const _apiService = require("../../../services/apiService");
const _orderPlaceSchema = require("../../schema/orderPlaceSchema");
async function processBatchOfOrders(accounts, body, rateLimit) {
    const delay = 1000 / rateLimit; // Calculate delay based on rate limit
    const tempNewOrders = []; // Temporary array to store new orders
    for (const account of accounts){
        try {
            const data = {
                ...body,
                quantity: account.quantity
            };
            const response = await (0, _apiService.orderPlaceService)(data, account.jwtToken);
            if (!response || !response.orderid || !response.script) {
                throw new Error("Invalid response from external API");
            }
            // Add new order to the temporary array
            tempNewOrders.push({
                userId: account._id,
                orderid: response.orderid,
                script: response.script,
                uniqueorderid: response.uniqueorderid,
                type: body.transactiontype
            });
            // Introduce delay to respect rate limit
            await new Promise((resolve)=>setTimeout(resolve, delay));
        } catch (error) {
            throw error;
        }
    }
    return tempNewOrders;
}
async function moveTempOrdersToPermanent(accounts) {
    for (const account of accounts){
        // Find all temporary orders for the current account
        const tempOrders = await _TempOrder.TempOrder.find({
            userId: account.userId
        });
        // Process each temporary order
        for (const tempOrder of tempOrders){
            // Create a new permanent order
            const newOrder = new _Order.Order({
                userId: tempOrder.userId,
                orderid: tempOrder.orderid,
                script: tempOrder.script,
                uniqueorderid: tempOrder.uniqueorderid,
                type: tempOrder.type
            });
            // Save the new permanent order to the Order collection
            await newOrder.save();
            // Delete the processed temporary order
            await tempOrder.deleteOne();
        }
    }
}
async function multipleOrderPlaceHandler(request, reply) {
    try {
        const body = request.body;
        const makeOrder = {
            ...body,
            variety: "NORMAL",
            exchange: "NFO",
            ordertype: "MARKET",
            producttype: "INTRADAY",
            duration: "DAY",
            stoploss: 0
        };
        const accounts = await _API.API.find({
            endDate: {
                $gt: new Date()
            }
        });
        if (!accounts.length) {
            return reply.code(404).send({
                error: "Accounts Not Found"
            });
        }
        const rateLimit = 15; // Requests per second (adjust as needed)
        // Place new orders and store in tempNewOrders array
        const tempNewOrders = await processBatchOfOrders(accounts, makeOrder, rateLimit);
        // Move temporary orders to permanent orders
        await moveTempOrdersToPermanent(accounts);
        // Save orders from tempNewOrders to TempOrder collection
        await _TempOrder.TempOrder.insertMany(tempNewOrders);
        reply.send({
            message: `Orders successfully placed for ${accounts.length} accounts.`,
            success: true
        });
    } catch (error) {
        throw error;
    }
}
const multipleOrderPlaceRouteOptions = {
    schema: _orderPlaceSchema.orderPlaceRouteSchema,
    handler: multipleOrderPlaceHandler
};
