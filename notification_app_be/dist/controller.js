"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotifications = exports.getPriorityInbox = void 0;
const service_1 = require("./service");
const priorityEngine_1 = require("./priorityEngine");
const getPriorityInbox = async (req, res) => {
    const n = parseInt(req.query.n, 10) || 10;
    console.log(`[CONTROLLER] Priority inbox requested | Top ${n} notifications`);
    try {
        const notifications = await (0, service_1.fetchNotifications)();
        if (notifications.length === 0) {
            console.log("[CONTROLLER] No notifications found from API");
            res.status(200).json({ total: 0, topN: n, notifications: [] });
            return;
        }
        const scored = (0, priorityEngine_1.calculatePriorityScores)(notifications);
        const topN = (0, priorityEngine_1.getTopNNotifications)(scored, n);
        const response = {
            total: notifications.length,
            topN: topN.length,
            notifications: topN,
        };
        console.log(`[CONTROLLER] Returning ${topN.length} prioritized notifications out of ${notifications.length} total`);
        res.status(200).json(response);
    }
    catch (error) {
        console.error(`[CONTROLLER] Error fetching priority inbox | ${error.message}`);
        res.status(500).json({
            error: "Failed to fetch priority inbox",
            message: error.message,
        });
    }
};
exports.getPriorityInbox = getPriorityInbox;
const getAllNotifications = async (_req, res) => {
    console.log("[CONTROLLER] All notifications requested");
    try {
        const notifications = await (0, service_1.fetchNotifications)();
        console.log(`[CONTROLLER] Returning all ${notifications.length} notifications`);
        res.status(200).json({ total: notifications.length, notifications });
    }
    catch (error) {
        console.error(`[CONTROLLER] Error fetching all notifications | ${error.message}`);
        res.status(500).json({
            error: "Failed to fetch notifications",
            message: error.message,
        });
    }
};
exports.getAllNotifications = getAllNotifications;
//# sourceMappingURL=controller.js.map