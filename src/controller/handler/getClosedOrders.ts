import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API } from "../../models/API";
import { Order } from "../../models/Order";

async function getClosedOrders(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Select the last record details
    const oldestAccount = await API.findOne({}).sort({ _id: 1 }).limit(1);

    console.log(oldestAccount)
    // If the lastTempOrder is found, send it in the response
    if (!oldestAccount) {
      throw new Error("User Not Found");
    }

    const selectOrders = await Order.find({ userId: oldestAccount._id });

    if (!selectOrders) {
      throw new Error("Orders not found");
    }
    reply.send({
      order: selectOrders,
      message: "orders not found!",
    });
  } catch (error) {
    // If an error occurs during the execution, throw the error
    throw error;
  }
}

export const getClosedOrdersRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: getClosedOrders,
};
