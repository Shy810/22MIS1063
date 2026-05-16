import { Notification, ScoredNotification } from "./types";

const TYPE_WEIGHTS: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

const WEIGHT_FACTOR = 0.6;
const RECENCY_FACTOR = 0.4;

const getTypeWeight = (type: string): number => {
  return TYPE_WEIGHTS[type] ?? 0;
};

const normalizeRecency = (
  timestamp: string,
  minTime: number,
  maxTime: number
): number => {
  const time = new Date(timestamp).getTime();

  if (maxTime === minTime) return 1;

  return (time - minTime) / (maxTime - minTime);
};

export const calculatePriorityScores = (
  notifications: Notification[]
): ScoredNotification[] => {
  if (notifications.length === 0) return [];

  const timestamps = notifications.map((n) => new Date(n.Timestamp).getTime());
  const minTime = Math.min(...timestamps);
  const maxTime = Math.max(...timestamps);

  console.log(`[PRIORITY] Calculating scores for ${notifications.length} notifications`);
  console.log(`[PRIORITY] Time range: ${new Date(minTime).toISOString()} to ${new Date(maxTime).toISOString()}`);
  console.log(`[PRIORITY] Scoring weights: Type=${WEIGHT_FACTOR * 100}%, Recency=${RECENCY_FACTOR * 100}%`);

  const scored: ScoredNotification[] = notifications.map((notification) => {
    const typeWeight = getTypeWeight(notification.Type);
    const normalizedWeight = typeWeight / 3;
    const recencyScore = normalizeRecency(notification.Timestamp, minTime, maxTime);
    const priorityScore = normalizedWeight * WEIGHT_FACTOR + recencyScore * RECENCY_FACTOR;

    return {
      ...notification,
      typeWeight,
      recencyScore: parseFloat(recencyScore.toFixed(4)),
      priorityScore: parseFloat(priorityScore.toFixed(4)),
    };
  });

  return scored;
};

export const getTopNNotifications = (
  scored: ScoredNotification[],
  n: number
): ScoredNotification[] => {
  const sorted = [...scored].sort((a, b) => {
    if (b.priorityScore !== a.priorityScore) {
      return b.priorityScore - a.priorityScore;
    }
    return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
  });

  const topN = sorted.slice(0, n);

  console.log(`[PRIORITY] Top ${n} notifications selected from ${scored.length} total`);
  topN.forEach((item, index) => {
    console.log(
      `  #${index + 1} | Score: ${item.priorityScore} | Type: ${item.Type} (weight=${item.typeWeight}) | ${item.Message}`
    );
  });

  return topN;
};
