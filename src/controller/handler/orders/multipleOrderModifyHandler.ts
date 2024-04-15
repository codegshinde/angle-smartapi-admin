import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API } from "../../../models/API";
import { TempOrder } from "../../../models/TempOrder";
import { orderModifyService } from "../../../services/apiService";
import { OrderModifyRequestBody, orderModifyRouteSchema } from "../../schema/orderModifySchema";

async function processBatchOfOrders(accounts: any[], body: OrderModifyRequestBody, rateLimit: number): Promise<void> {
  const delay = 1000 / rateLimit; // Calculate delay based on rate limit

  for (const account of accounts) {
    try {
      // Find all temporary orders for the current account
      const tempOrders = await TempOrder.find({ userId: account._id });

      // Process each temporary order
      for (const tempOrder of tempOrders) {
        // Modify the temporary order using the orderModifyService
        body.orderid = tempOrder.orderid;
        const response: any = await orderModifyService(body, account.jwtToken);

        // Update the TempOrder document in the database with the new uniqorderid
        console.log(response)
        await TempOrder.updateOne({ orderid: tempOrder.orderid }, { $set: { uniqueorderid: response.uniqueorderid } });

        // Introduce delay to respect rate limit
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (error) {
      throw error;
    }
  }
}

async function multipleOrderModifyHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as OrderModifyRequestBody;
    const accounts = await API.find({ endDate: { $gt: new Date() } });

    if (accounts.length === 0) {
      throw new Error("Accounts Not Found");
    }

    const rateLimit = 15; // Requests per second (adjust as needed)

    // Process and modify orders for each account
    await processBatchOfOrders(accounts, body, rateLimit);

    reply.send({
      message: `Orders successfully modified for ${accounts.length} accounts.`,
      success: true,
    });
  } catch (error) {
    throw error;
  }
}

export const multipleOrderModifyRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: orderModifyRouteSchema,
  handler: multipleOrderModifyHandler,
};
