"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getLTPRouteOptions", {
    enumerable: true,
    get: function() {
        return getLTPRouteOptions;
    }
});
const _API = require("../../models/API");
const _apiService = require("../../services/apiService");
const _getLTPSchema = require("../schema/getLTPSchema");
async function getLTPHandler(request, reply) {
    try {
        const body = request.body;
        const user = await _API.API.findOne({}).sort({
            _id: -1
        });
        // If the lastTempOrder is found, send it in the response
        if (!user) {
            throw new Error("No last order found");
        }
        const response = await (0, _apiService.ltpService)(body, user.jwtToken);
        if (!response) {
            throw new Error("Response not found!");
        }
        reply.send({
            ltp: response,
            message: "LTP For Stock"
        });
    } catch (error) {
        throw error;
    }
}
const getLTPRouteOptions = {
    schema: _getLTPSchema.getLTPRouteSchema,
    handler: getLTPHandler
};
