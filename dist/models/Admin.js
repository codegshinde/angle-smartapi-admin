"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Admin", {
    enumerable: true,
    get: function() {
        return Admin;
    }
});
const _mongoose = require("mongoose");
const adminSchema = new _mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        required: true
    }
});
const Admin = (0, _mongoose.model)("admins", adminSchema);
