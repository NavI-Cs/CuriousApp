<template>
  <ion-page>
    <ion-menu content-id="main-content" side="end">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menú</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item class="user-profile">
            <ion-avatar slot="start">
              <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Avatar de usuario">
            </ion-avatar>
            <ion-label>
              <h2>{{ userName }}</h2>
              <p>{{ userEmail }}</p>
            </ion-label>
          </ion-item>
          <ion-menu-toggle :auto-hide="false">
            <ion-item button @click="goToFavorites">
              <ion-icon slot="start" :icon="heartOutline"></ion-icon>
              <ion-label>Mis Favoritos</ion-label>
            </ion-item>
          </ion-menu-toggle>
          <ion-menu-toggle :auto-hide="false">
            <ion-item button @click="handleSignOut">
              <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
              <ion-label>Cerrar Sesión</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-tabs>
      <ion-router-outlet id="main-content"></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="curiosidades" href="/tabs/curiosidades">
          <ion-icon :icon="planetOutline" />
          <ion-label>Curiosidades</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="favoritos" href="/tabs/tab2">
          <ion-icon :icon="heartOutline" />
          <ion-label>Favoritos</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="usuario" href="/tabs/tab3">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted
} from 'vue';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonButtons,
  IonMenuButton,
  IonMenuToggle
} from '@ionic/vue';
import {
  planetOutline,
  heartOutline,
  personCircleOutline,
  logOutOutline
} from 'ionicons/icons';
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import {
  useRouter
} from 'vue-router';

// Variables reactivas para el usuario
const userName = ref('Cargando...');
const userEmail = ref('Cargando...');

const router = useRouter();

// Función para obtener la información del usuario
const fetchUser = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userName.value = user.displayName || 'Usuario';
      userEmail.value = user.email || 'Sin correo';
    } else {
      userName.value = 'Usuario Invitado';
      userEmail.value = 'No logueado';
    }
  });
};

// Función para cerrar sesión
const handleSignOut = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log('Sesión cerrada correctamente');
    router.push('/login'); // Redirigir a la página de inicio de sesión
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

// Función para navegar a la página de favoritos
const goToFavorites = () => {
  router.push('/tabs/tab2');
};

// Se ejecuta al cargar el componente
onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
ion-tabs {
  --background: var(--ion-color-light);
}

.user-profile {
  --background: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
}

.user-profile h2 {
  font-weight: bold;
}

.user-profile p {
  font-size: 0.9em;
  color: #666;
}

ion-item {
  --padding-start: 16px;
  --inner-padding-end: 16px;
}

ion-icon {
  margin-right: 12px;
}
</style>