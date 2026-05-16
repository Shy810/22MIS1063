import { Notification, ScoredNotification } from "./types";
export declare const calculatePriorityScores: (notifications: Notification[]) => ScoredNotification[];
export declare const getTopNNotifications: (scored: ScoredNotification[], n: number) => ScoredNotification[];
