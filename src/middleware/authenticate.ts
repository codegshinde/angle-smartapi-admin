import { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

/**
 * Plugin for authentication middleware.
 * Adds a preHandler hook to verify JWT tokens for protected routes.
 *
 * @param fastify - The FastifyInstance to register the plugin.
 */
async function authenticate(fastify: FastifyInstance): Promise<void> {
  // Define public routes that do not require authentication
  const publicRoutes = ["/admin/login"];

  // Add preHandler hook to verify JWT for protected routes
  fastify.addHook("preHandler", async (request: FastifyRequest) => {
    try {
      // Extract the authorization header
      const authHeader = request.headers.authorization;

      // Skip authentication for public routes
      if (request.routeOptions && request.routeOptions.url && publicRoutes.includes(request.routeOptions.url)) {
        return;
      }

      // Throw an error if auth headers are not provided
      if (!authHeader) {
        throw new Error("Authentication headers are required");
      }

      // Verify JWT for protected routes
      const token = authHeader.replace("Bearer ", "") as any;
      const decoded = await request.jwtVerify(token);

      // Attach decoded user information to the request
      request.user = decoded;
    } catch (error) {
      // Throw an error if JWT verification fails
      throw new Error("Authentication failed");
    }
  });
}

// Export the plugin as a Fastify plugin
export default fp(authenticate);
