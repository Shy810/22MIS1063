export enum Stack {
  BACKEND = "backend",
  FRONTEND = "frontend",
}

export enum Level {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  FATAL = "fatal",
}

export enum Package {
  CACHE = "cache",
  CONTROLLER = "controller",
  CRON_JOB = "cron_job",
  DB = "db",
  DOMAIN = "domain",
  HANDLER = "handler",
  REPOSITORY = "repository",
  ROUTE = "route",
  SERVICE = "service",

  API = "api",
  COMPONENT = "component",
  HOOK = "hook",
  PAGE = "page",
  STATE = "state",
  STYLE = "style",

  AUTH = "auth",
  CONFIG = "config",
  MIDDLEWARE = "middleware",
  UTILS = "utils",
}

export interface LogRequestBody {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

export interface LogSuccessResponse {
  logID: string;
  message: string;
}

export interface EnvConfig {
  BASE_URL: string;
  ACCESS_TOKEN: string;
}
