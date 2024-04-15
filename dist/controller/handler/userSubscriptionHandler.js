"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userSubscriptionRouteOptions", {
    enumerable: true,
    get: function() {
        return userSubscriptionRouteOptions;
    }
});
const _API = require("../../models/API");
const _calculateRechargeDate = require("../../utils/calculateRechargeDate");
const _userSubscriptionSchema = require("../schema/userSubscriptionSchema");
async function userSubscriptionHandler(request, reply) {
    try {
        const body = request.body;
        // Check if user already has an active subscription
        const existingSubscription = await _API.API.findOne({
            userId: body.userId,
            endDate: {
                $gte: new Date()
            }
        });
        if (existingSubscription) {
            throw new Error("User already has an active subscription.");
        }
        // Calculate the end date of the subscription based on the start date and duration
        const endDate = await (0, _calculateRechargeDate.calculateEndDateFromStartDate)(new Date(), "28D");
        // Update the existing subscription with the new plan and end date
        const updatedSubscription = await _API.API.findOneAndUpdate({
            userId: body.userId
        }, {
            plan: body.plan,
            endDate: endDate
        }, {
            new: true
        });
        // Send the response with updated subscription details
        reply.send({
            subscriptionDetails: updatedSubscription
        });
    } catch (error) {
        throw error;
    }
}
const userSubscriptionRouteOptions = {
    schema: _userSubscriptionSchema.userSubscriptionRouteSchema,
    handler: userSubscriptionHandler
};
