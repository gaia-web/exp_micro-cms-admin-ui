import { createRouter, createWebHashHistory } from "@ionic/vue-router";
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
        name: RouteNames.INFO_PAGE,
        path: "info",
        component: () => import("@/views/InfoPage.vue"),
      },
      {
        name: RouteNames.INFO_DETAIL_PAGE,
        path: "info/:id",
        component: () => import("@/views/InfoDetailPage.vue"),
      },
      {
        name: RouteNames.BLOB_PAGE,
        path: "blob",
        component: () => import("@/views/BlobPage.vue"),
      },
      {
        name: RouteNames.BLOB_DETAIL_PAGE,
        path: "blob/:id",
        component: () => import("@/views/BlobDetailPage.vue"),
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
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
