import axios from "axios";
import { config } from "./config";
import { getValidToken, refreshToken } from "./auth";
import { Notification, NotificationApiResponse } from "./types";

export const fetchNotifications = async (): Promise<Notification[]> => {
  const url = `${config.baseUrl}/notifications`;
  let token = await getValidToken();

  console.log(`[SERVICE] Fetching notifications from: ${url}`);

  try {
    const response = await axios.get<NotificationApiResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const count = response.data.notifications?.length ?? 0;
    console.log(`[SERVICE] Fetched ${count} notifications successfully`);

    return response.data.notifications || [];
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("[SERVICE] Token expired during fetch, refreshing and retrying...");
      token = await refreshToken();

      const retryResponse = await axios.get<NotificationApiResponse>(url, {
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
