import { useRoute } from "@react-navigation/core";
import { getGenericForRoute, getParamKeyAndPositionMap } from "./utils";
import { getAppRoutesList } from "../../routes";
const appRoutesList = getAppRoutesList();
export function useRouteParams() {
  const route = useRoute();
  const params = {};
  if (!route.path) return {};
  const genericRoute = getGenericForRoute(route.path, appRoutesList) ?? "";
  const paramKeyAndPositionMap = getParamKeyAndPositionMap(genericRoute);
  const splittedRoute = route.path?.split("/");
  for (const paramKeyAndPos of paramKeyAndPositionMap.entries())
    Object.assign(params, {
      [paramKeyAndPos[0]]: splittedRoute[paramKeyAndPos[1]],
    });
  return params;
}
