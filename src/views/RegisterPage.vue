<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="register-container">
        <h1 class="ion-text-center">Crear Cuenta</h1>
        <ion-item class="input-field">
          <ion-input label="Correo Electrónico" label-placement="floating" type="email" v-model="email"></ion-input>
        </ion-item>
        <ion-item class="input-field">
          <ion-input label="Contraseña" label-placement="floating" type="password" v-model="password"></ion-input>
        </ion-item>
        <ion-button expand="block" class="ion-margin-top" @click="handleRegister">
          Registrarse
        </ion-button>
        <div class="ion-text-center ion-margin-top">
          <p>¿Ya tienes una cuenta? <ion-router-link router-link="/login">Inicia Sesión</ion-router-link></p>
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
} from '@ionic/vue';
import {
  ref
} from 'vue';
import {
  getAuth,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  useRouter
} from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleRegister = async () => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    console.log('Registro exitoso');
    router.push('/tabs/curiosidades');
  } catch (error) {
    console.error('Error al registrarse:', error);
    alert('Error al registrarse. Por favor, intenta de nuevo.');
  }
};
</script>

<style scoped>
.register-container {
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
