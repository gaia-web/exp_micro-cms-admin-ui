import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import { RouteNames } from "@/utils/routes";
import { checkAuthentication } from "@/utils/api";
import { alertController } from "@ionic/vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "me",
      },
      {
        name: RouteNames.GENERAL_INFO_PAGE,
        path: "general",
        component: () => import("@/views/GeneralInfoPage.vue"),
      },
      {
        name: RouteNames.GENERAL_INFO_PAGE + "_detail",
        path: "general/:id",
        component: () => import("@/views/GeneralInfoDetailPage.vue"),
      },
      {
        name: RouteNames.DOCUMENTS_PAGE,
        path: "documents",
        component: () => import("@/views/DocumentsPage.vue"),
      },
      {
        name: RouteNames.ASSETS_PAGE,
        path: "assets",
        component: () => import("@/views/AssetsPage.vue"),
      },
      {
        name: RouteNames.ME_PAGE,
        path: "me",
        component: () => import("@/views/MePage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeResolve(async (to) => {
  if (to.name === RouteNames.ME_PAGE) return;
  if (!(await checkAuthentication())) {
    const alert = await alertController.create({
      header: "Not authenticated.",
      message: "Sign in to continue.",
      buttons: ["Ok"],
    });
    await alert.present();
    return { name: RouteNames.ME_PAGE };
  }
});

export default router;
