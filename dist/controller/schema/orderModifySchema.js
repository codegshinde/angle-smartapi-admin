"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "orderModifyRouteSchema", {
    enumerable: true,
    get: function() {
        return orderModifyRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    variety: _typebox.Type.String(),
    orderid: _typebox.Type.String(),
    ordertype: _typebox.Type.String(),
    producttype: _typebox.Type.String(),
    duration: _typebox.Type.String(),
    tradingsymbol: _typebox.Type.String(),
    symboltoken: _typebox.Type.String(),
    exchange: _typebox.Type.String()
});
const orderModifyRouteSchema = {
    body: options
};
