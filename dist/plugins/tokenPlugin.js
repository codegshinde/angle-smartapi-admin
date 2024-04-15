"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _jwt = /*#__PURE__*/ _interop_require_default(require("@fastify/jwt"));
const _fastifyplugin = /*#__PURE__*/ _interop_require_default(require("fastify-plugin"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function tokenPlugin(fastify) {
    fastify.register(_jwt.default, {
        secret: process.env.JWT_SECRET,
        sign: {
            expiresIn: "7d"
        }
    });
}
const _default = (0, _fastifyplugin.default)(tokenPlugin);
