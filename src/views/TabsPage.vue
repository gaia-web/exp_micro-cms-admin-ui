<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="general" href="/tabs/general">
          <ion-icon aria-hidden="true" :icon="informationCircle" />
          <ion-label>General Info</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="documents" href="/tabs/documents">
          <ion-icon aria-hidden="true" :icon="documentText" />
          <ion-label>Documents</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="assets" href="/tabs/assets">
          <ion-icon aria-hidden="true" :icon="attach" />
          <ion-label>Assets</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="me" href="/tabs/me">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>Me</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { attach, documentText, informationCircle, person } from 'ionicons/icons';
</script>
