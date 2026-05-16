"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get("/notifications", controller_1.getAllNotifications);
router.get("/notifications/priority", controller_1.getPriorityInbox);
exports.default = router;
//# sourceMappingURL=routes.js.map