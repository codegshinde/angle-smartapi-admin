import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { getClosedOrdersRouteOptions } from "../controller/handler/getClosedOrders";
import { getLastOrderRouteOptions } from "../controller/handler/getLastOrderDetails";
import { multipleUserLoginRouteOptions } from "../controller/handler/multipleUserLogin";
import { reloadServiceRouteOptions } from "../controller/handler/reloadServiceHandler";
import { getSymbolRouteOptions } from "../controller/handler/symbol/getSymbol";
import { userProfileRouteOptions } from "../controller/handler/user/userProfileHandler";

async function getROutes(fastify: FastifyInstance) {
  fastify.get("/reload", reloadServiceRouteOptions);
  fastify.get("/user/login", multipleUserLoginRouteOptions);
  fastify.get("/user/profile", userProfileRouteOptions);
  fastify.get("/user/order/view", getLastOrderRouteOptions);
  fastify.get("/user/order/closed", getClosedOrdersRouteOptions);
  fastify.get("/user/symbols", getSymbolRouteOptions);
  //fastify.get("/user/order/status", )
}

export default fastifyPlugin(getROutes);
