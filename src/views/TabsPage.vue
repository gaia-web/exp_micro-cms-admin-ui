<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="general"
          :href="getRoutePathByName($router, RouteNames.GENERAL_INFO_PAGE)"
        >
          <ion-icon aria-hidden="true" :icon="informationCircle" />
          <ion-label>General Info</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="documents"
          :href="getRoutePathByName($router, RouteNames.DOCUMENTS_PAGE)"
        >
          <ion-icon aria-hidden="true" :icon="documentText" />
          <ion-label>Documents</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="assets"
          :href="getRoutePathByName($router, RouteNames.ASSETS_PAGE)"
        >
          <ion-icon aria-hidden="true" :icon="attach" />
          <ion-label>Assets</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="me"
          :href="getRoutePathByName($router, RouteNames.ME_PAGE)"
        >
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
  documentText,
  informationCircle,
  person,
} from "ionicons/icons";
</script>
