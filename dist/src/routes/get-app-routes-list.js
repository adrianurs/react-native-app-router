import appRoutes from "../../output/app-routes";
export function getAppRoutesList() {
  return getRoutesList(appRoutes);
}
function getRoutesList(root) {
  const patterns = [];
  patterns.push(root.route);
  for (const childRoute of root.children)
    patterns.push(...getRoutesList(childRoute));
  return patterns;
}
