import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Point to the backend service
});

export interface Notification {
  ID: string;
  Type: "Placement" | "Result" | "Event";
  Message: string;
  Timestamp: string;
}

export interface ScoredNotification extends Notification {
  priorityScore?: number;
  typeWeight?: number;
  recencyScore?: number;
}

export interface FetchNotificationsParams {
  limit?: number;
  page?: number;
  notification_type?: string;
}

export interface FetchNotificationsResponse {
  total: number;
  notifications: Notification[];
}

export interface FetchPriorityResponse {
  total: number;
  topN: number;
  notifications: ScoredNotification[];
}

export const fetchAllNotifications = async (params?: FetchNotificationsParams): Promise<FetchNotificationsResponse> => {
  const { data } = await api.get<FetchNotificationsResponse>('/notifications', { params });
  return data;
};

export const fetchPriorityInbox = async (params?: FetchNotificationsParams & { n?: number }): Promise<FetchPriorityResponse> => {
  // Translate limit to n for the priority endpoint if needed, though backend uses n
  const { data } = await api.get<FetchPriorityResponse>('/notifications/priority', { params });
  return data;
};
