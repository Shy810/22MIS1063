import { Router } from "express";
import { getPriorityInbox, getAllNotifications } from "./controller";

const router = Router();

router.get("/notifications", getAllNotifications);
router.get("/notifications/priority", getPriorityInbox);

export default router;
