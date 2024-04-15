import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { TempOrder } from "../../models/TempOrder";

async function getLastOrderDetailsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Select the last record details
    const lastTempOrder = await TempOrder.findOne({}).sort({ _id: -1 });

    // If the lastTempOrder is found, send it in the response
    if (!lastTempOrder) {
      throw new Error("No last order found");
    }

    reply.send({
      order: lastTempOrder,
      message: "last record found!",
    });
  } catch (error) {
    // If an error occurs during the execution, throw the error
    throw error;
  }
}

export const getLastOrderRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: getLastOrderDetailsHandler,
};
