"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userProfileRouteOptions", {
    enumerable: true,
    get: function() {
        return userProfileRouteOptions;
    }
});
const _Admin = require("../../../models/Admin");
async function userProfileHandler(request, reply) {
    try {
        const { id } = request.user;
        const user = await _Admin.Admin.findOne({
            _id: id
        });
        if (!user) {
            throw new Error("User Not Found!");
        }
        reply.send({
            user: user,
            message: "User Details"
        });
    } catch (error) {
        throw error;
    }
}
const userProfileRouteOptions = {
    schema: {},
    handler: userProfileHandler
};
