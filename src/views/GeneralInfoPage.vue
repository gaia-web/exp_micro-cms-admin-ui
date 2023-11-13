<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title size="large">General Info</ion-title>
        <ion-buttons slot="end" :collapse="true">
          <ion-button href="/tabs/general/$">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header data-note="This is only for iOS." collapse="condense">
        <ion-toolbar>
          <ion-title size="large">General Info</ion-title>
          <ion-buttons slot="end" :collapse="true">
            <ion-button href="/tabs/general/$">
              <ion-icon slot="icon-only" :icon="add"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item
          v-for="itemKey in itemKeys"
          button
          :href="`/tabs/general/${encodeURIComponent(itemKey)}`"
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
  alertController,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import {
  addGeneralInfo,
  deleteGeneralInfo,
  obtainGeneralInfo,
  obtainGeneralInfoList,
  redirectToMePageIfNotAuthenticated,
  updateGeneralInfo,
} from "@/utils/api";
import { onBeforeMount, ref } from "vue";
import { add } from "ionicons/icons";

redirectToMePageIfNotAuthenticated(useRouter().replace);

const itemKeys = ref<string[]>();

const refreshList = async () => {
  itemKeys.value = await obtainGeneralInfoList();
};

onBeforeMount(async () => {
  await refreshList();
});
</script>
