import { FastifyInstance } from "fastify";
import { getLTPRouteOptions } from "../controller/handler/getLTP";
import { loginRouteOptions } from "../controller/handler/loginAdminHandler";
import { multipleOrderCancelRouteOptions } from "../controller/handler/orders/multipleOrderCancelHandler";
import { multipleOrderModifyRouteOptions } from "../controller/handler/orders/multipleOrderModifyHandler";
import { multipleOrderPlaceRouteOptions } from "../controller/handler/orders/multipleOrderPlaceHandler";
import { searchScripRouteOptions } from "../controller/handler/searchScripHandler";
import { addSymbolRouteOptions } from "../controller/handler/symbol/addSymbol";
import { addAPIRouteOptions } from "../controller/handler/user/addAPIHandler";
import { addUserRouteOptions } from "../controller/handler/user/addUserHandler";
import { userSubscriptionRouteOptions } from "../controller/handler/userSubscriptionHandler";

async function postRoutes(fastify: FastifyInstance) {
  fastify.post("/login", loginRouteOptions);
  fastify.post("/user/order/place", multipleOrderPlaceRouteOptions);
  fastify.post("/user/order/modify", multipleOrderModifyRouteOptions);
  fastify.post("/user/order/cancel", multipleOrderCancelRouteOptions);
  fastify.post("/user/subscription/update", userSubscriptionRouteOptions);
  fastify.post("/user/search/scrip", searchScripRouteOptions);
  fastify.post("/user/token/ltp", getLTPRouteOptions);

  fastify.post("/user/symbol/add", addSymbolRouteOptions);

  fastify.post("/user/register", addUserRouteOptions);
  fastify.post("/user/api/add", addAPIRouteOptions);
}

export default postRoutes;
