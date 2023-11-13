<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Me</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Me</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card v-if="!authenticated" slot="fixed" class="center">
        <ion-item>
          <ion-input
            label="Passcode"
            placeholder="Your passcode"
            type="password"
            @ion-input="
              ({ detail }) => (passcode = detail.value?.toString() ?? '')
            "
          ></ion-input>
        </ion-item>
        <ion-button expand="block" @click="signInHandler">Sign In</ion-button>
      </ion-card>
      <ion-text v-else slot="fixed" class="center">You are signed in.</ion-text>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { checkAuthentication, signIn } from "@/utils/api";
import {
  IonButton,
  IonCard,
  IonPage,
  IonHeader,
  IonInput,
  IonItem,
  IonText,
  IonToolbar,
  IonTitle,
  IonContent,
  alertController,
} from "@ionic/vue";
import { onBeforeMount, ref } from "vue";

const authenticated = ref<Boolean>();
const passcode = ref("");

onBeforeMount(async () => {
  authenticated.value = await checkAuthentication();
});

const signInHandler = async () => {
  try {
    await signIn(passcode.value);
    authenticated.value = await checkAuthentication();
  } finally {
    if (!authenticated.value) {
      const alert = await alertController.create({
        header: "Fail to sign in.",
        message: "Fail to sign in, please try again.",
        buttons: ["Ok"],
      });
      await alert.present();
    }
  }
};
</script>

<style scoped>
.center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
