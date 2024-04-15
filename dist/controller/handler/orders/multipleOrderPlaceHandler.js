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
const _calculateQuantityByScript = require("../../../utils/calculateQuantityByScript");
const _orderPlaceSchema = require("../../schema/orderPlaceSchema");
const RATE_LIMIT = 15;
/**
 * Process batch of orders for a given set of accounts.
 *
 * @param accounts - The accounts to place orders for.
 * @param body - The order details to be placed.
 * @returns Promise<any[]>
 */ async function processBatchOfOrders(accounts, body) {
    const delay = 1000 / RATE_LIMIT;
    const tempNewOrders = [];
    for (const account of accounts){
        const quantity = await (0, _calculateQuantityByScript.calculateQuantityByScript)(body.tradingsymbol, account.quantity);
        const data = {
            exchange: "NFO",
            duration: "DAY",
            ordertype: "MARKET",
            producttype: "INTRADAY",
            tradingsymbol: body.tradingsymbol,
            symboltoken: body.symboltoken,
            variety: "NORMAL",
            transactiontype: "BUY",
            quantity
        };
        try {
            const response = await (0, _apiService.orderPlaceService)(data, account.jwtToken);
            if (!response || !response.data.orderid || !response.data.script) {
                throw new Error("Invalid response from external API" + response.message);
            }
            tempNewOrders.push({
                userId: account._id,
                orderid: response.data.orderid,
                tradingsymbol: response.data.script,
                symboltoken: data.symboltoken,
                uniqueorderid: response.data.uniqueorderid,
                transactiontype: body.transactiontype
            });
            await new Promise((resolve)=>setTimeout(resolve, delay));
        } catch (error) {
            console.error(`Error processing account ${account._id}:`, error);
        }
    }
    return tempNewOrders;
}
/**
 * Move temporary orders to permanent orders for a given set of accounts.
 *
 * @param accounts - The accounts to move orders for.
 */ async function moveTempOrdersToPermanent(accounts) {
    for (const account of accounts){
        const tempOrders = await _TempOrder.TempOrder.find({
            userId: account.userId
        });
        for (const tempOrder of tempOrders){
            const newOrder = new _Order.Order({
                userId: tempOrder.userId,
                orderid: tempOrder.orderid,
                tradingsymbol: tempOrder.tradingsymbol,
                symboltoken: tempOrder.symboltoken,
                uniqueorderid: tempOrder.uniqueorderid,
                type: tempOrder.transactiontype
            });
            await newOrder.save();
            await tempOrder.deleteOne();
        }
    }
}
/**
 * Handler function for placing multiple orders.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */ const placeOrderHandler = async (request, reply)=>{
    try {
        const body = request.body;
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
        const tempNewOrders = await processBatchOfOrders(accounts, body);
        await moveTempOrdersToPermanent(accounts);
        await _TempOrder.TempOrder.insertMany(tempNewOrders);
        reply.send({
            message: `Orders successfully placed for ${accounts.length} accounts.`,
            success: true
        });
    } catch (error) {
        console.error("Error processing multiple orders:", error);
        reply.code(500).send({
            error: "Internal Server Error"
        });
    }
};
const multipleOrderPlaceRouteOptions = {
    schema: _orderPlaceSchema.orderPlaceRouteSchema,
    handler: placeOrderHandler
};
