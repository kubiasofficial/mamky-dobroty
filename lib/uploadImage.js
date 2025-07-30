import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export async function uploadImage(file, folder = 'images') {
  try {
    // Vytvořte jedinečný název souboru
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    
    // Reference na soubor v Firebase Storage
    const storageRef = ref(storage, `${folder}/${fileName}`);
    
    // Upload souboru
    const snapshot = await uploadBytes(storageRef, file);
    
    // Získání download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log('✅ Obrázek nahrán:', downloadURL);
    return downloadURL;
    
  } catch (error) {
    console.error('❌ Chyba při nahrávání obrázku:', error);
    throw error;
  }
}