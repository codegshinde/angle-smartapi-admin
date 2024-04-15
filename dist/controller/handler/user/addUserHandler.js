"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addUserRouteOptions", {
    enumerable: true,
    get: function() {
        return addUserRouteOptions;
    }
});
const _User = require("../../../models/User");
const _addUserSchema = require("./schema/addUserSchema");
async function addUserHandler(request, reply) {
    try {
        const body = request.body;
        // Check if the mobile number is already registered
        const existingMobile = await _User.User.findOne({
            mobile: body.mobile
        });
        if (existingMobile) {
            throw new Error("Mobile number is already registered");
        }
        // Check if the email is already registered
        const existingEmail = await _User.User.findOne({
            email: body.email
        });
        if (existingEmail) {
            throw new Error("Email is already registered");
        }
        // Hash the password
        const hashedPassword = await request.hashPassword(body.password);
        // Create the new user
        const newUser = new _User.User({
            ...body,
            password: hashedPassword
        });
        await newUser.save();
        reply.status(201).send({
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        throw error;
    }
}
const addUserRouteOptions = {
    schema: _addUserSchema.addUserSchema,
    handler: addUserHandler
};
