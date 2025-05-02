import { getGenericForRoute } from "./utils";
import { getAppRoutesList } from "../../routes";
export function getNavigate(reactNativeNavigation) {
    return (route, options) => {
        const genericRoute = getGenericForRoute(route, getAppRoutesList().map((route) => route.slice(1)));
        if (!genericRoute) {
            console.error(`Route: ${route} not found`);
            return;
        }
        reactNativeNavigation.navigate(genericRoute, options);
    };
}
