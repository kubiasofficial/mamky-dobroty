import { collection, addDoc } from 'firebase/firestore';
import { db } from './lib/firebase.js';

async function testFirebase() {
  try {
    console.log('🔥 Testuju Firebase připojení...');
    
    // Přidáme testovací produkt
    const docRef = await addDoc(collection(db, 'products'), {
      name: "Test produkt 2",
      description: "Testovací popis 2",
      price: "60 Kč",
      priceNum: 60,
      image: "/test2.jpeg",
      category: "slane",
      createdAt: new Date()
    });
    
    console.log('✅ Firebase funguje! Dokument přidán s ID:', docRef.id);
  } catch (error) {
    console.error('❌ Chyba:', error);
  }
}

testFirebase();