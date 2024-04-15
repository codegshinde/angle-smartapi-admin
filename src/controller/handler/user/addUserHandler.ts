import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { User } from "../../../models/User";
import { AddUserRequestBody, addUserSchema } from "./schema/addUserSchema";

async function addUserHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as AddUserRequestBody;

    // Check if the mobile number is already registered
    const existingMobile = await User.findOne({ mobile: body.mobile });
    if (existingMobile) {
      throw new Error("Mobile number is already registered");
    }

    // Check if the email is already registered
    const existingEmail = await User.findOne({ email: body.email });
    if (existingEmail) {
      throw new Error("Email is already registered");
    }

    // Hash the password
    const hashedPassword = await request.hashPassword(body.password);

    // Create the new user
    const newUser = new User({ ...body, password: hashedPassword });
    await newUser.save();

    reply.status(201).send({ message: "User created successfully", user: newUser });
  } catch (error) {
    throw error;
  }
}

export const addUserRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: addUserSchema,
  handler: addUserHandler,
};
