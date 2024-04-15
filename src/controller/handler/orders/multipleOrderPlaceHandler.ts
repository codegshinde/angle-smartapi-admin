import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API, ApiTypes } from "../../../models/API";
import { Order } from "../../../models/Order";
import { TempOrder } from "../../../models/TempOrder";
import { orderPlaceService } from "../../../services/apiService";
import { OrderTypes } from "../../../types";
import { calculateQuantityByScript } from "../../../utils/calculateQuantityByScript";
import { OrderPlaceRequestBody, orderPlaceRouteSchema } from "../../schema/orderPlaceSchema";

const RATE_LIMIT = 15;

/**
 * Process batch of orders for a given set of accounts.
 *
 * @param accounts - The accounts to place orders for.
 * @param body - The order details to be placed.
 * @returns Promise<any[]>
 */
async function processBatchOfOrders(accounts: ApiTypes[], body: OrderPlaceRequestBody): Promise<any[]> {
  const delay = 1000 / RATE_LIMIT;
  const tempNewOrders = [];

  for (const account of accounts) {
    const quantity = await calculateQuantityByScript(body.tradingsymbol, account.quantity);
    const data: OrderTypes = {
      exchange: "NFO",
      duration: "DAY",
      ordertype: "MARKET",
      producttype: "INTRADAY",
      tradingsymbol: body.tradingsymbol,
      symboltoken: body.symboltoken,
      variety: "NORMAL",
      transactiontype: "BUY",
      quantity,
    };

    try {
      const response = await orderPlaceService(data, account.jwtToken);
      if (!response || !response.data.orderid || !response.data.script) {
        throw new Error("Invalid response from external API" + response.message);
      }

      tempNewOrders.push({
        userId: account._id,
        orderid: response.data.orderid,
        tradingsymbol: response.data.script,
        symboltoken: data.symboltoken,
        uniqueorderid: response.data.uniqueorderid,
        transactiontype: body.transactiontype,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      console.error(`Error processing account ${account._id}:`, error);
    }
  }

  return tempNewOrders;
}

/**
 * Move temporary orders to permanent orders for a given set of accounts.
 *
 * @param accounts - The accounts to move orders for.
 */
async function moveTempOrdersToPermanent(accounts: any[]): Promise<void> {
  for (const account of accounts) {
    const tempOrders = await TempOrder.find({ userId: account.userId });

    for (const tempOrder of tempOrders) {
      const newOrder = new Order({
        userId: tempOrder.userId,
        orderid: tempOrder.orderid,
        tradingsymbol: tempOrder.tradingsymbol,
        symboltoken: tempOrder.symboltoken,
        uniqueorderid: tempOrder.uniqueorderid,
        type: tempOrder.transactiontype,
      });

      await newOrder.save();
      await tempOrder.deleteOne();
    }
  }
}

/**
 * Handler function for placing multiple orders.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
const placeOrderHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const body = request.body as OrderPlaceRequestBody;

    const accounts = await API.find({ endDate: { $gt: new Date() } });

    if (!accounts.length) {
      return reply.code(404).send({ error: "Accounts Not Found" });
    }

    const tempNewOrders = await processBatchOfOrders(accounts, body);

    await moveTempOrdersToPermanent(accounts);

    await TempOrder.insertMany(tempNewOrders);

    reply.send({
      message: `Orders successfully placed for ${accounts.length} accounts.`,
      success: true,
    });
  } catch (error) {
    console.error("Error processing multiple orders:", error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};

export const multipleOrderPlaceRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: orderPlaceRouteSchema,
  handler: placeOrderHandler,
};
