"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "searchSymbolAndTokenSchema", {
    enumerable: true,
    get: function() {
        return searchSymbolAndTokenSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    exchange: _typebox.Type.String(),
    searchscrip: _typebox.Type.String()
});
const searchSymbolAndTokenSchema = {
    body: options
};
