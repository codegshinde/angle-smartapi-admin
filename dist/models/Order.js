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
    tradingsymbol: {
        type: String,
        required: true
    },
    symboltoken: {
        type: String,
        required: true
    },
    transactiontype: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Order = (0, _mongoose.model)("orders", orderSchema);
