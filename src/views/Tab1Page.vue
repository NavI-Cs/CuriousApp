<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Curiosidades</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Curiosidades</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="main-content">
        <div class="search-bar-container">
          <ion-searchbar></ion-searchbar>
        </div>
        <h2 class="ion-padding-start">Categorías</h2>
        <ion-grid class="ion-padding">
          <ion-row>
            <ion-col size="6" size-md="4" v-for="category in categories" :key="category.id">
              <ion-card button @click="navigateToCategory(category.path)" class="category-card">
                <div class="icon-wrapper">
                  <ion-icon :icon="category.icon" class="category-icon"></ion-icon>
                </div>
                <ion-card-header>
                  <ion-card-title>{{ category.name }}</ion-card-title>
                  <ion-card-subtitle>{{ category.subtitle }}</ion-card-subtitle>
                </ion-card-header>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
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
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,
  IonSearchbar,
  IonButtons,
  IonMenuButton,
} from '@ionic/vue';
import {
  flaskOutline,
  earthOutline,
  colorPaletteOutline,
  gameControllerOutline,
  fitnessOutline,
  bulbOutline,
} from 'ionicons/icons';
import {
  useRouter
} from 'vue-router';

const router = useRouter();

const categories = [{
  id: 'ciencia',
  name: 'Ciencia',
  subtitle: '1 curiosidades',
  icon: flaskOutline,
  path: 'ciencia'
}, {
  id: 'historia',
  name: 'Historia',
  subtitle: '1 curiosidades',
  icon: earthOutline,
  path: 'historia'
}, {
  id: 'arte',
  name: 'Arte',
  subtitle: '1 curiosidades',
  icon: colorPaletteOutline,
  path: 'arte'
}, {
  id: 'tecnologia',
  name: 'Tecnología',
  subtitle: '1 curiosidades',
  icon: gameControllerOutline,
  path: 'tecnologia'
}, {
  id: 'salud',
  name: 'Salud',
  subtitle: '1 curiosidades',
  icon: fitnessOutline,
  path: 'salud'
}, {
  id: 'psicologia',
  name: 'Psicología',
  subtitle: '1 curiosidades',
  icon: bulbOutline,
  path: 'psicologia'
}, ];

const navigateToCategory = (path: string) => {
  router.push(`/tabs/curiosidades/${path}`);
};
</script>

<style scoped>
ion-toolbar {
  --background: var(--ion-color-light);
}

.main-content {
  padding: 16px;
}

.search-bar-container {
  padding: 0 16px 16px;
}

.category-card {
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.category-card:hover {
  transform: translateY(-5px);
}

.icon-wrapper {
  background-color: var(--ion-color-light);
  border-radius: 50%;
  display: inline-flex;
  padding: 15px;
  margin-top: 15px;
}

.category-icon {
  font-size: 2.5em;
  color: var(--ion-color-primary);
}

ion-card-title {
  font-size: 1.2em;
  font-weight: bold;
}

ion-card-subtitle {
  color: #666;
  font-size: 0.8em;
}
</style>