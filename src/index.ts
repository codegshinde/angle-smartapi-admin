import "dotenv/config";
import fastify from "fastify";
import createApp from "./app";

/**
 * Creates and starts a Fastify server listening on the specified port and host.
 *
 * @returns A promise that resolves when the server is started.
 */
const createServer = async (): Promise<void> => {
  try {
    // Create a Fastify instance
    const fastifyInstance = fastify();

    // Build the Fastify app with plugins, routes, and utilities
    const app = createApp(fastifyInstance);

    // Start the server on the specified port and host
    const port = Number(process.env.PORT);
    const host = process.env.HOST;

    // Check if PORT and HOST environment variables are set
    if (!port || !host) {
      console.error("PORT or HOST environment variable is not set");
      process.exit(1);
    }

    // Start the Fastify server
    await app.start({ port, host });
  } catch (error) {
    // Handle any errors during server startup
    console.error(error);
    process.exit(1);
  }
};

// Call the createServer function to start the Fastify server
createServer();
