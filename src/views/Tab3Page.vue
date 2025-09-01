<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Panel de Usuario</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="user" class="profile-container">
        <div class="profile-header">
          <ion-avatar class="profile-avatar">
            <img :src="user.photoURL || 'https://www.gravatar.com/avatar?d=mp&s=150'" alt="Foto de perfil">
          </ion-avatar>
          <ion-text class="user-info">
            <h2>{{ user.displayName || 'Usuario' }}</h2>
            <p>{{ user.email }}</p>
          </ion-text>
        </div>
        
        <ion-card class="stats-card">
          <ion-card-header>
            <ion-card-title>Mis Estadísticas</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="stat-item">
              <ion-icon :icon="starOutline"></ion-icon>
              <span>Curiosidades favoritas: **{{ totalFavorites }}**</span>
            </div>
            </ion-card-content>
        </ion-card>

        <ion-button expand="block" class="logout-button" @click="handleSignOut">
          <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
          Cerrar Sesión
        </ion-button>
      </div>
      <div v-else class="not-logged-in">
        <ion-text>
          <h2>No hay usuario conectado</h2>
          <p>Por favor, inicia sesión para ver tu perfil.</p>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onUnmounted
} from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonText
} from '@ionic/vue';
import {
  logOutOutline,
  starOutline
} from 'ionicons/icons';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  User
} from 'firebase/auth';
import {
  useRouter
} from 'vue-router';
import {
  getFavorites
} from '../services/firebase';

const user = ref < User | null > (null);
const router = useRouter();
const auth = getAuth();
const totalFavorites = ref(0);

// Escucha cambios en el estado de autenticación
const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  user.value = currentUser;
  if (currentUser) {
    await updateFavoritesCount();
  }
});

const updateFavoritesCount = async () => {
  const favorites = await getFavorites();
  totalFavorites.value = favorites.length;
};

// Maneja el cierre de sesión
const handleSignOut = async () => {
  try {
    await signOut(auth);
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    alert('No se pudo cerrar la sesión.');
  }
};

onUnmounted(() => {
  unsubscribe();
});
</script>

<style scoped>
ion-toolbar {
  --background: var(--ion-color-light);
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.user-info h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.user-info p {
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0 0;
}

.stats-card {
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.stat-item ion-icon {
  margin-right: 10px;
  color: #3880ff;
}

.logout-button {
  width: 100%;
  max-width: 400px;
}

.not-logged-in {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}
</style>