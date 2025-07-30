import { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  onSnapshot 
} from 'firebase/firestore';
import { db } from './firebase';

export function useProducts() {
  const [products, setProducts] = useState({ slane: [], sladke: [] });
  const [loading, setLoading] = useState(true);

  // Načtení produktů z Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = { slane: [], sladke: [] };
      
      snapshot.forEach((doc) => {
        const product = { id: doc.id, ...doc.data() };
        if (product.category === 'slane') {
          productsData.slane.push(product);
        } else if (product.category === 'sladke') {
          productsData.sladke.push(product);
        }
      });
      
      // Seřadit podle ID
      productsData.slane.sort((a, b) => a.id - b.id);
      productsData.sladke.sort((a, b) => a.id - b.id);
      
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Přidání produktu
  const addProduct = async (productData) => {
    try {
      await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Chyba při přidávání produktu:', error);
      return { success: false, error: error.message };
    }
  };

  // Aktualizace produktu
  const updateProduct = async (id, updatedData) => {
    try {
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, {
        ...updatedData,
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      console.error('Chyba při aktualizaci produktu:', error);
      return { success: false, error: error.message };
    }
  };

  // Smazání produktu
  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      return { success: true };
    } catch (error) {
      console.error('Chyba při mazání produktu:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct
  };
}