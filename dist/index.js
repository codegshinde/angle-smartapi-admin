"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("dotenv/config");
const _fastify = /*#__PURE__*/ _interop_require_default(require("fastify"));
const _app = /*#__PURE__*/ _interop_require_default(require("./app"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Creates and starts a Fastify server listening on the specified port and host.
 *
 * @returns A promise that resolves when the server is started.
 */ const createServer = async ()=>{
    try {
        // Create a Fastify instance
        const fastifyInstance = (0, _fastify.default)();
        // Build the Fastify app with plugins, routes, and utilities
        const app = (0, _app.default)(fastifyInstance);
        // Start the server on the specified port and host
        const port = Number(process.env.PORT);
        const host = process.env.HOST;
        // Check if PORT and HOST environment variables are set
        if (!port || !host) {
            console.error("PORT or HOST environment variable is not set");
            process.exit(1);
        }
        // Start the Fastify server
        await app.start({
            port,
            host
        });
    } catch (error) {
        // Handle any errors during server startup
        console.error(error);
        process.exit(1);
    }
};
// Call the createServer function to start the Fastify server
createServer();
