"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNotifications = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const auth_1 = require("./auth");
const fetchNotifications = async () => {
    const url = `${config_1.config.baseUrl}/notifications`;
    let token = await (0, auth_1.getValidToken)();
    console.log(`[SERVICE] Fetching notifications from: ${url}`);
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const count = response.data.notifications?.length ?? 0;
        console.log(`[SERVICE] Fetched ${count} notifications successfully`);
        return response.data.notifications || [];
    }
    catch (error) {
        if (error.response?.status === 401) {
            console.log("[SERVICE] Token expired during fetch, refreshing and retrying...");
            token = await (0, auth_1.refreshToken)();
            const retryResponse = await axios_1.default.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const count = retryResponse.data.notifications?.length ?? 0;
            console.log(`[SERVICE] Retry successful, fetched ${count} notifications`);
            return retryResponse.data.notifications || [];
        }
        console.error(`[SERVICE] Failed to fetch notifications | Status: ${error.response?.status} | Error: ${error.message}`);
        throw error;
    }
};
exports.fetchNotifications = fetchNotifications;
//# sourceMappingURL=service.js.map