import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";

async function handleReloadServiceRequest(request: FastifyRequest, reply: FastifyReply) {
  try {
    reply.send({
      message: "Service is still active.",
    });
  } catch (error) {
    throw error;
  }
}

export const reloadServiceRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: handleReloadServiceRequest,
};
