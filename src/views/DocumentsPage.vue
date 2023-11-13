<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Documents</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Documents</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Documents page" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { redirectToMePageIfNotAuthenticated } from "@/utils/api";

redirectToMePageIfNotAuthenticated(useRouter().replace);
</script>
