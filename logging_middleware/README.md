# Logging Middleware

A reusable, production-grade logging middleware package built with **Node.js**, **TypeScript**, **Axios**, and **dotenv**. It sends structured log entries to a remote evaluation service API with built-in validation, error handling, and console observability.

---

## Folder Structure

```
logging_middleware/
│
├── src/
│   ├── logger.ts        # Core Log() function
│   ├── auth.ts          # Environment variable loader & validator
│   ├── constants.ts     # Package sets & API endpoint constant
│   ├── types.ts         # TypeScript enums, types & interfaces
│   ├── validator.ts     # Centralized input validation logic
│   ├── index.ts         # Barrel export file
│
├── .env                 # Environment variables (not committed)
├── .env.example         # Example environment variables
├── package.json         # Project configuration & dependencies
├── tsconfig.json        # TypeScript compiler configuration
├── README.md            # Documentation
```

---

## Installation

```bash
cd logging_middleware
npm install
```

---

## Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update `.env` with your actual values:

```env
BASE_URL=http://4.224.186.213/evaluation-service
ACCESS_TOKEN=your_actual_bearer_token_here
```

> **Note:** Obtain your `ACCESS_TOKEN` by calling the Authentication API with your registered credentials.

---

## Build

```bash
npm run build
```

This compiles TypeScript from `src/` into JavaScript in `dist/`.

---

## Usage

### Import and Call

```typescript
import { Log } from "./logging_middleware/src";

// Log a successful controller action
await Log("backend", "info", "controller", "Notification created successfully");

// Log a database error
await Log("backend", "fatal", "db", "Critical database connection failure.");

// Log a frontend component error
await Log("frontend", "error", "component", "Failed to render dashboard widget.");

// Log a debug message from middleware
await Log("backend", "debug", "middleware", "Request payload validated successfully.");
```

### Using Enums (Recommended)

```typescript
import { Log, Stack, Level, Package } from "./logging_middleware/src";

await Log(
  Stack.BACKEND,
  Level.INFO,
  Package.CONTROLLER,
  "User registration completed for userId: 12345"
);
```

---

## Valid Parameters

### Stack

| Value      | Description          |
| ---------- | -------------------- |
| `backend`  | Backend application  |
| `frontend` | Frontend application |

### Level

| Value   | Description                     |
| ------- | ------------------------------- |
| `debug` | Debugging information           |
| `info`  | Informational messages          |
| `warn`  | Warning conditions              |
| `error` | Error conditions                |
| `fatal` | Critical/fatal error conditions |

### Packages

| Category         | Packages                                                                    |
| ---------------- | --------------------------------------------------------------------------- |
| Backend Only     | `cache`, `controller`, `cron_job`, `db`, `domain`, `handler`, `repository`, `route`, `service` |
| Frontend Only    | `api`, `component`, `hook`, `page`, `state`, `style`                        |
| Shared (Both)    | `auth`, `config`, `middleware`, `utils`                                     |

---

## Validation Rules

1. **Stack** must be either `"backend"` or `"frontend"`.
2. **Level** must be one of `"debug"`, `"info"`, `"warn"`, `"error"`, `"fatal"`.
3. **Package** must be a recognized package name.
4. **Message** must be a non-empty string.
5. **Backend packages** cannot be used with the `"frontend"` stack.
6. **Frontend packages** cannot be used with the `"backend"` stack.
7. **Shared packages** work with both stacks.

Invalid parameters throw descriptive `Error` messages.

---

## API Details

| Field   | Value                                                    |
| ------- | -------------------------------------------------------- |
| Method  | `POST`                                                   |
| URL     | `http://4.224.186.213/evaluation-service/logs`           |
| Auth    | `Authorization: Bearer <ACCESS_TOKEN>`                   |
| Body    | `{ "stack", "level", "package", "message" }`             |

### Success Response (200)

```json
{
  "logID": "a4aad02e-19d0-4153-86d9-58bf55d7c402",
  "message": "log created successfully"
}
```

---

## NPM Scripts

| Script          | Command            | Description                          |
| --------------- | ------------------ | ------------------------------------ |
| `npm run build` | `tsc`              | Compile TypeScript to JavaScript     |
| `npm run dev`   | `ts-node src/index.ts` | Run in development mode          |
| `npm start`     | `node dist/index.js`   | Run compiled production build    |

---

## Tech Stack

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript with strict mode
- **Axios** - HTTP client for API requests
- **dotenv** - Environment variable management
