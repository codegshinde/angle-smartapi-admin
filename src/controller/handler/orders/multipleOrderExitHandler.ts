import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API, ApiTypes } from "../../../models/API";
import { Order } from "../../../models/Order";
import { TempOrder } from "../../../models/TempOrder";
import { orderPlaceService } from "../../../services/apiService";
import { OrderTypes } from "../../../types";
import { calculateQuantityByScript } from "../../../utils/calculateQuantityByScript";

const RATE_LIMIT = 15;

/**
 * Process batch orders for a single account.
 *
 * @param account - The account to process orders for.
 */
async function processBatchOrdersForAccount(account: ApiTypes): Promise<void> {
  const order = await TempOrder.findOne({ userId: account._id });

  if (!order) {
    return;
  }

  const quantity = await calculateQuantityByScript(order.tradingsymbol, account.quantity);

  const createOrder: OrderTypes = {
    exchange: "NFO",
    duration: "DAY",
    ordertype: "MARKET",
    producttype: "INTRADAY",
    tradingsymbol: order.tradingsymbol,
    symboltoken: order.symboltoken,
    variety: "NORMAL",
    transactiontype: "SELL",
    quantity,
  };

  try {
    const response = await orderPlaceService(createOrder, account.jwtToken);

    if (!response.data || !response.data.orderid || !response.data.script) {
      console.error(`Invalid response from API for account ${account._id}`);
    }
  } catch (error) {
    console.error(`Error processing account ${account._id}:`, error);
  }
}

/**
 * Move temporary orders to permanent orders for a single account.
 *
 * @param account - The account to move orders for.
 */
async function moveTempOrdersToPermanent(account: ApiTypes): Promise<void> {
  try {
    const tempOrders = await TempOrder.find({ userId: account._id });

    if (!tempOrders.length) {
      throw new Error("No Transaction Found!");
    }

    for (const tempOrder of tempOrders) {
      const newOrder = new Order({
        userId: tempOrder.userId,
        orderid: tempOrder.orderid,
        tradingsymbol: tempOrder.tradingsymbol,
        symboltoken: tempOrder.symboltoken,
        uniqueorderid: tempOrder.uniqueorderid,
        transactiontype: tempOrder.transactiontype,
        orderTime: tempOrder.createdAt,
      });

      await newOrder.save();
      await tempOrder.deleteOne();
    }
  } catch (error) {
    console.error(`Error moving temp orders for account ${account.userId}:`, error);
  }
}

/**
 * Handler function for the multiple order exit route.
 *
 * @param request - The Fastify request object.
 * @param reply - The Fastify reply object.
 */
const multipleOrderExitHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const accounts = await API.find({ endDate: { $gt: new Date() } });

    if (!accounts.length) {
      throw new Error("Accounts Not Found");
    }

    for (const account of accounts) {
      await processBatchOrdersForAccount(account);
      await moveTempOrdersToPermanent(account);

      await new Promise((resolve) => setTimeout(resolve, 1000 / RATE_LIMIT));
    }

    reply.send({
      message: `Orders successfully moved to permanent orders for ${accounts.length} accounts.`,
      success: true,
    });
  } catch (error) {
    console.error("Error processing multiple order exits:", error);
    throw error;
  }
};

export const multipleOrderExitRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: multipleOrderExitHandler,
};
