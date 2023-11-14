<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title size="large">General Info</ion-title>
        <ion-buttons slot="end" :collapse="true">
          <ion-button href="/tabs/general/$" title="Add">
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
            <ion-button href="/tabs/general/$" title="Add">
              <ion-icon slot="icon-only" :icon="add"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item
          v-for="itemKey in itemKeys"
          button
          @click="$router.push(`/tabs/general/${encodeURIComponent(itemKey)}`)"
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
import { onBeforeMount, ref } from "vue";
import { add } from "ionicons/icons";

const itemKeys = ref<string[]>();

const refreshList = async () => {
  itemKeys.value = await obtainGeneralInfoList();
};

onBeforeMount(async () => {
  await refreshList();
});
</script>
