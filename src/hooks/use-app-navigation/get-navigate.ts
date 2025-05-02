import { AppNavigation } from "../../types/app-navigation";
import { getGenericForRoute } from "./utils";
import { getAppRoutesList } from "../../routes";

export function getNavigate(reactNativeNavigation: AppNavigation) {
  return (route: string, options: unknown) => {
    const genericRoute = getGenericForRoute(
      route,
      getAppRoutesList().map((route) => route.slice(1)), // removing the first '/'
    );

    if (!genericRoute) {
      console.error(`Route: ${route} not found`);
      return;
    }

    reactNativeNavigation.navigate(genericRoute, options);
  };
}
