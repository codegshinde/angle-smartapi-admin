import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { Tradingsymbol } from "../../../models/TradingSymbol";
import { AddSymbolRequestBody, addSymbolRouteSchema } from "../../schema/addSymbolSchema";

async function addSymbolHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as AddSymbolRequestBody;

    const symbol = await Tradingsymbol.findOne({ symboltoken: body.symboltoken });

    if (symbol) {
      throw new Error("Symbol Already Inserted.");
    }

    const newSymbol = new Tradingsymbol({
      ...body,
    });

    await newSymbol.save();

    reply.send({
      symbol: newSymbol,
      message: "Symbol Addedd Successfully",
    });
  } catch (error) {
    throw error;
  }
}

export const addSymbolRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: addSymbolRouteSchema,
  handler: addSymbolHandler,
};
