import { Package } from "./types";

export const BACKEND_PACKAGES: ReadonlySet<Package> = new Set<Package>([
  Package.CACHE,
  Package.CONTROLLER,
  Package.CRON_JOB,
  Package.DB,
  Package.DOMAIN,
  Package.HANDLER,
  Package.REPOSITORY,
  Package.ROUTE,
  Package.SERVICE,
]);

export const FRONTEND_PACKAGES: ReadonlySet<Package> = new Set<Package>([
  Package.API,
  Package.COMPONENT,
  Package.HOOK,
  Package.PAGE,
  Package.STATE,
  Package.STYLE,
]);

export const SHARED_PACKAGES: ReadonlySet<Package> = new Set<Package>([
  Package.AUTH,
  Package.CONFIG,
  Package.MIDDLEWARE,
  Package.UTILS,
]);

export const LOG_ENDPOINT = "/logs";
