import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',       // Mantén tu ID único o cámbialo si personalizaste en Firebase
  appName: 'curious-facts',        // Nombre de la app
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true,       // Evita problemas con Google Sign-In
  },
  ios: {
    contentInset: 'automatic',
    allowMixedContent: true,
  },
  server: {
    androidScheme: 'https',        // Necesario para que Android maneje correctamente los redirects
    cleartext: true,               // Permite tráfico http si lo necesitas (opcional)
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,       // Usamos el flujo nativo
      providers: ["google.com"],   // Declaramos Google como proveedor
    }
  },
  urlScheme: 'io.ionic.starter',   // Debe coincidir con la configuración de Firebase OAuth
};

export default config;
