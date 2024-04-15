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
async function processBatchOfOrders(accounts, body, rateLimit) {
    const delay = 1000 / rateLimit; // Calculate delay based on rate limit
    for (const account of accounts){
        try {
            // Find all temporary orders for the current account
            const tempOrders = await _TempOrder.TempOrder.find({
                userId: account._id
            });
            // Process each temporary order
            for (const tempOrder of tempOrders){
                // Modify the temporary order using the orderModifyService
                body.orderid = tempOrder.orderid;
                const response = await (0, _apiService.orderModifyService)(body, account.jwtToken);
                // Update the TempOrder document in the database with the new uniqorderid
                console.log(response);
                await _TempOrder.TempOrder.updateOne({
                    orderid: tempOrder.orderid
                }, {
                    $set: {
                        uniqueorderid: response.uniqueorderid
                    }
                });
                // Introduce delay to respect rate limit
                await new Promise((resolve)=>setTimeout(resolve, delay));
            }
        } catch (error) {
            throw error;
        }
    }
}
async function multipleOrderModifyHandler(request, reply) {
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
        // Process and modify orders for each account
        await processBatchOfOrders(accounts, body, rateLimit);
        reply.send({
            message: `Orders successfully modified for ${accounts.length} accounts.`,
            success: true
        });
    } catch (error) {
        throw error;
    }
}
const multipleOrderModifyRouteOptions = {
    schema: _orderModifySchema.orderModifyRouteSchema,
    handler: multipleOrderModifyHandler
};
