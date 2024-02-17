<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="info" :href="getRoutePathByName($router, RouteNames.INFO_PAGE)">
          <ion-icon aria-hidden="true" :icon="informationCircle" />
          <ion-label>Info</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="blob" :href="getRoutePathByName($router, RouteNames.BLOB_PAGE)">
          <ion-icon aria-hidden="true" :icon="attach" />
          <ion-label>Blob</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="me" :href="getRoutePathByName($router, RouteNames.ME_PAGE)">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>Me</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { RouteNames, getRoutePathByName } from "@/utils/routes";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  attach,
  informationCircle,
  person,
} from "ionicons/icons";
</script>
