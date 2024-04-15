"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "loginRouteOptions", {
    enumerable: true,
    get: function() {
        return loginRouteOptions;
    }
});
const _Admin = require("../../models/Admin");
const _loginSchema = require("../schema/loginSchema");
/**
 * Handles the login request.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} response - The Fastify response object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */ async function loginHandler(request, response) {
    const { mobile, password } = request.body;
    try {
        console.log(mobile);
        // Find the user by userId, lean() for a plain JavaScript object
        const admin = await _Admin.Admin.findOne({
            mobile
        });
        if (!admin) {
            throw new Error("Invalid Admin. User not found.");
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await request.comparePassword(password, admin.password);
        if (isPasswordValid) {
            // Get the current date
            const currentDate = new Date();
            // Define the time to add (in milliseconds)
            const timeToAdd = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
            // Calculate the new date by adding the time
            const newDate = new Date(currentDate.getTime() + timeToAdd);
            // Get the timestamp of the new date
            const expireTime = newDate.getTime();
            // Sign a JWT token with user information (excluding password)
            const token = request.signJWT({
                id: admin._id,
                iat: currentDate.getTime(),
                eat: expireTime
            });
            // Omit the password from the response
            delete admin.password;
            // Send the user details and token in the response
            response.send({
                admin: admin,
                token: token
            });
        } else {
            throw new Error("Authentication failed. Invalid password.");
        }
    } catch (error) {
        // Throw any caught errors
        throw error;
    }
}
const loginRouteOptions = {
    schema: _loginSchema.loginRouteSchema,
    handler: loginHandler
};