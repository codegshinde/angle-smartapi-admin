"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Tradingsymbol", {
    enumerable: true,
    get: function() {
        return Tradingsymbol;
    }
});
const _mongoose = require("mongoose");
const symbolSchema = new _mongoose.Schema({
    tradingsymbol: {
        type: String,
        required: true
    },
    symboltoken: {
        type: String,
        required: true
    },
    exchange: {
        type: String,
        required: true
    }
});
const Tradingsymbol = (0, _mongoose.model)("symbols", symbolSchema);
