"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TempOrder", {
    enumerable: true,
    get: function() {
        return TempOrder;
    }
});
const _mongoose = require("mongoose");
const TempOrderSchema = new _mongoose.Schema({
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
const TempOrder = (0, _mongoose.model)("tempOrders", TempOrderSchema);
