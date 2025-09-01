import { auth } from './firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import { Capacitor } from '@capacitor/core';

const provider = new GoogleAuthProvider();

// Detecta si la app está corriendo en móvil nativo
const isNative = Capacitor.isNativePlatform();

export const loginWithGoogle = async () => {
  try {
    if (isNative) {
      // Móvil nativo → redirect
      await signInWithRedirect(auth, provider);
      // El resultado se obtiene cuando la app regresa del navegador
      const result = await getRedirectResult(auth);
      return result?.user || null;
    } else {
      // Web → popup
      const result = await signInWithPopup(auth, provider);
      return result.user;
    }
  } catch (error) {
    console.error('Error during Google login:', error);
    return null;
  }
};

export const onAuthStateChangedListener = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, callback);
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
