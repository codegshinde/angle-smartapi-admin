"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userSubscriptionRouteSchema", {
    enumerable: true,
    get: function() {
        return userSubscriptionRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    userId: _typebox.Type.String(),
    plan: _typebox.Type.String()
});
const userSubscriptionRouteSchema = {
    body: options
};
