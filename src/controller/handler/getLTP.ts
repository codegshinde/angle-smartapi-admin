import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API } from "../../models/API";
import { ltpService } from "../../services/apiService";
import { GetLTPRequestBody, getLTPRouteSchema } from "../schema/getLTPSchema";

async function getLTPHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as GetLTPRequestBody;
    const user = await API.findOne({}).sort({ _id: -1 });

    // If the lastTempOrder is found, send it in the response
    if (!user) {
      throw new Error("No last order found");
    }

    const response = await ltpService(body, user.jwtToken);

    if (!response) {
      throw new Error("Response not found!");
    }

    reply.send({
      ltp: response,
      message: "LTP For Stock",
    });
  } catch (error) {
    throw error;
  }
}

export const getLTPRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: getLTPRouteSchema,
  handler: getLTPHandler,
};
