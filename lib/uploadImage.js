import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(file, folder = 'products') {
  return new Promise((resolve, reject) => {
    // Kontrola velikosti souboru (max 2MB pro base64)
    if (file.size > 2 * 1024 * 1024) {
      reject(new Error('Obrázek je příliš velký! Maximální velikost je 2MB.'));
      return;
    }

    // Kontrola typu souboru
    if (!file.type.startsWith('image/')) {
      reject(new Error('Prosím vyberte obrázek!'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
      const base64Url = e.target.result;
      console.log('✅ Obrázek převeden na base64');
      resolve(base64Url);
    };
    
    reader.onerror = function(error) {
      console.error('❌ Chyba při čtení souboru:', error);
      reject(new Error('Chyba při čtení souboru'));
    };
    
    // Převést na base64
    reader.readAsDataURL(file);
  });
}