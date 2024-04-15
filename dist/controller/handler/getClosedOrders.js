"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getClosedOrdersRouteOptions", {
    enumerable: true,
    get: function() {
        return getClosedOrdersRouteOptions;
    }
});
const _API = require("../../models/API");
const _Order = require("../../models/Order");
async function getClosedOrders(request, reply) {
    try {
        // Select the last record details
        const oldestAccount = await _API.API.findOne({}).sort({
            _id: 1
        }).limit(1);
        // If the lastTempOrder is found, send it in the response
        if (!oldestAccount) {
            throw new Error("User Not Found");
        }
        const selectOrders = await _Order.Order.find({
            userId: oldestAccount._id
        });
        if (!selectOrders) {
            throw new Error("Orders not found");
        }
        reply.send({
            order: selectOrders,
            message: "orders not found!"
        });
    } catch (error) {
        // If an error occurs during the execution, throw the error
        throw error;
    }
}
const getClosedOrdersRouteOptions = {
    schema: {},
    handler: getClosedOrders
};
