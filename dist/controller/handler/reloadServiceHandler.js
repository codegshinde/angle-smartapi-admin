"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "reloadServiceRouteOptions", {
    enumerable: true,
    get: function() {
        return reloadServiceRouteOptions;
    }
});
async function handleReloadServiceRequest(request, reply) {
    try {
        reply.send({
            message: "Service is still active."
        });
    } catch (error) {
        throw error;
    }
}
const reloadServiceRouteOptions = {
    schema: {},
    handler: handleReloadServiceRequest
};
