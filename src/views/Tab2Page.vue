<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mis Favoritos</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="favoritos.length === 0" class="empty-state">
        <ion-icon :icon="heartOutline" class="empty-icon"></ion-icon>
        <ion-text>
          <h2>¡Aún no tienes favoritos!</h2>
          <p>Ve a curiosidades y guarda tus datos favoritos.</p>
        </ion-text>
      </div>
      <ion-list v-else>
        <ion-card v-for="favorito in favoritos" :key="favorito.id" class="favorito-card">
          <ion-card-header>
            <ion-card-title>{{ favorito.titulo }}</ion-card-title>
            <ion-button fill="clear" color="danger" class="delete-button" @click="handleDelete(favorito.id)">
                <ion-icon :icon="trashOutline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-card-header>
          <ion-card-content>
            <p>{{ favorito.texto }}</p>
          </ion-card-content>
        </ion-card>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted
} from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonText,
  IonButton,
  toastController
} from '@ionic/vue';
import {
  heartOutline,
  trashOutline
} from 'ionicons/icons';
import {
  getFavorites,
  deleteFavorite
} from '../services/firebase';

const favoritos = ref < any[] > ([]);

const loadFavorites = async () => {
  const fetchedFavorites = await getFavorites();
  favoritos.value = fetchedFavorites;
};

const handleDelete = async (curiosidadId: string) => {
    const toast = await toastController.create({
        message: '¿Estás seguro de que quieres eliminar este favorito?',
        position: 'bottom',
        buttons: [
            {
                text: 'Sí, eliminar',
                role: 'confirm',
                handler: async () => {
                    const success = await deleteFavorite(curiosidadId);
                    if (success) {
                        await loadFavorites();
                        const successToast = await toastController.create({
                            message: 'Favorito eliminado.',
                            duration: 1500,
                            position: 'bottom',
                            color: 'success'
                        });
                        await successToast.present();
                    } else {
                         const errorToast = await toastController.create({
                            message: 'Error al eliminar el favorito.',
                            duration: 1500,
                            position: 'bottom',
                            color: 'danger'
                        });
                        await errorToast.present();
                    }
                }
            },
            {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                    console.log('Eliminación cancelada');
                }
            }
        ]
    });
    await toast.present();
};

onMounted(() => {
  loadFavorites();
});
</script>

<style scoped>
ion-toolbar {
  --background: var(--ion-color-light);
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  color: #999;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  color: #ccc;
}

.empty-state h2 {
  font-size: 1.5rem;
  font-weight: bold;
}

.favorito-card {
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.delete-button {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 10;
}
</style>
