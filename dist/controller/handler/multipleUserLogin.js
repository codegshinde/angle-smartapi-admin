"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "multipleUserLoginRouteOptions", {
    enumerable: true,
    get: function() {
        return multipleUserLoginRouteOptions;
    }
});
const _otplib = require("otplib");
const _API = require("../../models/API");
const _apiService = require("../../services/apiService");
async function multipleUserLogin(request, reply) {
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
        // Process each account independently
        for (const account of accounts){
            try {
                const secret = account.totpSecret; // Replace with the property name of TOTP secret in your AngelApi model
                const totp = _otplib.authenticator.generate(secret);
                // Construct data for login API call
                const data = {
                    clientcode: account.clientCode,
                    password: account.pin,
                    totp: totp
                };
                // Call login API service
                const response = await (0, _apiService.loginAndSaveApiService)(data);
                // Update necessary fields in the AngelApi document
                await _API.API.findOneAndUpdate({
                    userId: account.userId
                }, {
                    $set: {
                        jwtToken: response.jwtToken,
                        refreshToken: response.refreshToken,
                        feedToken: response.feedToken
                    }
                }, {
                    new: true,
                    upsert: true
                } // Update existing or insert new document
                );
                // Introduce delay of 1.2 seconds before processing the next account
                await new Promise((resolve)=>setTimeout(resolve, 1200)); // 1200 milliseconds = 1.2 seconds
            } catch (error) {
                console.error(`Error occurred for account with userId ${account.userId}:`, error);
            }
        }
        // Send a success response
        reply.send({
            message: "All accounts logged in successfully."
        });
    } catch (error) {
        throw error;
    }
}
const multipleUserLoginRouteOptions = {
    schema: {},
    handler: multipleUserLogin
};
