"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "multipleTokenRefreshRouteOptions", {
    enumerable: true,
    get: function() {
        return multipleTokenRefreshRouteOptions;
    }
});
const _API = require("../../models/API");
const _apiService = require("../../services/apiService");
async function multipleTokenRefreshHandler(request, reply) {
    try {
        // Fetch active API credentials from the database
        const accounts = await _API.API.find({
            endDate: {
                $gt: new Date()
            }
        });
        // Check if active APIs are found
        if (accounts.length === 0) {
            throw new Error("Sorry, no active accounts found!");
        }
        const rateLimit = 1; // Requests per second
        const delay = 1050 / rateLimit; // Delay in milliseconds between each request
        for (const account of accounts){
            const data = {
                refreshToken: account.refreshToken
            };
            try {
                // Call tokensRefreshService to get refreshed tokens
                const response = await (0, _apiService.tokensRefreshService)(data, account.jwtToken);
                if (!response) {
                    throw new Error("Error refreshing tokens for account with userId: " + account.userId);
                }
                // Update AngelApi document with the new tokens
                await _API.API.findOneAndUpdate({
                    userId: account.userId
                }, {
                    jwtToken: response.jwtToken,
                    refreshToken: response.refreshToken,
                    feedToken: response.feedToken
                }, {
                    new: true
                });
            } catch (error) {
                continue;
            }
            // Wait for the delay before processing the next account
            await new Promise((resolve)=>setTimeout(resolve, delay));
        }
        // Send a success response
        reply.send({
            message: "Tokens for all active accounts have been successfully refreshed."
        });
    } catch (error) {
        throw error;
    }
}
const multipleTokenRefreshRouteOptions = {
    schema: {},
    handler: multipleTokenRefreshHandler
};
