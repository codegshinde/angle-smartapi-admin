import { FastifyInstance } from "fastify";
import registerPlugins from "./plugins/registerPlugins";
import registerRoutes from "./routes/registerRoutes";
import registerUtils from "./utils/registerUtils";

// Configuration options for starting the Fastify server
interface ListenOptions {
  /** The port number on which the server will listen. */
  port: number;
  /** The host address on which the server will listen. */
  host: string;
}

// Interface representing the methods of the created Fastify application
interface CreateApp {
  /**
   * Start the Fastify server with the specified options.
   *
   * @param options - Configuration options for starting the server.
   * @returns A promise that resolves when the server is successfully started.
   */
  start: (options: ListenOptions) => Promise<void>;
}

/**
 * Creates a Fastify instance with registered plugins, routes, and utilities.
 *
 * @param fastify - An instance of the Fastify framework.
 * @returns An object containing the `start` function to launch the server.
 */
function createApp(fastify: FastifyInstance): CreateApp {
  // Register plugins
  /**
   * Registers plugins using the provided plugin registry function.
   *
   * @param fastify - An instance of the Fastify framework.
   */
  fastify.register(registerPlugins, { fastify });

  // Register routes
  /**
   * Registers routes using the provided route registry function.
   *
   * @param fastify - An instance of the Fastify framework.
   */

  fastify.register(registerRoutes, { prefix: "/admin/" });

  // Register utilities
  /**
   * Registers utilities using the provided utility registry function.
   *
   * @param fastify - An instance of the Fastify framework.
   */
  fastify.register(registerUtils, { fastify });

  // Start the server
  /**
   * Starts the Fastify server on the specified port and host.
   *
   * @param options - Configuration options for starting the server.
   * @returns A promise that resolves when the server is successfully started.
   */
  const start = async (options: ListenOptions): Promise<void> => {
    try {
      await fastify.listen(options);
      console.log(`Fastify server started on PORT : ${options.port}`);
    } catch (error) {
      console.error(`Error starting Fastify server on PORT : ${options.port}: ${error}`);
      process.exit(1); // or handle the error in a way that makes sense for your application
    }
  };

  return { start };
}

export default createApp;
