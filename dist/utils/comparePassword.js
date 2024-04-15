"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "comparePassword", {
    enumerable: true,
    get: function() {
        return comparePassword;
    }
});
const _bcryptjs = require("bcryptjs");
async function comparePassword(plain, hashed) {
    try {
        const isMatched = await (0, _bcryptjs.compare)(plain, hashed);
        if (!isMatched) {
            throw new Error("Authentication failed. Please check your login credentials.");
        }
        return true;
    } catch (error) {
        throw error;
    }
}
