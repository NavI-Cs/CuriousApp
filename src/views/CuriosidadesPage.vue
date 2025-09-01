<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/curiosidades"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="curiosidad-container">
        <ion-card class="curiosidad-card">
          <ion-card-header>
            <ion-card-title>
              {{ isLoading ? 'Cargando...' : currentCuriosidad.titulo }}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{ isLoading ? 'Buscando un dato curioso para ti...' : currentCuriosidad.texto }}</p>
            <div class="curiosidad-actions">
              <ion-button fill="clear" @click="handleAddToFavorites">
                <ion-icon :icon="heartOutline" slot="start"></ion-icon>
                Favoritos
              </ion-button>
              <ion-button fill="clear" @click="shareCuriosidad(currentCuriosidad)">
                <ion-icon :icon="shareOutline" slot="start"></ion-icon>
                Compartir
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>
        <ion-button @click="getRandomCuriosidad" :disabled="isLoading">
          Próximo Dato Curioso
        </ion-button>
      </div>
    </ion-content>
    <ion-toast
      :is-open="isToastOpen"
      message="¡Agregado a favoritos!"
      :duration="1500"
      position="bottom"
      @didDismiss="isToastOpen = false"
    ></ion-toast>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonButton,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonToast,
} from '@ionic/vue';
import {
  ref,
  watchEffect
} from 'vue';
import {
  useRoute
} from 'vue-router';
import {
  heartOutline,
  shareOutline,
} from 'ionicons/icons';
import {
  addFavorite
} from '../services/firebase';

// Obtenemos la ruta actual para leer el ID de la categoría
const route = useRoute();

const currentCuriosidad = ref({
  titulo: 'Dato Curioso',
  texto: 'Presiona el botón para descubrir un dato fascinante.'
});
const pageTitle = ref('Curiosidades');
const isLoading = ref(false);
const isToastOpen = ref(false);

const fetchRandomCuriosity = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=es');
    if (!response.ok) {
      throw new Error('Error al obtener el dato curioso');
    }
    const data = await response.json();
    currentCuriosidad.value = {
      titulo: 'Nuevo Dato Curioso',
      texto: data.text,
    };
  } catch (error) {
    console.error('Fallo al obtener el dato de la API:', error);
    currentCuriosidad.value = {
      titulo: 'Error',
      texto: 'No se pudo obtener el dato. Inténtalo de nuevo más tarde.',
    };
  } finally {
    isLoading.value = false;
  }
};

const getRandomCuriosidad = () => {
  fetchRandomCuriosity();
};

const handleAddToFavorites = async () => {
  if (currentCuriosidad.value.titulo && currentCuriosidad.value.texto) {
    await addFavorite(currentCuriosidad.value);
    isToastOpen.value = true;
  }
};

// Observa cambios en la ruta para actualizar el contenido
watchEffect(() => {
  const categoryId = route.params.id as string;
  if (categoryId) {
    pageTitle.value = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
    fetchRandomCuriosity(); // Carga un dato nuevo cada vez que cambia la categoría
  }
});

// Funciones para Compartir
const shareCuriosidad = (curiosidad: {
  titulo: string;
  texto: string
}) => {
  if (navigator.share) {
    navigator.share({
      title: curiosidad.titulo,
      text: curiosidad.texto,
    }).then(() => {
      console.log('Contenido compartido con éxito.');
    }).catch((error) => console.log('Error al compartir:', error));
  } else {
    // Fallback para navegadores que no soportan la API de compartir
    console.log('La API de compartir no está disponible.');
    alert(`Puedes compartir esto: ${curiosidad.titulo} - ${curiosidad.texto}`);
  }
};
</script>

<style scoped>
ion-content {
  --background: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.curiosidad-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.curiosidad-card {
  --background: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin: 20px;
  max-width: 500px;
  width: 100%;
  transition: transform 0.3s ease;
}

.curiosidad-card:hover {
  transform: translateY(-5px);
}

ion-card-title {
  font-weight: bold;
  color: #333;
  font-size: 1.5rem;
  text-align: center;
}

ion-card-content {
  color: #555;
  font-size: 1.1rem;
  text-align: center;
}

.curiosidad-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

ion-button {
  --background: #3880ff;
  --border-radius: 25px;
  margin-top: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

ion-button:hover {
  --background: #4c8dff;
}

ion-button[fill="clear"] {
  --color: #3880ff;
  --background: transparent;
  font-size: 0.9em;
}

ion-button[fill="clear"] ion-icon {
  font-size: 1.2em;
}

ion-header {
  box-shadow: none;
}
</style>
