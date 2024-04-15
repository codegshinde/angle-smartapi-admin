"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "multipleOrderExitRouteOptions", {
    enumerable: true,
    get: function() {
        return multipleOrderExitRouteOptions;
    }
});
const _API = require("../../../models/API");
const _Order = require("../../../models/Order");
const _TempOrder = require("../../../models/TempOrder");
const _apiService = require("../../../services/apiService");
const _calculateQuantityByScript = require("../../../utils/calculateQuantityByScript");
const RATE_LIMIT = 15;
/**
 * Process batch orders for a single account.
 *
 * @param account - The account to process orders for.
 */ async function processBatchOrdersForAccount(account) {
    const order = await _TempOrder.TempOrder.findOne({
        userId: account._id
    });
    if (!order) {
        return;
    }
    const quantity = await (0, _calculateQuantityByScript.calculateQuantityByScript)(order.tradingsymbol, account.quantity);
    const createOrder = {
        exchange: "NFO",
        duration: "DAY",
        ordertype: "MARKET",
        producttype: "INTRADAY",
        tradingsymbol: order.tradingsymbol,
        symboltoken: order.symboltoken,
        variety: "NORMAL",
        transactiontype: "SELL",
        quantity
    };
    try {
        const response = await (0, _apiService.orderPlaceService)(createOrder, account.jwtToken);
        if (!response.data || !response.data.orderid || !response.data.script) {
            console.error(`Invalid response from API for account ${account._id}`);
        }
    } catch (error) {
        console.error(`Error processing account ${account._id}:`, error);
    }
}
/**
 * Move temporary orders to permanent orders for a single account.
 *
 * @param account - The account to move orders for.
 */ async function moveTempOrdersToPermanent(account) {
    try {
        const tempOrders = await _TempOrder.TempOrder.find({
            userId: account._id
        });
        if (!tempOrders.length) {
            throw new Error("No Transaction Found!");
        }
        for (const tempOrder of tempOrders){
            const newOrder = new _Order.Order({
                userId: tempOrder.userId,
                orderid: tempOrder.orderid,
                tradingsymbol: tempOrder.tradingsymbol,
                symboltoken: tempOrder.symboltoken,
                uniqueorderid: tempOrder.uniqueorderid,
                transactiontype: tempOrder.transactiontype
            });
            await newOrder.save();
            await tempOrder.deleteOne();
        }
    } catch (error) {
        console.error(`Error moving temp orders for account ${account.userId}:`, error);
    }
}
/**
 * Handler function for the multiple order exit route.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */ const multipleOrderExitHandler = async (request, reply)=>{
    try {
        const accounts = await _API.API.find({
            endDate: {
                $gt: new Date()
            }
        });
        if (!accounts.length) {
            throw new Error("Accounts Not Found");
        }
        for (const account of accounts){
            await processBatchOrdersForAccount(account);
            await moveTempOrdersToPermanent(account);
            await new Promise((resolve)=>setTimeout(resolve, 1000 / RATE_LIMIT));
        }
        reply.send({
            message: `Orders successfully moved to permanent orders for ${accounts.length} accounts.`,
            success: true
        });
    } catch (error) {
        console.error("Error processing multiple order exits:", error);
        throw error;
    }
};
const multipleOrderExitRouteOptions = {
    schema: {},
    handler: multipleOrderExitHandler
};
