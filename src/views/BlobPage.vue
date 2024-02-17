<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title size="large">Blob</ion-title>
        <ion-buttons slot="end" :collapse="true">
          <ion-button
            @click="
              $router.push(
                getRoutePathByName(
                  $router,
                  RouteNames.BLOB_DETAIL_PAGE
                )?.replace(':id', '$') ?? ''
              )
            "
            title="Add"
          >
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- This header is only for iOS. -->
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blob</ion-title>
          <ion-buttons slot="end" :collapse="true">
            <ion-button
              @click="
                $router.push(
                  getRoutePathByName(
                    $router,
                    RouteNames.BLOB_DETAIL_PAGE
                  )?.replace(':id', '$') ?? ''
                )
              "
              title="Add"
            >
              <ion-icon slot="icon-only" :icon="add"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-refresher slot="fixed" @ionRefresh="refresherActiveHandler">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <ion-item
          v-for="itemKey in itemKeys"
          button
          @click="
            $router.push(
              getRoutePathByName($router, RouteNames.BLOB_DETAIL_PAGE)?.replace(
                ':id',
                encodeURIComponent(itemKey)
              ) ?? ''
            )
          "
        >
          {{ itemKey }}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonPage,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonToolbar,
  IonTitle,
  IonContent,
  RefresherEventDetail,
} from "@ionic/vue";
import { getBlobKeys } from "@/utils/api";
import { onBeforeUpdate, ref } from "vue";
import { add } from "ionicons/icons";
import { RouteNames, getRoutePathByName } from "@/utils/routes";

const itemKeys = ref<string[]>();

onBeforeUpdate(async () => {
  await refreshList();
});

const refreshList = async () => {
  itemKeys.value = await getBlobKeys();
};

const refresherActiveHandler = async ({
  detail,
}: CustomEvent<RefresherEventDetail>) => {
  await refreshList();
  detail.complete();
};
</script>
