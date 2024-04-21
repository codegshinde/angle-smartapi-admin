"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "startMultipleUserLoginCron", {
    enumerable: true,
    get: function() {
        return startMultipleUserLoginCron;
    }
});
const _cron = require("cron");
const _otplib = require("otplib");
const _API = require("../models/API");
const _apiService = require("../services/apiService");
const RATE_LIMIT = 15; // Requests per second (adjust as needed)
async function processBatchOfAccounts(accounts, rateLimit) {
    const delay = 1000 / rateLimit; // Calculate delay based on rate limit
    for (const account of accounts){
        try {
            const secret = account.totpSecret;
            const totp = _otplib.authenticator.generate(secret);
            // Construct data for login API call
            const data = {
                clientcode: account.clientCode,
                password: account.pin,
                totp: totp
            };
            // Call login API service
            const response = await (0, _apiService.loginAndSaveApiService)(data);
            if (!response || !response.data.jwtToken || !response.data.refreshToken || !response.data.feedToken) {
                throw new Error("Invalid response from external API" + response.message);
            }
            // Update necessary fields in the API document
            await _API.API.findOneAndUpdate({
                userId: account.userId
            }, {
                $set: {
                    jwtToken: response.data.jwtToken,
                    refreshToken: response.data.refreshToken,
                    feedToken: response.data.feedToken
                }
            }, {
                new: true,
                upsert: true
            } // Update existing or insert new document
            );
            await new Promise((resolve)=>setTimeout(resolve, delay));
        } catch (error) {
            console.error(`Error occurred for account with userId ${account.userId}:`, error);
        }
    }
}
async function handleMultipleUserLogin() {
    try {
        const accounts = await _API.API.find({
            endDate: {
                $gt: new Date()
            }
        });
        if (!accounts.length) {
            throw new Error("Accounts Not Found");
        }
        await processBatchOfAccounts(accounts, RATE_LIMIT);
        console.log({
            message: "All accounts logged in successfully."
        });
    } catch (error) {
        console.error("Error processing multiple user login:", error);
        throw error;
    }
}
const startMultipleUserLoginCron = async ()=>{
    try {
        _cron.CronJob.from({
            cronTime: "0 5 9 * * 1-5",
            onTick: handleMultipleUserLogin,
            start: true,
            timeZone: "Asia/Kolkata"
        });
        console.log("Multiple user login cron job scheduled to run at 9:05 AM IST from Monday to Friday.");
    } catch (error) {
        console.error("Error starting the multiple user login cron job:", error);
    }
};
