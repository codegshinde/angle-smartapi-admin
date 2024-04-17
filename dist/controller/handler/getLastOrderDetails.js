"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getLastOrderRouteOptions", {
    enumerable: true,
    get: function() {
        return getLastOrderRouteOptions;
    }
});
const _TempOrder = require("../../models/TempOrder");
async function getLastOrderDetailsHandler(request, reply) {
    try {
        // Select the last record details
        const lastTempOrder = await _TempOrder.TempOrder.findOne({}).sort({
            _id: -1
        });
        // If the lastTempOrder is found, send it in the response
        if (!lastTempOrder) {
            reply.send({
                message: "No previous orders found."
            });
            return;
        }
        reply.send({
            order: lastTempOrder,
            message: "last record found!"
        });
    } catch (error) {
        // If an error occurs during the execution, throw the error
        throw error;
    }
}
const getLastOrderRouteOptions = {
    schema: {},
    handler: getLastOrderDetailsHandler
};
