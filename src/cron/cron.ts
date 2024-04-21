import { CronJob } from "cron";
import { authenticator } from "otplib";
import { API } from "../models/API";
import { loginAndSaveApiService } from "../services/apiService";

const RATE_LIMIT = 15; // Requests per second (adjust as needed)

async function processBatchOfAccounts(accounts: any[], rateLimit: number): Promise<void> {
  const delay = 1000 / rateLimit; // Calculate delay based on rate limit

  for (const account of accounts) {
    try {
      const secret = account.totpSecret;
      const totp = authenticator.generate(secret);

      // Construct data for login API call
      const data = {
        clientcode: account.clientCode,
        password: account.pin,
        totp: totp,
      };

      // Call login API service
      const response = await loginAndSaveApiService(data);

      if (!response || !response.data.jwtToken || !response.data.refreshToken || !response.data.feedToken) {
        throw new Error("Invalid response from external API" + response.message);
      }

      // Update necessary fields in the API document
      await API.findOneAndUpdate(
        { userId: account.userId },
        {
          $set: {
            jwtToken: response.data.jwtToken,
            refreshToken: response.data.refreshToken,
            feedToken: response.data.feedToken,
          },
        },
        { new: true, upsert: true } // Update existing or insert new document
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      console.error(`Error occurred for account with userId ${account.userId}:`, error);
    }
  }
}

async function handleMultipleUserLogin() {
  try {
    const accounts = await API.find({ endDate: { $gt: new Date() } });

    if (!accounts.length) {
      throw new Error("Accounts Not Found");
    }

    await processBatchOfAccounts(accounts, RATE_LIMIT);

    console.log({ message: "All accounts logged in successfully." });
  } catch (error) {
    console.error("Error processing multiple user login:", error);
    throw error;
  }
}

export const startMultipleUserLoginCron = async () => {
  try {
    CronJob.from({
      cronTime: "0 5 9 * * 1-5", // 9:05 AM IST from Monday to Friday
      onTick: handleMultipleUserLogin, // Function to execute on tick
      start: true,
      timeZone: "Asia/Kolkata", // Indian Standard Time (IST)
    });

    console.log("Multiple user login cron job scheduled to run at 9:05 AM IST from Monday to Friday.");
  } catch (error) {
    console.error("Error starting the multiple user login cron job:", error);
  }
};
