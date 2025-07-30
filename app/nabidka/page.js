"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from '../../lib/useProducts';

export default function Nabidka() {
  const { products, loading } = useProducts();
  const [showModal, setShowModal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');

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

  const handleAdminLogin = () => {
    if (adminPin === '2811') {
      window.location.href = '/admin';
    } else {
      alert('Špatný PIN!');
      setAdminPin('');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Načítání nabídky...</h2>
      </div>
    );
  }

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

            {/* ✅ ADMIN TLAČÍTKO */}
            <button 
              onClick={() => setShowAdminModal(true)}
              className="admin-btn"
              title="Správa webu"
            >
              🔑
            </button>
          </nav>
        </div>
      </header>

      {/* ✅ ADMIN MODAL */}
      {showAdminModal && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <h3>Příhlášení správce webu</h3>
            <input
              type="password"
              placeholder="Zadejte PIN"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
            <div className="admin-buttons">
              <button onClick={handleAdminLogin}>Přihlásit</button>
              <button onClick={() => {
                setShowAdminModal(false);
                setAdminPin('');
              }}>Zrušit</button>
            </div>
          </div>
        </div>
      )}

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