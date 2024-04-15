"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addUserSchema", {
    enumerable: true,
    get: function() {
        return addUserSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    name: _typebox.Type.String(),
    email: _typebox.Type.String(),
    mobile: _typebox.Type.Number(),
    password: _typebox.Type.String(),
    clientCode: _typebox.Type.String(),
    broker: _typebox.Type.String()
});
const addUserSchema = {
    body: options
};
