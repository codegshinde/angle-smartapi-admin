"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "orderPlaceRouteSchema", {
    enumerable: true,
    get: function() {
        return orderPlaceRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    exchange: _typebox.Type.Optional(_typebox.Type.String()),
    tradingsymbol: _typebox.Type.String({
        description: "The trading symbol of the stock"
    }),
    symboltoken: _typebox.Type.String(),
    transactiontype: _typebox.Type.String({
        description: "The transaction type (BUY or SELL)"
    }),
    ordertype: _typebox.Type.Optional(_typebox.Type.String()),
    variety: _typebox.Type.Optional(_typebox.Type.String()),
    duration: _typebox.Type.Optional(_typebox.Type.String()),
    price: _typebox.Type.Optional(_typebox.Type.Number()),
    squareoff: _typebox.Type.Optional(_typebox.Type.String()),
    stoploss: _typebox.Type.Optional(_typebox.Type.Number()),
    quantity: _typebox.Type.Optional(_typebox.Type.String()),
    producttype: _typebox.Type.Optional(_typebox.Type.String())
});
const orderPlaceRouteSchema = {
    body: options
};
