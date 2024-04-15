import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { API } from "../../models/API";
import { tokensRefreshService } from "../../services/apiService";

async function multipleTokenRefreshHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Fetch active API credentials from the database
    const accounts = await API.find({ endDate: { $gt: new Date() } });

    // Check if active APIs are found
    if (accounts.length === 0) {
      throw new Error("Sorry, no active accounts found!");
    }

    const rateLimit = 1; // Requests per second
    const delay = 1050 / rateLimit; // Delay in milliseconds between each request

    for (const account of accounts) {
      const data = {
        refreshToken: account.refreshToken,
      };

      try {
        // Call tokensRefreshService to get refreshed tokens
        const response: any = await tokensRefreshService(data, account.jwtToken);
    
        if (!response) {
          throw new Error("Error refreshing tokens for account with userId: " + account.userId);
        }
        
        // Update AngelApi document with the new tokens
        await API.findOneAndUpdate(
          { userId: account.userId },
          { jwtToken: response.jwtToken, refreshToken: response.refreshToken, feedToken: response.feedToken },
          { new: true }
        );
      } catch (error) {
        // Continue processing the next account
        continue;
      }

      // Wait for the delay before processing the next account
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Send a success response
    reply.send({
      message: "Tokens for all active accounts have been successfully refreshed.",
    });
  } catch (error) {
    throw error;
  }
}

export const multipleTokenRefreshRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: multipleTokenRefreshHandler,
};
