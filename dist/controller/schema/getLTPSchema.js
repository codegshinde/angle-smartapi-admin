"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getLTPRouteSchema", {
    enumerable: true,
    get: function() {
        return getLTPRouteSchema;
    }
});
const _typebox = require("@sinclair/typebox");
const options = _typebox.Type.Object({
    mode: _typebox.Type.String(),
    exchangeTokens: _typebox.Type.Any()
});
const getLTPRouteSchema = {
    body: options
};
