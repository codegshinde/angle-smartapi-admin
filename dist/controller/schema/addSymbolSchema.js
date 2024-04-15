"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addSymbolRouteSchema", {
    enumerable: true,
    get: function() {
        return addSymbolRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    exchange: _typebox.Type.String(),
    tradingsymbol: _typebox.Type.String(),
    symboltoken: _typebox.Type.String()
});
const addSymbolRouteSchema = {
    body: options
};
