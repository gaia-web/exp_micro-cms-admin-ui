<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title size="large">General Info</ion-title>
        <ion-buttons slot="end" :collapse="true">
          <ion-button
            @click="
              $router.push(
                getRoutePathByName(
                  $router,
                  RouteNames.GENERAL_INFO_DETAIL_PAGE
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
          <ion-title size="large">General Info</ion-title>
          <ion-buttons slot="end" :collapse="true">
            <ion-button
              @click="
                $router.push(
                  getRoutePathByName(
                    $router,
                    RouteNames.GENERAL_INFO_DETAIL_PAGE
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

      <ion-list>
        <ion-item
          v-for="itemKey in itemKeys"
          button
          @click="
            $router.push(
              getRoutePathByName(
                $router,
                RouteNames.GENERAL_INFO_DETAIL_PAGE
              )?.replace(':id', encodeURIComponent(itemKey)) ?? ''
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
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { obtainGeneralInfoList } from "@/utils/api";
import { onBeforeMount, onBeforeUpdate, onMounted, ref } from "vue";
import { add } from "ionicons/icons";
import { RouteNames, getRoutePathByName } from "@/utils/routes";

const itemKeys = ref<string[]>();

onBeforeUpdate(async () => {
  await refreshList();
});

const refreshList = async () => {
  itemKeys.value = await obtainGeneralInfoList();
};
</script>
