import { APP_ROUTES_PATH } from "../locations";

const appRoutes = require(APP_ROUTES_PATH);

export function getAppRoutes() {
  return appRoutes ?? {};
}
