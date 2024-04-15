import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API, ApiTypes } from "../../../models/API";
import { Order } from "../../../models/Order";
import { TempOrder } from "../../../models/TempOrder";
import { orderCancelService } from "../../../services/apiService";
import { OrderCancelRequestBody, orderCancelRouteSchema } from "../../schema/orderCancelSchema";

async function processBatchOfOrders(accounts: ApiTypes[], body: OrderCancelRequestBody, rateLimit: number): Promise<void> {
  const delay = 1000 / rateLimit; // Calculate delay based on rate limit

  for (const account of accounts) {
    try {
      // Find and move temporary orders to permanent orders
      const tempOrders = await TempOrder.find({ userId: account._id });

      for (const tempOrder of tempOrders) {
        const newOrder = new Order({
          userId: tempOrder.userId,
          orderid: tempOrder.orderid,
          script: tempOrder.script,
          uniqueorderid: tempOrder.uniqueorderid,
          type: tempOrder.type,
        });

        const data = {
          variety: "NORMAL",
          orderid: tempOrder.orderid,
        };

        // Cancel order using the orderCancelService
        const response = await orderCancelService(data, account.jwtToken);

        if (!response) {
          throw new Error("Invalid response from the API");
        }

        // Save the new permanent order to the Order collection
        await newOrder.save();

        // Delete the processed temporary order
        await tempOrder.deleteOne();
      }

      // Introduce delay to respect rate limit
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      throw error;
    }
  }
}

async function multipleOrderCancelHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as OrderCancelRequestBody;
    const accounts = await API.find({ endDate: { $gt: new Date() } });

    if (accounts.length === 0) {
      throw new Error("Accounts Not Found");
    }

    const rateLimit = 15; // Requests per second (adjust as needed)

    // Process and cancel orders for each account
    await processBatchOfOrders(accounts, body, rateLimit);

    reply.send({
      message: `Orders successfully canceled for ${accounts.length} accounts.`,
      success: true,
    });
  } catch (error) {
    throw error;
  }
}

export const multipleOrderCancelRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: orderCancelRouteSchema,
  handler: multipleOrderCancelHandler,
};
