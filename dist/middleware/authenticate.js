"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the plugin as a Fastify plugin
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _fastifyplugin = /*#__PURE__*/ _interop_require_default(require("fastify-plugin"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Plugin for authentication middleware.
 * Adds a preHandler hook to verify JWT tokens for protected routes.
 *
 * @param fastify - The FastifyInstance to register the plugin.
 */ async function authenticate(fastify) {
    // Define public routes that do not require authentication
    const publicRoutes = [
        "/admin/login"
    ];
    // Add preHandler hook to verify JWT for protected routes
    fastify.addHook("preHandler", async (request)=>{
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
            const token = authHeader.replace("Bearer ", "");
            const decoded = await request.jwtVerify(token);
            // Attach decoded user information to the request
            request.user = decoded;
        } catch (error) {
            // Throw an error if JWT verification fails
            throw new Error("Authentication failed");
        }
    });
}
const _default = (0, _fastifyplugin.default)(authenticate);
