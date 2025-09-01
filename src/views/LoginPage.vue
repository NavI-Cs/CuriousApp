<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="login-container">
        <h1 class="ion-text-center">Iniciar Sesión</h1>
        <ion-item class="input-field">
          <ion-input label="Correo Electrónico" label-placement="floating" type="email" v-model="email"></ion-input>
        </ion-item>
        <ion-item class="input-field">
          <ion-input label="Contraseña" label-placement="floating" type="password" v-model="password"></ion-input>
        </ion-item>
        <ion-button expand="block" class="ion-margin-top" @click="handleSignIn">
          Iniciar Sesión
        </ion-button>
        <ion-button expand="block" fill="outline" class="ion-margin-top" @click="handleSignInWithGoogle">
          <ion-icon slot="start" :icon="logoGoogle"></ion-icon>
          Iniciar con Google
        </ion-button>
        <div class="ion-text-center ion-margin-top">
          <p>¿No tienes una cuenta? <ion-router-link router-link="/register">Regístrate</ion-router-link></p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonIcon,
} from '@ionic/vue';
import {
  ref
} from 'vue';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  useRouter
} from 'vue-router';
import {
  logoGoogle
} from 'ionicons/icons';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleSignIn = async () => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('Inicio de sesión exitoso');
    router.push('/tabs/curiosidades');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Error al iniciar sesión. Por favor, revisa tus credenciales.');
  }
};

const handleSignInWithGoogle = async () => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    console.log('Inicio de sesión con Google exitoso');
    router.push('/tabs/curiosidades');
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    alert('Error al iniciar sesión con Google. Por favor, intenta de nuevo.');
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.input-field {
  --background: #f8f8f8;
  --border-radius: 8px;
  margin-bottom: 15px;
}

ion-button {
  --border-radius: 25px;
  font-weight: bold;
}

ion-router-link {
  color: #3880ff;
  font-weight: bold;
  text-decoration: none;
}
</style>
