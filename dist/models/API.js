"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "API", {
    enumerable: true,
    get: function() {
        return API;
    }
});
const _mongoose = require("mongoose");
const angelApiSchema = new _mongoose.Schema({
    userId: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    quantity: {
        type: String,
        required: true
    },
    totpSecret: {
        type: String,
        required: true
    },
    jwtToken: {
        type: String,
        required: false
    },
    refreshToken: {
        type: String,
        required: false
    },
    feedToken: {
        type: String,
        required: false
    },
    clientCode: {
        type: String,
        required: true,
        unique: true
    },
    pin: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    plan: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
});
const API = (0, _mongoose.model)("apis", angelApiSchema);
