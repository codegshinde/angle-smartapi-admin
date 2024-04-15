import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API } from "../../models/API";
import { searchScripService } from "../../services/apiService";
import { SearchSymbolAndTokenRequestBody } from "../schema/searchScripSchema";

async function searchScripHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as SearchSymbolAndTokenRequestBody;
    const account = await API.findOne({ endDate: { $gt: new Date() } });

    if (!account) {
      throw new Error("No Account Found");
    }

    const data = {
      exchange: body.exchange,
      searchscrip: body.searchscrip,
    };

    const response = await searchScripService(data, account.jwtToken);
    if (!response) {
      throw new Error("Not Data Found!");
    }

    reply.send({
      symbolTokens: response,
      message: "Token Fetched Successfully.",
    });
  } catch (error) {
    throw error;
  }
}

export const searchScripRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: searchScripHandler,
};
