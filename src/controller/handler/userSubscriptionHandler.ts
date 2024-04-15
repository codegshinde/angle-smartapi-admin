import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API } from "../../models/API";
import { calculateEndDateFromStartDate } from "../../utils/calculateRechargeDate";
import { UserSubscriptionRequestBody, userSubscriptionRouteSchema } from "../schema/userSubscriptionSchema";

async function userSubscriptionHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as UserSubscriptionRequestBody;

    // Check if user already has an active subscription
    const existingSubscription = await API.findOne({
      userId: body.userId,
      endDate: { $gte: new Date() },
    });

    if (existingSubscription) {
      throw new Error("User already has an active subscription.");
    }

    // Calculate the end date of the subscription based on the start date and duration
    const endDate = await calculateEndDateFromStartDate(new Date(), "28D");

    // Update the existing subscription with the new plan and end date
    const updatedSubscription = await API.findOneAndUpdate({ userId: body.userId }, { plan: body.plan, endDate: endDate }, { new: true });

    // Send the response with updated subscription details
    reply.send({
      subscriptionDetails: updatedSubscription,
    });
  } catch (error) {
    throw error;
  }
}

export const userSubscriptionRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: userSubscriptionRouteSchema,
  handler: userSubscriptionHandler,
};
