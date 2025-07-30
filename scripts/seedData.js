import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase.js';

const initialProducts = [
  {
    name: "Obložené chlebíčky",
    description: "Tradiční chlebíčky na různé styly.",
    price: "od 35 Kč/kus",
    priceNum: 35,
    image: "/chlebicky.jpeg",
    category: "slane"
  },
  {
    name: "Obložené croissanty",
    description: "Křupavé croissanty s lahodnou náplní.",
    price: "od 55 Kč/kus",
    priceNum: 55,
    image: "/croissanty.jpeg",
    category: "slane"
  },
  {
    name: "Obložená mísa",
    description: "Pestré obložené mísy pro různé příležitosti.",
    price: "od 350 Kč",
    priceNum: 350,
    image: "/misa.jpeg",
    category: "slane"
  },
  {
    name: "Obložené bulky",
    description: "Měkké bulky s čerstvou náplní.",
    price: "od 45 Kč/kus", 
    priceNum: 45,
    image: "/bulky.jpeg",
    category: "slane"
  },
  {
    name: "Obložený talíř",
    description: "Elegantně servírovaný talíř plný dobrot.",
    price: "od 280 Kč",
    priceNum: 280,
    image: "/talir.jpeg",
    category: "slane"
  },
  {
    name: "Obložené rohlíky",
    description: "Tradiční rohlíky s kvalitní náplní.",
    price: "od 30 Kč/kus",
    priceNum: 30,
    image: "/rohliky.jpeg",
    category: "slane"
  },
  {
    name: "Slaný dort",
    description: "Speciální slaný dort pro větší akce. Ceny jsou individuální dle velikosti a náplně a surovin",
    price: "od 480 Kč",
    priceNum: 480,
    image: "/slanydort.jpeg",
    category: "slane"
  },
  {
    name: "Obložené bagety", 
    description: "Čerstvé bagety s chutnou náplní na každou příležitost.",
    price: "od 55 Kč/kus",
    priceNum: 55,
    image: "/bagety.jpeg",
    category: "slane"
  },
  {
    name: "Vajíčka trochu jinak",
    description: "Kreativní úprava vajíček podle našich receptů.",
    price: "60 Kč/kus", 
    priceNum: 60,
    image: "/vajicka.jpeg",
    category: "slane"
  },
  {
    name: "Vaječná-Tlačenka",
    description: "Domácí vaječná tlačenka podle tradiční receptury.",
    price: "od 350 Kč",
    priceNum: 350,
    image: "/vajec-tlacenka.jpeg",
    category: "slane"
  },
  {
    name: "Masový Sulc",
    description: "Tradiční masový sulc z kvalitních surovin.",
    price: "od 400 Kč",
    priceNum: 400,
    image: "/masovy-sulc.jpeg", 
    category: "slane"
  }
];

export async function seedProducts() {
  try {
    for (const product of initialProducts) {
      await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: new Date()
      });
    }
    console.log('✅ Produkty byly úspěšně přidány!');
  } catch (error) {
    console.error('❌ Chyba při přidávání produktů:', error);
  }
}