"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "loginRouteSchema", {
    enumerable: true,
    get: function() {
        return loginRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    mobile: _typebox.Type.String({
        maxLength: 10,
        minLength: 10
    }),
    password: _typebox.Type.RegExp(`^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$`)
});
const loginRouteSchema = {
    body: options
};
