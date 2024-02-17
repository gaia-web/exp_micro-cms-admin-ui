<template>
  <ion-page>
    <ion-header :translucent="true">
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

      <ion-card v-if="!authenticated" class="center">
        <ion-card-header>
          <ion-card-title>Sign In</ion-card-title>
        </ion-card-header>
        <ion-item>
          <ion-input label="Passcode" placeholder="Your passcode" type="password" @ion-input="({ detail }) => (passcode = detail.value?.toString() ?? '')
            "></ion-input>
        </ion-item>
        <ion-button expand="block" @click="signInHandler">Sign In</ion-button>
      </ion-card>
      <ion-card v-else class="center">
        <ion-card-header>
          <ion-card-title>You are now signed in</ion-card-title>
          Click below button to sign out.
        </ion-card-header>
        <ion-button expand="block" @click="signOutHandler">Sign Out</ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { checkAuthentication, signIn, signOut } from "@/utils/api";
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonPage,
  IonHeader,
  IonInput,
  IonItem,
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

const signOutHandler = async () => {
  try {
    await signOut();
  } finally {
    authenticated.value = await checkAuthentication();
  }
};
</script>

<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
}

ion-card.center {
  width: 300px;
  max-width: calc(100% - 20px);
}
</style>
