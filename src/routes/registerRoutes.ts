import { FastifyInstance } from "fastify";
import getRoutes from "./getRoutes";
import patchRoutes from "./patchRoutes";
import postRoute from "./postRoute";

async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(getRoutes);
  await fastify.register(postRoute);
  await fastify.register(patchRoutes);
}

export default registerRoutes;
