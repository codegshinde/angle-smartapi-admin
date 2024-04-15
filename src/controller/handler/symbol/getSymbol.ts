import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { Tradingsymbol } from "../../../models/TradingSymbol"; // Import the Tradingsymbol model

async function getSymbolHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const symbols = await Tradingsymbol.find({}); // Fetch symbols from the database

    if (symbols.length === 0) {
      throw new Error("Symbol Already Inserted."); // Handle if no symbols found
    }

    reply.send({
      symbols: symbols, // Sending symbols as response
      message: "Symbols Retrieved Successfully", // Success message
    });
  } catch (error) {
    throw error;
  }
}

export const getSymbolRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {}, // Attach schema for request validation
  handler: getSymbolHandler, // Attach the handler function
};
