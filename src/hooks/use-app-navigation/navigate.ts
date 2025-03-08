import { AppNavigation } from "../../types/app-navigation";
import { getGenericForRoute } from "./utils";
import { getAppRoutesList } from "../../routes";

export function navigate(this: any, route: string, options: any) {
  const genericRoute = getGenericForRoute(route, getAppRoutesList());

  if (!genericRoute) {
    console.error(`Route: ${route} not found`);
    return;
  }

  (this as unknown as { navigate: AppNavigation["navigate"] }).navigate(
    genericRoute,
    options,
  );
}
