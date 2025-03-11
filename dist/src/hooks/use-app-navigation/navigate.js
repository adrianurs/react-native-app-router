import { getGenericForRoute } from "./utils";
import { getAppRoutesList } from "../../routes";
export function navigate(route, options) {
  const genericRoute = getGenericForRoute(
    route,
    getAppRoutesList().map((route) => route.slice(1)),
  );
  if (!genericRoute) {
    console.error(`Route: ${route} not found`);
    return;
  }
  this.navigate(genericRoute, options);
}
