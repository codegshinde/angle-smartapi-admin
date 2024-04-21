import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { updateApiRouteOptions } from "../controller/handler/user/updateApiHandler";

async function patchRoutes(fastify: FastifyInstance) {
  fastify.patch("/user/api/update", updateApiRouteOptions);
}

export default fastifyPlugin(patchRoutes);
