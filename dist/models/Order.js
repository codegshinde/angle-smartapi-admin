"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Order", {
    enumerable: true,
    get: function() {
        return Order;
    }
});
const _mongoose = require("mongoose");
const orderSchema = new _mongoose.Schema({
    userId: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
    },
    orderid: {
        type: String,
        required: true
    },
    uniqueorderid: {
        type: String,
        required: true
    },
    script: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Order = (0, _mongoose.model)("orders", orderSchema);
