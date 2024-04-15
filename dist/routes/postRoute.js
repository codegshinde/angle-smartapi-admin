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
const _getLTP = require("../controller/handler/getLTP");
const _loginAdminHandler = require("../controller/handler/loginAdminHandler");
const _multipleOrderExitHandler = require("../controller/handler/orders/multipleOrderExitHandler");
const _multipleOrderModifyHandler = require("../controller/handler/orders/multipleOrderModifyHandler");
const _multipleOrderPlaceHandler = require("../controller/handler/orders/multipleOrderPlaceHandler");
const _searchScripHandler = require("../controller/handler/searchScripHandler");
const _addSymbol = require("../controller/handler/symbol/addSymbol");
const _addAPIHandler = require("../controller/handler/user/addAPIHandler");
const _addUserHandler = require("../controller/handler/user/addUserHandler");
const _userSubscriptionHandler = require("../controller/handler/userSubscriptionHandler");
async function postRoutes(fastify) {
    fastify.post("/login", _loginAdminHandler.loginRouteOptions);
    fastify.post("/user/order/place", _multipleOrderPlaceHandler.multipleOrderPlaceRouteOptions);
    fastify.post("/user/order/modify", _multipleOrderModifyHandler.multipleOrderModifyRouteOptions);
    fastify.post("/user/subscription/update", _userSubscriptionHandler.userSubscriptionRouteOptions);
    fastify.post("/user/search/scrip", _searchScripHandler.searchScripRouteOptions);
    fastify.post("/user/token/ltp", _getLTP.getLTPRouteOptions);
    fastify.post("/user/order/exit", _multipleOrderExitHandler.multipleOrderExitRouteOptions);
    fastify.post("/user/symbol/add", _addSymbol.addSymbolRouteOptions);
    fastify.post("/user/register", _addUserHandler.addUserRouteOptions);
    fastify.post("/user/api/add", _addAPIHandler.addAPIRouteOptions);
}
const _default = postRoutes;
