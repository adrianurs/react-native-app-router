const dynamicRoutePartRegex = new RegExp(/\[(.*?)\]/);
export function getParamKeyAndPositionMap(genericRoute) {
  const splittedGenericRoute = genericRoute.split("/") ?? [];
  const paramKeyAndPositionMap = new Map();
  for (
    let routePartPos = 0;
    routePartPos < splittedGenericRoute?.length;
    routePartPos++
  ) {
    const currentRoutePart = splittedGenericRoute[routePartPos];
    if (!dynamicRoutePartRegex.test(currentRoutePart)) continue;
    const cleanedUpRoute = cleanupDynamicRoutePart(currentRoutePart);
    paramKeyAndPositionMap.set(cleanedUpRoute, routePartPos);
  }
  return paramKeyAndPositionMap;
}
function cleanupDynamicRoutePart(dynamicRoutePart) {
  return dynamicRoutePart.replaceAll("[", "").replaceAll("]", "");
}
export function getGenericForRoute(route, genericRoutes) {
  const routeParts = route.split("/");
  for (const genericRoute of genericRoutes) {
    const patternParts = genericRoute.split("/");
    if (patternParts.length !== routeParts.length) continue;
    if (doesPatternMatchRoute(patternParts, routeParts)) return genericRoute;
  }
  return null;
}
function doesPatternMatchRoute(patternParts, routeParts) {
  for (
    let partPosition = 0;
    partPosition < patternParts.length;
    partPosition++
  ) {
    const currentPart = patternParts[partPosition];
    const isDynamicPart = dynamicRoutePartRegex.test(currentPart);
    if (currentPart !== routeParts[partPosition] && !isDynamicPart)
      return false;
  }
  return true;
}
