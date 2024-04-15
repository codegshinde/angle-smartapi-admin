import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API } from "../../../models/API";
import { User } from "../../../models/User";
import { AddAPIRequestBody, addAPISchema } from "./schema/addAPISchema";

async function addApiHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as AddAPIRequestBody;

    const checkUser = await User.findOne({ _id: body.userId });

    if (!checkUser) {
      throw new Error("User not found");
    }
    const checkClientCode = await API.findOne({ clientCode: body.clientCode });

    if (checkClientCode) {
      throw new Error("ClientCode already in use");
    }

    const addAPI = new API({ ...body, userId: body.userId });

    await addAPI.save();

    reply.send({
      message: "API Addedd Successfully",
      api: addAPI,
    });
  } catch (error) {
    throw error;
  }
}

export const addAPIRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: addAPISchema,
  handler: addApiHandler,
};
