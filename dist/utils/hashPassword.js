"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "hashPassword", {
    enumerable: true,
    get: function() {
        return hashPassword;
    }
});
const _bcryptjs = require("bcryptjs");
async function hashPassword(password) {
    try {
        const hashed = await (0, _bcryptjs.hash)(password, 10);
        return hashed;
    } catch (error) {
        throw error;
    }
}
