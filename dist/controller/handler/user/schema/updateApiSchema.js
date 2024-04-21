"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateAPISchema", {
    enumerable: true,
    get: function() {
        return updateAPISchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    apiId: _typebox.Type.String(),
    quantity: _typebox.Type.Optional(_typebox.Type.Number()),
    clientCode: _typebox.Type.Optional(_typebox.Type.String()),
    totpSecret: _typebox.Type.Optional(_typebox.Type.String()),
    pin: _typebox.Type.Optional(_typebox.Type.Number())
});
const updateAPISchema = {
    body: options
};
