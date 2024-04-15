import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API, ApiTypes } from "../../../models/API";
import { Order } from "../../../models/Order";
import { TempOrder } from "../../../models/TempOrder";
import { orderPlaceService } from "../../../services/apiService";
import { OrderPlaceRequestBody, orderPlaceRouteSchema } from "../../schema/orderPlaceSchema";

async function processBatchOfOrders(accounts: ApiTypes[], body: OrderPlaceRequestBody, rateLimit: number): Promise<any[]> {
  const delay = 1000 / rateLimit; // Calculate delay based on rate limit
  const tempNewOrders = []; // Temporary array to store new orders
  for (const account of accounts) {
    try {
      const data = {
        ...body,
        quantity: account.quantity,
      };

      const response = await orderPlaceService(data, account.jwtToken);

      if (!response || !response.orderid || !response.script) {
        throw new Error("Invalid response from external API");
      }

      // Add new order to the temporary array
      tempNewOrders.push({
        userId: account._id,
        orderid: response.orderid,
        script: response.script,
        uniqueorderid: response.uniqueorderid,
        type: body.transactiontype,
      });

      // Introduce delay to respect rate limit
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      throw error;
    }
  }

  return tempNewOrders;
}

async function moveTempOrdersToPermanent(accounts: any[]): Promise<void> {
  for (const account of accounts) {
    // Find all temporary orders for the current account
    const tempOrders = await TempOrder.find({ userId: account.userId });

    // Process each temporary order
    for (const tempOrder of tempOrders) {
      // Create a new permanent order
      const newOrder = new Order({
        userId: tempOrder.userId,
        orderid: tempOrder.orderid,
        script: tempOrder.script,
        uniqueorderid: tempOrder.uniqueorderid,
        type: tempOrder.type,
      });

      // Save the new permanent order to the Order collection
      await newOrder.save();

      // Delete the processed temporary order
      await tempOrder.deleteOne();
    }
  }
}

async function multipleOrderPlaceHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as OrderPlaceRequestBody;

    const makeOrder = {
      ...body,
      variety: "NORMAL",
      exchange: "NFO",
      ordertype: "MARKET",
      producttype: "INTRADAY",
      duration: "DAY",
      stoploss: 0,
    };

    const accounts = await API.find({ endDate: { $gt: new Date() } });

    if (!accounts.length) {
      return reply.code(404).send({ error: "Accounts Not Found" });
    }

    const rateLimit = 15; // Requests per second (adjust as needed)

    // Place new orders and store in tempNewOrders array
    const tempNewOrders = await processBatchOfOrders(accounts, makeOrder, rateLimit);

    // Move temporary orders to permanent orders
    await moveTempOrdersToPermanent(accounts);

    // Save orders from tempNewOrders to TempOrder collection
    await TempOrder.insertMany(tempNewOrders);

    reply.send({
      message: `Orders successfully placed for ${accounts.length} accounts.`,
      success: true,
    });
  } catch (error) {
    throw error;
  }
}

export const multipleOrderPlaceRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: orderPlaceRouteSchema,
  handler: multipleOrderPlaceHandler,
};
