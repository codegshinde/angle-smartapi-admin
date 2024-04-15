import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { getClosedOrdersRouteOptions } from "../controller/handler/getClosedOrders";
import { getLastOrderRouteOptions } from "../controller/handler/getLastOrderDetails";
import { multipleTokenRefreshRouteOptions } from "../controller/handler/multipleTokenRefreshHandler";
import { multipleUserLoginRouteOptions } from "../controller/handler/multipleUserLogin";
import { reloadServiceRouteOptions } from "../controller/handler/reloadServiceHandler";
import { getSymbolRouteOptions } from "../controller/handler/symbol/getSymbol";

async function getROutes(fastify: FastifyInstance) {
  fastify.get("/reload", reloadServiceRouteOptions);
  fastify.get("/user/login", multipleUserLoginRouteOptions);
  fastify.get("/user/tokens/refresh", multipleTokenRefreshRouteOptions);
  fastify.get("/user/order/view", getLastOrderRouteOptions);
  fastify.get("/user/order/closed", getClosedOrdersRouteOptions);
  fastify.get("/user/symbols", getSymbolRouteOptions);
}

export default fastifyPlugin(getROutes);
