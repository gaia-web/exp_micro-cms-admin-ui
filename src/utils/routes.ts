import { Router } from "vue-router";

export enum RouteNames {
  GENERAL_INFO_PAGE = "general",
  GENERAL_INFO_DETAIL_PAGE = `${RouteNames.GENERAL_INFO_PAGE}_detail`,
  DOCUMENTS_PAGE = "documents",
  ASSETS_PAGE = "assets",
  ME_PAGE = "me",
}

export function getRoutePathByName(router: Router, name: string) {
  return router.getRoutes().find((route) => name === route.name)?.path;
}
