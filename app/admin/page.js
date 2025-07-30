"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Admin() {
  const [products, setProducts] = useState({
    slane: [
      {
        id: 1,
        name: "Obložené chlebíčky",
        description: "Tradiční chlebíčky na různé styly.",
        price: "od 35 Kč/kus",
        priceNum: 35,
        image: "/chlebicky.jpeg"
      },
      // ...všechny produkty zkopírujte z nabidka/page.js
    ],
    sladke: []
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const updateProduct = (id, updatedData) => {
    setProducts(prev => ({
      ...prev,
      slane: prev.slane.map(product => 
        product.id === id ? { ...product, ...updatedData } : product
      )
    }));
  };

  const deleteProduct = (id) => {
    if (confirm('Opravdu smazat tento produkt?')) {
      setProducts(prev => ({
        ...prev,
        slane: prev.slane.filter(product => product.id !== id)
      }));
    }
  };

  const addProduct = (newProduct) => {
    const newId = Math.max(...products.slane.map(p => p.id)) + 1;
    setProducts(prev => ({
      ...prev,
      slane: [...prev.slane, { ...newProduct, id: newId }]
    }));
    setShowAddForm(false);
  };

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
        </div>

        <div className="products-grid">
          {products.slane.map(product => (
            <div key={product.id} className="admin-product-card">
              <div className="product-image">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  width={200}
                  height={150}
                />
              </div>
              
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>{product.price}</strong></p>
              </div>

              <div className="product-actions">
                <button 
                  onClick={() => setEditingProduct(product)}
                  className="edit-btn"
                >
                  ✏️ Upravit
                </button>
                <button 
                  onClick={() => deleteProduct(product.id)}
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
                onSave={updateProduct}
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
                onSave={addProduct}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Komponenta pro editaci
function EditProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    priceNum: product.priceNum,
    image: product.image
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product.id, formData);
    onCancel();
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
      
      <input
        type="text"
        placeholder="Cesta k obrázku (např. /produkt.jpeg)"
        value={formData.image}
        onChange={(e) => setFormData({...formData, image: e.target.value})}
        required
      />

      <div className="form-buttons">
        <button type="submit">💾 Uložit</button>
        <button type="button" onClick={onCancel}>❌ Zrušit</button>
      </div>
    </form>
  );
}

// Komponenta pro přidání
function AddProductForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    priceNum: 0,
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
      
      <input
        type="text"
        placeholder="Cesta k obrázku (např. /produkt.jpeg)"
        value={formData.image}
        onChange={(e) => setFormData({...formData, image: e.target.value})}
        required
      />

      <div className="form-buttons">
        <button type="submit">➕ Přidat</button>
        <button type="button" onClick={onCancel}>❌ Zrušit</button>
      </div>
    </form>
  );
}