import { APP_ROUTES_PATH } from "../locations";
import { Route } from "../app-navigator";

const appRoutes = require(APP_ROUTES_PATH);

export function getAppRoutesList() {
  return getRoutesList(appRoutes);
}

function getRoutesList(root: Route) {
  const patterns: string[] = [];

  patterns.push(root.route);

  for (const childRoute of root.children)
    patterns.push(...getRoutesList(childRoute));

  return patterns;
}
