"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateApiRouteOptions", {
    enumerable: true,
    get: function() {
        return updateApiRouteOptions;
    }
});
const _API = require("../../../models/API");
const _updateApiSchema = require("./schema/updateApiSchema");
async function updateApiHandler(request, reply) {
    try {
        const body = request.body;
        const api = await _API.API.findOne({
            _id: body.apiId
        });
        if (!api) {
            throw new Error("User Not Found!");
        }
        const update = await _API.API.findOneAndUpdate({
            _id: api._id
        }, {
            ...body
        }, {
            new: true
        });
        reply.send({
            message: "API Updated!",
            api: update
        });
    } catch (error) {
        throw error;
    }
}
const updateApiRouteOptions = {
    schema: _updateApiSchema.updateAPISchema,
    handler: updateApiHandler
};
