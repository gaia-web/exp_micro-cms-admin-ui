import { Router } from "vue-router";

export enum RouteNames {
  INFO_PAGE = "info",
  INFO_DETAIL_PAGE = `${RouteNames.INFO_PAGE}_detail`,
  BLOB_PAGE = "blob",
  BLOB_DETAIL_PAGE = `${RouteNames.BLOB_PAGE}_detail`,
  ME_PAGE = "me",
}

export function getRoutePathByName(router: Router, name: string) {
  return router.getRoutes().find((route) => name === route.name)?.path;
}
