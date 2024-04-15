"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "multipleOrderCancelRouteOptions", {
    enumerable: true,
    get: function() {
        return multipleOrderCancelRouteOptions;
    }
});
const _API = require("../../../models/API");
const _Order = require("../../../models/Order");
const _TempOrder = require("../../../models/TempOrder");
const _apiService = require("../../../services/apiService");
const _orderCancelSchema = require("../../schema/orderCancelSchema");
async function processBatchOfOrders(accounts, body, rateLimit) {
    const delay = 1000 / rateLimit; // Calculate delay based on rate limit
    for (const account of accounts){
        try {
            // Find and move temporary orders to permanent orders
            const tempOrders = await _TempOrder.TempOrder.find({
                userId: account._id
            });
            for (const tempOrder of tempOrders){
                const newOrder = new _Order.Order({
                    userId: tempOrder.userId,
                    orderid: tempOrder.orderid,
                    script: tempOrder.script,
                    uniqueorderid: tempOrder.uniqueorderid,
                    type: tempOrder.type
                });
                const data = {
                    variety: "NORMAL",
                    orderid: tempOrder.orderid
                };
                // Cancel order using the orderCancelService
                const response = await (0, _apiService.orderCancelService)(data, account.jwtToken);
                if (!response) {
                    throw new Error("Invalid response from the API");
                }
                // Save the new permanent order to the Order collection
                await newOrder.save();
                // Delete the processed temporary order
                await tempOrder.deleteOne();
            }
            // Introduce delay to respect rate limit
            await new Promise((resolve)=>setTimeout(resolve, delay));
        } catch (error) {
            throw error;
        }
    }
}
async function multipleOrderCancelHandler(request, reply) {
    try {
        const body = request.body;
        const accounts = await _API.API.find({
            endDate: {
                $gt: new Date()
            }
        });
        if (accounts.length === 0) {
            throw new Error("Accounts Not Found");
        }
        const rateLimit = 15; // Requests per second (adjust as needed)
        // Process and cancel orders for each account
        await processBatchOfOrders(accounts, body, rateLimit);
        reply.send({
            message: `Orders successfully canceled for ${accounts.length} accounts.`,
            success: true
        });
    } catch (error) {
        throw error;
    }
}
const multipleOrderCancelRouteOptions = {
    schema: _orderCancelSchema.orderCancelRouteSchema,
    handler: multipleOrderCancelHandler
};
