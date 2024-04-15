import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API, ApiTypes } from "../../../models/API";
import { TempOrder } from "../../../models/TempOrder";
import { orderModifyService } from "../../../services/apiService";
import { OrderModifyRequestBody, orderModifyRouteSchema } from "../../schema/orderModifySchema";

const RATE_LIMIT = 15;

/**
 * Process batch of orders for a given set of accounts.
 *
 * @param accounts - The accounts to modify orders for.
 * @param body - The order details to be modified.
 * @param rateLimit - The rate limit to control the concurrency of requests.
 */
async function processBatchOfOrders(accounts: ApiTypes[], body: OrderModifyRequestBody, rateLimit: number): Promise<void> {
  const delay = 1000 / rateLimit; // Calculate delay based on rate limit

  for (const account of accounts) {
    await new Promise((resolve) => setTimeout(resolve, delay));

    try {
      const tempOrders = await TempOrder.find({ userId: account._id });

      for (const tempOrder of tempOrders) {
        body.orderid = tempOrder.orderid;
        const response = await orderModifyService(body, account.jwtToken);

        if (!response || !response.data.orderid || !response.data.uniqueorderid) {
          throw new Error("Invalid response from external API" + response.message);
        }

        await TempOrder.updateOne({ orderid: tempOrder.orderid }, { $set: { uniqueorderid: response.data.uniqueorderid } });
      }
    } catch (error) {
      console.error(`Error processing account ${account._id}:`, error);
    }
  }
}

/**
 * Handler function for the multiple order modify route.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
const multipleOrderModifyHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const body = request.body as OrderModifyRequestBody;
    const accounts = await API.find({ endDate: { $gt: new Date() } });

    if (!accounts.length) {
      throw new Error("Accounts Not Found");
    }

    await processBatchOfOrders(accounts, body, RATE_LIMIT);

    reply.send({
      message: `Orders successfully modified for ${accounts.length} accounts.`,
      success: true,
    });
  } catch (error) {
    console.error("Error processing multiple order modifies:", error);
    throw error;
  }
};

export const multipleOrderModifyRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: orderModifyRouteSchema,
  handler: multipleOrderModifyHandler,
};
