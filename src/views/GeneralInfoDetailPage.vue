<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" :collapse="true">
          <ion-back-button defaultHref="/tabs/general"></ion-back-button>
        </ion-buttons>
        <ion-title size="large">{{ key ?? "General Info" }}</ion-title>
        <ion-buttons slot="end" :collapse="true">
          <ion-button @click="updateHandler">
            <ion-icon slot="icon-only" :icon="save"></ion-icon>
          </ion-button>
          <ion-button @click="deleteHandler">
            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header data-note="This is only for iOS." collapse="condense">
        <ion-toolbar>
          <ion-buttons slot="start" :collapse="true">
            <ion-back-button defaultHref="/tabs/general"></ion-back-button>
          </ion-buttons>
          <ion-title size="large">{{ key ?? "General Info" }}</ion-title>
          <ion-buttons slot="end" :collapse="true">
            <ion-button @click="updateHandler">
              <ion-icon slot="icon-only" :icon="save"></ion-icon>
            </ion-button>
            <ion-button @click="deleteHandler">
              <ion-icon slot="icon-only" :icon="trash"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item>
          <ion-input
            label="Key"
            :disabled="id !== '$'"
            v-model="key"
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
import {
  addGeneralInfo,
  deleteGeneralInfo,
  obtainGeneralInfo,
  obtainGeneralInfoList,
  redirectToMePageIfNotAuthenticated,
  updateGeneralInfo,
} from "@/utils/api";
import { onBeforeMount, onMounted, ref } from "vue";
import { add, save, trash } from "ionicons/icons";
import { ulid } from "ulid";

const router = useRouter();

redirectToMePageIfNotAuthenticated(router.replace);

const id = useRoute().params["id"] as string;
const key = ref(id === "$" ? ulid() : id);
const value = ref();

const refreshValue = async () => {
  if (id === "$") return;
  try {
    value.value = await obtainGeneralInfo(key.value);
  } catch (e) {
    router.replace("/tabs/general");
  }
};

onMounted(async () => {
  await refreshValue();
});

const updateHandler = async () => {
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
            ? await addGeneralInfo(key.value, value.value)
            : await updateGeneralInfo(key.value, value.value);
          router.replace("/tabs/general");
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
          await deleteGeneralInfo(key.value);
          router.replace("/tabs/general");
        },
      },
    ],
  });
  await alert.present();
};
</script>
