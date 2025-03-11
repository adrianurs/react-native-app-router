const dynamicRoutePartRegex = new RegExp(/\[(.*?)\]/);
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
    const isDynamicPartPattern = dynamicRoutePartRegex.test(currentPart);
    const isDynamicPartRoute = dynamicRoutePartRegex.test(
      routeParts[partPosition],
    );
    if (
      (currentPart !== routeParts[partPosition] && !isDynamicPartPattern) ||
      isDynamicPartRoute !== isDynamicPartPattern
    )
      return false;
  }
  return true;
}
