"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Nabidka() {
  const [showModal, setShowModal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const products = {
    slane: [
      {
        id: 1,
        name: "Slané koláče",
        description: "S pórkem, sýrem a šunkou.",
        price: "od 380 Kč",
        priceNum: 380,
        image: "/product-savory.jpg"
      },
      {
        id: 2,
        name: "Quiche",
        description: "Francouzský slaný koláč s různými náplněmi.",
        price: "od 420 Kč",
        priceNum: 420,
        image: "/product-quiche.jpg"
      }
    ],
    sladke: [
      {
        id: 3,
        name: "Ovocný dort",
        description: "Lehký krém, piškot a čerstvé ovoce.",
        price: "od 450 Kč",
        priceNum: 450,
        image: "/product-cake.jpg"
      },
      {
        id: 4,
        name: "Plněné rohlíčky",
        description: "Na sladko – ideální na oslavy.",
        price: "7 Kč / kus",
        priceNum: 7,
        image: "/product-croissant.jpg"
      },
      {
        id: 5,
        name: "Makronky",
        description: "Křehké, barevné a plné chuti.",
        price: "15 Kč / kus",
        priceNum: 15,
        image: "/product-macarons.jpg"
      }
    ]
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowModal(false);
  };

  const resetSelection = () => {
    setShowModal(true);
    setSelectedCategory(null);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h2>Mamky Dobroty</h2>
          </div>
          <nav className="navigation">
            <Link href="/" className="nav-link">Domů</Link>
            <Link href="/nabidka" className="nav-link active">Nabídka</Link>
            <Link href="/kontakt" className="nav-link">Kontakt</Link>
            
            <button 
              onClick={() => setShowCart(true)}
              className="cart-btn"
            >
              🛒 Košík ({getTotalItems()})
            </button>
          </nav>
        </div>
      </header>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Vyberte kategorii</h2>
            <div className="category-buttons">
              <button 
                onClick={() => handleCategorySelect('slane')}
                className="category-btn slane"
              >
                🧀 Slané
              </button>
              <button 
                onClick={() => handleCategorySelect('sladke')}
                className="category-btn sladke"
              >
                🍰 Sladké
              </button>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="modal-overlay">
          <div className="cart-modal">
            <div className="cart-header">
              <h2>Váš košík</h2>
              <button 
                onClick={() => setShowCart(false)}
                className="close-btn"
              >
                ✕
              </button>
            </div>
            
            <div className="cart-content">
              {cart.length === 0 ? (
                <p>Košík je prázdný</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <p>{item.price}</p>
                      </div>
                      <div className="cart-item-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="remove-btn"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="cart-footer">
                    <p><strong>Celkem položek: {getTotalItems()}</strong></p>
                    <Link href={`/objednavka?cart=${encodeURIComponent(JSON.stringify(cart))}`}>
                      <button className="order-btn">
                        Dokončit poptávku
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <main>
        {selectedCategory && (
          <section className="menu">
            <div className="menu-header">
              <h2>{selectedCategory === 'slane' ? 'Slané dobroty' : 'Sladké dobroty'}</h2>
              <button onClick={resetSelection} className="back-btn">
                ← Změnit kategorii
              </button>
            </div>
            
            <div className="menu-grid">
              {products[selectedCategory].map(product => (
                <div key={product.id} className="menu-item">
                  <Image src={product.image} alt={product.name} width={300} height={200} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p><strong>{product.price}</strong></p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="add-to-cart-btn"
                  >
                    Přidat do košíku
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}