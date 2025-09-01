import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router';

import {
  IonicVue
} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

// Importa las funciones de Firebase
import {
  initializeApp
} from 'firebase/app';
import {
  getAuth
} from 'firebase/auth';
import {
  getFirestore
} from 'firebase/firestore';

// Aquí va la configuración de tu proyecto de Firebase
const firebaseConfig = {
  apiKey: "Tu Api Key",
  authDomain: "Tu Auth Domain",
  projectId: "Tu Project ID",
  storageBucket: "Tu Storage Bucket",
  messagingSenderId: "Tu Messaging Sender ID",
  appId: "Tu App ID"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const application = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  application.mount('#app');
});
