"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addAPISchema", {
    enumerable: true,
    get: function() {
        return addAPISchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    userId: _typebox.Type.String(),
    quantity: _typebox.Type.Number(),
    clientCode: _typebox.Type.String(),
    totpSecret: _typebox.Type.String(),
    pin: _typebox.Type.Number()
});
const addAPISchema = {
    body: options
};
