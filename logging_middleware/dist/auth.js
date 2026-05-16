"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const getEnvConfig = () => {
    const BASE_URL = process.env.BASE_URL;
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    if (!BASE_URL || BASE_URL.trim().length === 0) {
        throw new Error("Missing environment variable: BASE_URL is not defined in .env file.");
    }
    if (!ACCESS_TOKEN || ACCESS_TOKEN.trim().length === 0) {
        throw new Error("Missing environment variable: ACCESS_TOKEN is not defined in .env file.");
    }
    return {
        BASE_URL: BASE_URL.trim(),
        ACCESS_TOKEN: ACCESS_TOKEN.trim(),
    };
};
exports.getEnvConfig = getEnvConfig;
//# sourceMappingURL=auth.js.map