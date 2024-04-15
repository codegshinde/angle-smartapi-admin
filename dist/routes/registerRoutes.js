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
const _getRoutes = /*#__PURE__*/ _interop_require_default(require("./getRoutes"));
const _patchRoutes = /*#__PURE__*/ _interop_require_default(require("./patchRoutes"));
const _postRoute = /*#__PURE__*/ _interop_require_default(require("./postRoute"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function registerRoutes(fastify) {
    await fastify.register(_getRoutes.default);
    await fastify.register(_postRoute.default);
    await fastify.register(_patchRoutes.default);
}
const _default = registerRoutes;
