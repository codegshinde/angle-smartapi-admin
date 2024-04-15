"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "searchScripRouteOptions", {
    enumerable: true,
    get: function() {
        return searchScripRouteOptions;
    }
});
const _API = require("../../models/API");
const _apiService = require("../../services/apiService");
async function searchScripHandler(request, reply) {
    try {
        const body = request.body;
        const account = await _API.API.findOne({
            endDate: {
                $gt: new Date()
            }
        });
        if (!account) {
            throw new Error("No Account Found");
        }
        const data = {
            exchange: body.exchange,
            searchscrip: body.searchscrip
        };
        const response = await (0, _apiService.searchScripService)(data, account.jwtToken);
        if (!response) {
            throw new Error("Not Data Found!");
        }
        reply.send({
            symbolTokens: response,
            message: "Token Fetched Successfully."
        });
    } catch (error) {
        throw error;
    }
}
const searchScripRouteOptions = {
    schema: {},
    handler: searchScripHandler
};
