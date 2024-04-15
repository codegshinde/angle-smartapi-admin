"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _registerPlugins = /*#__PURE__*/ _interop_require_default(require("./plugins/registerPlugins"));
const _registerRoutes = /*#__PURE__*/ _interop_require_default(require("./routes/registerRoutes"));
const _registerUtils = /*#__PURE__*/ _interop_require_default(require("./utils/registerUtils"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Creates a Fastify instance with registered plugins, routes, and utilities.
 *
 * @param fastify - An instance of the Fastify framework.
 * @returns An object containing the `start` function to launch the server.
 */ function createApp(fastify) {
    // Register plugins
    /**
   * Registers plugins using the provided plugin registry function.
   *
   * @param fastify - An instance of the Fastify framework.
   */ fastify.register(_registerPlugins.default, {
        fastify
    });
    // Register routes
    /**
   * Registers routes using the provided route registry function.
   *
   * @param fastify - An instance of the Fastify framework.
   */ fastify.register(_registerRoutes.default, {
        prefix: "/admin/"
    });
    // Register utilities
    /**
   * Registers utilities using the provided utility registry function.
   *
   * @param fastify - An instance of the Fastify framework.
   */ fastify.register(_registerUtils.default, {
        fastify
    });
    // Start the server
    /**
   * Starts the Fastify server on the specified port and host.
   *
   * @param options - Configuration options for starting the server.
   * @returns A promise that resolves when the server is successfully started.
   */ const start = async (options)=>{
        try {
            await fastify.listen(options);
            console.log(`Fastify server started on PORT : ${options.port}`);
        } catch (error) {
            console.error(`Error starting Fastify server on PORT : ${options.port}: ${error}`);
            process.exit(1); // or handle the error in a way that makes sense for your application
        }
    };
    return {
        start
    };
}
const _default = createApp;
