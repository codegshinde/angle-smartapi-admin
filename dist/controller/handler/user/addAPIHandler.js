"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addAPIRouteOptions", {
    enumerable: true,
    get: function() {
        return addAPIRouteOptions;
    }
});
const _API = require("../../../models/API");
const _User = require("../../../models/User");
const _addAPISchema = require("./schema/addAPISchema");
async function addApiHandler(request, reply) {
    try {
        const body = request.body;
        const checkUser = await _User.User.findOne({
            _id: body.userId
        });
        if (!checkUser) {
            throw new Error("User not found");
        }
        const checkClientCode = await _API.API.findOne({
            clientCode: body.clientCode
        });
        if (checkClientCode) {
            throw new Error("ClientCode already in use");
        }
        const addAPI = new _API.API({
            ...body,
            userId: body.userId
        });
        await addAPI.save();
        reply.send({
            message: "API Addedd Successfully",
            api: addAPI
        });
    } catch (error) {
        throw error;
    }
}
const addAPIRouteOptions = {
    schema: _addAPISchema.addAPISchema,
    handler: addApiHandler
};
