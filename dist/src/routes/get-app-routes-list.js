import { APP_ROUTES_PATH } from "../locations";
const appRoutes = require(APP_ROUTES_PATH);
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
