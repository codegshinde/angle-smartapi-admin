import { FastifyInstance } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import { comparePassword } from "./comparePassword";
import { hashPassword } from "./hashPassword";

async function registerUtils(fastify: FastifyInstance) {
  fastify.decorateRequest("hashPassword", hashPassword);
  fastify.decorateRequest("comparePassword", comparePassword);
  fastify.decorateRequest("signJWT", fastify.jwt.sign);
}

export default fastifyPlugin(registerUtils);
