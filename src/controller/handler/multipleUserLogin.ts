import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { authenticator } from "otplib";
import { API } from "../../models/API";
import { loginAndSaveApiService } from "../../services/apiService";

async function multipleUserLogin(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Fetch active API credentials from the database
    const accounts = await API.find({ endDate: { $gt: new Date() } });

    // Check if active APIs are found
    if (accounts.length === 0) {
      throw new Error("Sorry, no active accounts found!");
    }

    // Process each account independently
    for (const account of accounts) {
      try {
        const secret = account.totpSecret; // Replace with the property name of TOTP secret in your AngelApi model
        const totp = authenticator.generate(secret);

        // Construct data for login API call
        const data = {
          clientcode: account.clientCode, // Replace with the property name of client code in your AngelApi model
          password: account.pin, // Replace with the property name of password in your AngelApi model
          totp: totp,
        };

        // Call login API service
        const response: any = await loginAndSaveApiService(data);

        // Update necessary fields in the AngelApi document
        await API.findOneAndUpdate(
          { userId: account.userId },
          {
            $set: {
              jwtToken: response.jwtToken,
              refreshToken: response.refreshToken,
              feedToken: response.feedToken,
            },
          },
          { new: true, upsert: true } // Update existing or insert new document
        );

        // Introduce delay of 1.2 seconds before processing the next account
        await new Promise((resolve) => setTimeout(resolve, 1200)); // 1200 milliseconds = 1.2 seconds
      } catch (error) {
        console.error(`Error occurred for account with userId ${account.userId}:`, error);
      }
    }

    // Send a success response
    reply.send({ message: "All accounts logged in successfully." });
  } catch (error) {
    throw error;
  }
}

export const multipleUserLoginRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: multipleUserLogin,
};
