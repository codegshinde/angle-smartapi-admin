import fastifyJwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

async function tokenPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
    sign: {
      expiresIn: "7d",
    },
  });
}

export default fastifyPlugin(tokenPlugin);
