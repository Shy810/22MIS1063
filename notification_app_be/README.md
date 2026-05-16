# Notification App - Backend

Campus Notifications Backend microservice implementing a **Priority Inbox** that ranks notifications by importance and recency.

## Priority Algorithm

Notifications are scored using a weighted combination:

```
priorityScore = (typeWeight / 3) × 0.6 + recencyScore × 0.4
```

| Type      | Weight | Description                     |
| --------- | ------ | ------------------------------- |
| Placement | 3      | Highest priority (job postings) |
| Result    | 2      | Medium priority (exam results)  |
| Event     | 1      | Lower priority (campus events)  |

- **Recency** is normalized (0–1) across the dataset's time range
- **60% weight** to notification type, **40% weight** to recency
- Ties are broken by timestamp (most recent first)

## Setup

```bash
cd notification_app_be
npm install
```

## Run

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint                          | Description                  |
| ------ | --------------------------------- | ---------------------------- |
| GET    | `/health`                         | Health check                 |
| GET    | `/api/notifications`              | All raw notifications        |
| GET    | `/api/notifications/priority?n=10`| Top N prioritized inbox      |

## Query Parameters

| Param | Default | Description                          |
| ----- | ------- | ------------------------------------ |
| `n`   | 10      | Number of top notifications to return|
