"use client";

import { useState, useEffect } from 'react';
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
        name: "Chlebíčky sešité",
        description: "Tradiční chlebíčky s různými náplněmi.",
        price: "od 35 Kč/kus",
        priceNum: 35,
        image: "/chlebickysesitym.jpg"
      },
      {
        id: 2,
        name: "Obložené croissanty",
        description: "Křupavé croissanty s lahodnou náplní.",
        price: "od 45 Kč/kus",
        priceNum: 45,
        image: "/Oblozecroissanty-1.jpg"
      },
      {
        id: 3,
        name: "Obložená mísa",
        description: "Pestré obložené mísy pro různé příležitosti.",
        price: "od 350 Kč",
        priceNum: 350,
        image: "/Oblozenamisa-1.jpg"
      },
      {
        id: 4,
        name: "Obložené bulky",
        description: "Čerstvé bulky s chutnou náplní.",
        price: "od 40 Kč/kus",
        priceNum: 40,
        image: "/Oblozebulky-1.jpg"
      },
      {
        id: 5,
        name: "Obložený talíř s lamenem",
        description: "Elegantní obložené talíře pro speciální příležitosti.",
        price: "od 280 Kč",
        priceNum: 280,
        image: "/oblozenytalirsselamem.jpg"
      },
      {
        id: 6,
        name: "Pekárna pozadí",
        description: "Čerstvé pečivo a speciality z naší pekárny.",
        price: "od 25 Kč/kus",
        priceNum: 25,
        image: "/pekarna-pozadi.jpg"
      },
      {
        id: 7,
        name: "Plněné rohlíky",
        description: "Měkké rohlíky s různými slanými náplněmi.",
        price: "od 30 Kč/kus",
        priceNum: 30,
        image: "/plnenerolky.jpg"
      }
    ],
    sladke: [
      // Prozatím prázdné - můžeme přidat později
    ]
  };

  // Načtení košíku z localStorage při načtení komponenty
  useEffect(() => {
    const savedCart = localStorage.getItem('mamky-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Chyba při načítání košíku:', error);
      }
    }
  }, []);

  // Uložení košíku do localStorage při každé změně
  useEffect(() => {
    localStorage.setItem('mamky-cart', JSON.stringify(cart));
  }, [cart]);

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

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('mamky-cart');
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h2>Dobroty od mamky</h2>
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
                    
                    <div className="cart-actions">
                      <button 
                        onClick={clearCart}
                        className="clear-cart-btn"
                      >
                        Vymazat košík
                      </button>
                      
                      <Link href={`/objednavka?cart=${encodeURIComponent(JSON.stringify(cart))}`}>
                        <button className="order-btn">
                          Dokončit poptávku
                        </button>
                      </Link>
                    </div>
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
            
            {selectedCategory === 'sladke' && products.sladke.length === 0 ? (
              <div className="empty-category">
                <p>Sladké dobroty budou brzy k dispozici! 🍰</p>
              </div>
            ) : (
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
            )}
          </section>
        )}
      </main>
    </>
  );
}