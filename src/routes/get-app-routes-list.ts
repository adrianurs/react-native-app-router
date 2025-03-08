import { Route } from "../app-navigator";
import appRoutes from "../../output/app-routes";

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
