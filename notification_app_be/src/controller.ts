import { Request, Response } from "express";
import { fetchNotifications } from "./service";
import { calculatePriorityScores, getTopNNotifications } from "./priorityEngine";
import { PriorityInboxResponse } from "./types";

export const getPriorityInbox = async (req: Request, res: Response): Promise<void> => {
  const n = parseInt(req.query.n as string, 10) || 10;

  console.log(`[CONTROLLER] Priority inbox requested | Top ${n} notifications`);

  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
    const notification_type = req.query.notification_type as string;

    const notifications = await fetchNotifications({ limit, page, notification_type });

    if (notifications.length === 0) {
      console.log("[CONTROLLER] No notifications found from API");
      res.status(200).json({ total: 0, topN: n, notifications: [] });
      return;
    }

    const scored = calculatePriorityScores(notifications);
    const topN = getTopNNotifications(scored, n);

    const response: PriorityInboxResponse = {
      total: notifications.length,
      topN: topN.length,
      notifications: topN,
    };

    console.log(`[CONTROLLER] Returning ${topN.length} prioritized notifications out of ${notifications.length} total`);
    res.status(200).json(response);
  } catch (error: any) {
    console.error(`[CONTROLLER] Error fetching priority inbox | ${error.message}`);
    res.status(500).json({
      error: "Failed to fetch priority inbox",
      message: error.message,
    });
  }
};

export const getAllNotifications = async (req: Request, res: Response): Promise<void> => {
  console.log("[CONTROLLER] All notifications requested");

  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
    const notification_type = req.query.notification_type as string;

    const notifications = await fetchNotifications({ limit, page, notification_type });
    console.log(`[CONTROLLER] Returning all ${notifications.length} notifications`);
    res.status(200).json({ total: notifications.length, notifications });
  } catch (error: any) {
    console.error(`[CONTROLLER] Error fetching all notifications | ${error.message}`);
    res.status(500).json({
      error: "Failed to fetch notifications",
      message: error.message,
    });
  }
};
