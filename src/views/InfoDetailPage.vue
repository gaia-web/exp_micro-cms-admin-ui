<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start" :collapse="true">
          <ion-back-button defaultHref=".."></ion-back-button>
        </ion-buttons>
        <ion-title size="large">{{ key ?? "Info" }}</ion-title>
        <ion-buttons slot="end" :collapse="true">
          <ion-button @click="saveHandler" title="Save">
            <ion-icon slot="icon-only" :icon="save"></ion-icon>
          </ion-button>
          <ion-button @click="deleteHandler" title="Delete">
            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- This header is only for iOS. -->
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-buttons slot="start" :collapse="true">
            <ion-back-button defaultHref=".."></ion-back-button>
          </ion-buttons>
          <ion-title size="large">{{ key ?? "Info" }}</ion-title>
          <ion-buttons slot="end" :collapse="true">
            <ion-button @click="saveHandler" title="Save">
              <ion-icon slot="icon-only" :icon="save"></ion-icon>
            </ion-button>
            <ion-button @click="deleteHandler" title="Delete">
              <ion-icon slot="icon-only" :icon="trash"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item>
          <ion-input
            label="Key"
            label-placement="stacked"
            :disabled="id !== '$'"
            v-model="key"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            label="Content Type"
            label-placement="stacked"
            v-model="contentType"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-textarea
            label="Value"
            label-placement="stacked"
            auto-grow
            v-model="value"
          ></ion-textarea>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonPage,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonTextarea,
  IonToolbar,
  IonTitle,
  IonContent,
  alertController,
} from "@ionic/vue";
import { useRoute, useRouter } from "vue-router";
import { createInfo, deleteInfo, getInfo, updateInfo } from "@/utils/api";
import { Ref, onMounted, ref } from "vue";
import { save, trash } from "ionicons/icons";
import { ulid } from "ulid";
import { RouteNames, getRoutePathByName } from "@/utils/routes";

const router = useRouter();

const id = useRoute().params["id"] as string;
const key = ref(id === "$" ? ulid() : id);
const contentType: Ref<string | undefined> = ref("text/plain");
const value = ref();

onMounted(async () => {
  await refreshValue();
});

const goBackToParentPage = () => {
  router.replace(getRoutePathByName(router, RouteNames.INFO_PAGE) ?? "");
};

const refreshValue = async () => {
  if (id === "$") return;
  try {
    const info = await getInfo(key.value);
    value.value = info.content;
    contentType.value = info.contentType;
  } catch (e) {
    goBackToParentPage();
  }
};

const saveHandler = async () => {
  const alert = await alertController.create({
    header: "Saving item",
    message: `You are saving "${key.value}", are you sure?`,
    buttons: [
      {
        text: "No",
        role: "cancel",
      },
      {
        text: "Yes",
        role: "confirm",
        handler: async () => {
          id === "$"
            ? await createInfo(key.value, value.value, contentType.value)
            : await updateInfo(key.value, value.value, contentType.value);
          goBackToParentPage();
        },
      },
    ],
  });
  await alert.present();
};

const deleteHandler = async () => {
  const alert = await alertController.create({
    header: "Deleting item",
    message: `You are deleting "${key.value}", are you sure?`,
    buttons: [
      {
        text: "No",
        role: "cancel",
      },
      {
        text: "Yes",
        role: "confirm",
        handler: async () => {
          await deleteInfo(key.value);
          goBackToParentPage();
        },
      },
    ],
  });
  await alert.present();
};
</script>
