"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "orderCancelRouteSchema", {
    enumerable: true,
    get: function() {
        return orderCancelRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    variety: _typebox.Type.String(),
    orderid: _typebox.Type.String()
});
const orderCancelRouteSchema = {
    body: options
};
