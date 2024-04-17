import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { Admin } from "../../../models/Admin";

async function userProfileHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.user as { id: string };

    const user = await Admin.findOne({ _id: id });

    if (!user) {
      throw new Error("User Not Found!");
    }

    reply.send({
      user: user,
      message: "User Details",
    });
  } catch (error) {
    throw error;
  }
}

export const userProfileRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: userProfileHandler,
};
