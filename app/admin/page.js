"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from '../../lib/useProducts';
import { uploadImage } from '../../lib/uploadImage';

export default function Admin() {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleUpdateProduct = async (id, updatedData) => {
    const result = await updateProduct(id, updatedData);
    if (result.success) {
      setEditingProduct(null);
      alert('Produkt byl úspěšně aktualizován!');
    } else {
      alert('Chyba při aktualizaci: ' + result.error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (confirm('Opravdu smazat tento produkt?')) {
      const result = await deleteProduct(id);
      if (result.success) {
        alert('Produkt byl úspěšně smazán!');
      } else {
        alert('Chyba při mazání: ' + result.error);
      }
    }
  };

  const handleAddProduct = async (newProduct) => {
    const result = await addProduct(newProduct);
    if (result.success) {
      setShowAddForm(false);
      alert('Produkt byl úspěšně přidán!');
    } else {
      alert('Chyba při přidávání: ' + result.error);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Načítání...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>🔑 Správa webu - Dobroty od mamky</h1>
        <Link href="/">
          <button className="back-btn">← Zpět na web</button>
        </Link>
      </header>

      <main className="admin-main">
        <div className="admin-actions">
          <button 
            onClick={() => setShowAddForm(true)}
            className="add-product-btn"
          >
            ➕ Přidat nový produkt
          </button>
          <p>📊 Celkem produktů: {products.slane.length + products.sladke.length}</p>
        </div>

        <div className="products-grid">
          {[...products.slane, ...products.sladke].map(product => (
            <div key={product.id} className="admin-product-card">
              <div className="product-image">
                <Image 
                  src={product.image || '/placeholder.jpeg'} 
                  alt={product.name}
                  width={200}
                  height={150}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>{product.price}</strong></p>
                <small>Kategorie: {product.category}</small>
              </div>

              <div className="product-actions">
                <button 
                  onClick={() => setEditingProduct(product)}
                  className="edit-btn"
                >
                  ✏️ Upravit
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  className="delete-btn"
                >
                  🗑️ Smazat
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EDIT MODAL */}
        {editingProduct && (
          <div className="modal-overlay">
            <div className="edit-modal">
              <h3>Upravit produkt</h3>
              <EditProductForm 
                product={editingProduct}
                onSave={handleUpdateProduct}
                onCancel={() => setEditingProduct(null)}
              />
            </div>
          </div>
        )}

        {/* ADD MODAL */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="add-modal">
              <h3>Přidat nový produkt</h3>
              <AddProductForm 
                onSave={handleAddProduct}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Komponenta pro editaci s upload obrázku
function EditProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    priceNum: product.priceNum,
    image: product.image,
    category: product.category || 'slane'
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(product.image);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Kontrola typu souboru
    if (!file.type.startsWith('image/')) {
      alert('Prosím vyberte obrázek!');
      return;
    }

    // Kontrola velikosti (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Obrázek je příliš velký! Maximální velikost je 5MB.');
      return;
    }

    try {
      setUploading(true);
      
      // Preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);

      // Upload do Firebase Storage
      const imageUrl = await uploadImage(file, 'products');
      setFormData({ ...formData, image: imageUrl });
      
    } catch (error) {
      console.error('Chyba při nahrávání:', error);
      alert('Chyba při nahrávání obrázku!');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product.id, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        placeholder="Název produktu"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      
      <textarea
        placeholder="Popis produktu"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        required
      />
      
      <input
        type="text"
        placeholder="Cena (např. od 35 Kč/kus)"
        value={formData.price}
        onChange={(e) => setFormData({...formData, price: e.target.value})}
        required
      />
      
      <input
        type="number"
        placeholder="Číselná cena"
        value={formData.priceNum}
        onChange={(e) => setFormData({...formData, priceNum: parseInt(e.target.value)})}
        required
      />

      {/* ✅ UPLOAD OBRÁZKU */}
      <div className="image-upload-section">
        <label>Obrázek produktu:</label>
        
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
        />
        
        {uploading && <p>📤 Nahrávání obrázku...</p>}
      </div>

      <select
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
        required
      >
        <option value="slane">Slané</option>
        <option value="sladke">Sladké</option>
      </select>

      <div className="form-buttons">
        <button type="submit" disabled={uploading}>
          {uploading ? '📤 Ukládání...' : '💾 Uložit'}
        </button>
        <button type="button" onClick={onCancel}>❌ Zrušit</button>
      </div>
    </form>
  );
}

// Komponenta pro přidání s upload obrázku
function AddProductForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    priceNum: 0,
    image: '',
    category: 'slane'
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Prosím vyberte obrázek!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Obrázek je příliš velký! Maximální velikost je 5MB.');
      return;
    }

    try {
      setUploading(true);
      
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);

      const imageUrl = await uploadImage(file, 'products');
      setFormData({ ...formData, image: imageUrl });
      
    } catch (error) {
      console.error('Chyba při nahrávání:', error);
      alert('Chyba při nahrávání obrázku!');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Prosím nahrajte obrázek!');
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        placeholder="Název produktu"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      
      <textarea
        placeholder="Popis produktu"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        required
      />
      
      <input
        type="text"
        placeholder="Cena (např. od 35 Kč/kus)"
        value={formData.price}
        onChange={(e) => setFormData({...formData, price: e.target.value})}
        required
      />
      
      <input
        type="number"
        placeholder="Číselná cena"
        value={formData.priceNum}
        onChange={(e) => setFormData({...formData, priceNum: parseInt(e.target.value)})}
        required
      />

      {/* ✅ UPLOAD OBRÁZKU */}
      <div className="image-upload-section">
        <label>Obrázek produktu: *</label>
        
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          required
        />
        
        {uploading && <p>📤 Nahrávání obrázku...</p>}
      </div>

      <select
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value})}
        required
      >
        <option value="slane">Slané</option>
        <option value="sladke">Sladké</option>
      </select>

      <div className="form-buttons">
        <button type="submit" disabled={uploading || !formData.image}>
          {uploading ? '📤 Nahrávání...' : '➕ Přidat'}
        </button>
        <button type="button" onClick={onCancel}>❌ Zrušit</button>
      </div>
    </form>
  );
}