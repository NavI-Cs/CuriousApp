import {
  getAuth
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

const db = getFirestore();
const auth = getAuth();

// Obtiene el ID del usuario actual
const getUserId = () => {
  return auth.currentUser?.uid;
};

// Referencia a la colección de favoritos del usuario actual
const getFavoritesCollectionRef = (userId: string) => {
  return collection(db, `users/${userId}/favoritos`);
};

// Añade un dato curioso a los favoritos
export const addFavorite = async (curiosidad: {
  titulo: string;
  texto: string
}) => {
  const userId = getUserId();
  if (userId) {
    try {
      await addDoc(getFavoritesCollectionRef(userId), {
        titulo: curiosidad.titulo,
        texto: curiosidad.texto,
        createdAt: new Date(),
      });
      console.log('Curiosidad guardada en favoritos');
    } catch (e) {
      console.error('Error al guardar en favoritos:', e);
    }
  }
};

// Obtiene todos los favoritos del usuario actual
export const getFavorites = async () => {
  const userId = getUserId();
  if (userId) {
    try {
      const q = query(getFavoritesCollectionRef(userId));
      const querySnapshot = await getDocs(q);
      const favorites: any[] = [];
      querySnapshot.forEach((doc) => {
        favorites.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return favorites;
    } catch (e) {
      console.error('Error al obtener favoritos:', e);
      return [];
    }
  }
  return [];
};

// Elimina un dato curioso de los favoritos
export const deleteFavorite = async (curiosidadId: string) => {
  const userId = getUserId();
  if (userId) {
    try {
      const docRef = doc(db, `users/${userId}/favoritos/${curiosidadId}`);
      await deleteDoc(docRef);
      console.log('Curiosidad eliminada de favoritos');
      return true;
    } catch (e) {
      console.error('Error al eliminar de favoritos:', e);
      return false;
    }
  }
  return false;
};