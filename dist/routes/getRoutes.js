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
const _fastifyplugin = /*#__PURE__*/ _interop_require_default(require("fastify-plugin"));
const _getClosedOrders = require("../controller/handler/getClosedOrders");
const _getLastOrderDetails = require("../controller/handler/getLastOrderDetails");
const _multipleTokenRefreshHandler = require("../controller/handler/multipleTokenRefreshHandler");
const _multipleUserLogin = require("../controller/handler/multipleUserLogin");
const _reloadServiceHandler = require("../controller/handler/reloadServiceHandler");
const _getSymbol = require("../controller/handler/symbol/getSymbol");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function getROutes(fastify) {
    fastify.get("/reload", _reloadServiceHandler.reloadServiceRouteOptions);
    fastify.get("/user/login", _multipleUserLogin.multipleUserLoginRouteOptions);
    fastify.get("/user/tokens/refresh", _multipleTokenRefreshHandler.multipleTokenRefreshRouteOptions);
    fastify.get("/user/order/view", _getLastOrderDetails.getLastOrderRouteOptions);
    fastify.get("/user/order/closed", _getClosedOrders.getClosedOrdersRouteOptions);
    fastify.get("/user/symbols", _getSymbol.getSymbolRouteOptions);
}
const _default = (0, _fastifyplugin.default)(getROutes);
