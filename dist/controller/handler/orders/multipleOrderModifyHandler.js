"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "multipleOrderModifyRouteOptions", {
    enumerable: true,
    get: function() {
        return multipleOrderModifyRouteOptions;
    }
});
const _API = require("../../../models/API");
const _TempOrder = require("../../../models/TempOrder");
const _apiService = require("../../../services/apiService");
const _orderModifySchema = require("../../schema/orderModifySchema");
const RATE_LIMIT = 15;
/**
 * Process batch of orders for a given set of accounts.
 *
 * @param accounts - The accounts to modify orders for.
 * @param body - The order details to be modified.
 * @param rateLimit - The rate limit to control the concurrency of requests.
 */ async function processBatchOfOrders(accounts, body, rateLimit) {
    const delay = 1000 / rateLimit; // Calculate delay based on rate limit
    for (const account of accounts){
        await new Promise((resolve)=>setTimeout(resolve, delay));
        try {
            const tempOrders = await _TempOrder.TempOrder.find({
                userId: account._id
            });
            for (const tempOrder of tempOrders){
                body.orderid = tempOrder.orderid;
                const response = await (0, _apiService.orderModifyService)(body, account.jwtToken);
                if (!response || !response.data.orderid || !response.data.uniqueorderid) {
                    throw new Error("Invalid response from external API" + response.message);
                }
                await _TempOrder.TempOrder.updateOne({
                    orderid: tempOrder.orderid
                }, {
                    $set: {
                        uniqueorderid: response.data.uniqueorderid
                    }
                });
            }
        } catch (error) {
            console.error(`Error processing account ${account._id}:`, error);
        }
    }
}
/**
 * Handler function for the multiple order modify route.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */ const multipleOrderModifyHandler = async (request, reply)=>{
    try {
        const body = request.body;
        const accounts = await _API.API.find({
            endDate: {
                $gt: new Date()
            }
        });
        if (!accounts.length) {
            throw new Error("Accounts Not Found");
        }
        await processBatchOfOrders(accounts, body, RATE_LIMIT);
        reply.send({
            message: `Orders successfully modified for ${accounts.length} accounts.`,
            success: true
        });
    } catch (error) {
        console.error("Error processing multiple order modifies:", error);
        throw error;
    }
};
const multipleOrderModifyRouteOptions = {
    schema: _orderModifySchema.orderModifyRouteSchema,
    handler: multipleOrderModifyHandler
};
