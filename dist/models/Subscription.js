"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Subscription", {
    enumerable: true,
    get: function() {
        return Subscription;
    }
});
const _mongoose = require("mongoose");
const subscriptionSchema = new _mongoose.Schema({
    userId: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
    },
    plan: {
        type: String,
        enum: [
            "basic",
            "standard",
            "premium"
        ],
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});
const Subscription = (0, _mongoose.model)("subscriptions", subscriptionSchema);
