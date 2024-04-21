import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API } from "../../../models/API";
import { UpdateAPIRequestBody, updateAPISchema } from "./schema/updateApiSchema";

async function updateApiHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as UpdateAPIRequestBody;

    const api = await API.findOne({ _id: body.apiId });

    if (!api) {
      throw new Error("User Not Found!");
    }

    const update = await API.findOneAndUpdate({ _id: api._id }, { ...body }, { new: true });

    reply.send({
      message: "API Updated!",
      api: update,
    });
  } catch (error) {
    throw error;
  }
}

export const updateApiRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: updateAPISchema,
  handler: updateApiHandler,
};
