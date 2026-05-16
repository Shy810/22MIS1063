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
    console.log("[AUTH] Loading environment configuration...");
    const BASE_URL = process.env.BASE_URL;
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    if (!BASE_URL || BASE_URL.trim().length === 0) {
        console.error("[AUTH] BASE_URL is missing or empty in .env file");
        throw new Error("Missing environment variable: BASE_URL is not defined in .env file.");
    }
    if (!ACCESS_TOKEN || ACCESS_TOKEN.trim().length === 0) {
        console.error("[AUTH] ACCESS_TOKEN is missing or empty in .env file");
        throw new Error("Missing environment variable: ACCESS_TOKEN is not defined in .env file.");
    }
    console.log(`[AUTH] Environment loaded successfully | BASE_URL: ${BASE_URL.trim()}`);
    console.log(`[AUTH] ACCESS_TOKEN loaded | Length: ${ACCESS_TOKEN.trim().length} characters`);
    return {
        BASE_URL: BASE_URL.trim(),
        ACCESS_TOKEN: ACCESS_TOKEN.trim(),
    };
};
exports.getEnvConfig = getEnvConfig;
//# sourceMappingURL=auth.js.map