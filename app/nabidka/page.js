"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from '../../lib/useProducts';

export default function Nabidka() {
  const { products, loading } = useProducts();
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Načíst košík z localStorage při načtení stránky
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Uložit košík do localStorage při každé změně
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ✅ OPRAVENÁ FUNKCE - používá Firebase ID
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { 
          id: product.id,
          name: product.name,
          price: product.price,
          priceNum: product.priceNum,
          image: product.image,
          quantity: 1 
        }];
      }
    });
  };

  // ✅ OPRAVENÁ FUNKCE - používá Firebase ID
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // ✅ OPRAVENÁ FUNKCE - používá Firebase ID
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.priceNum * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrderSubmit = async (orderData) => {
    // Generujeme číslo objednávky
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    
    const cartItems = cart.map(item => 
      `${item.name} - ${item.quantity}x (${item.price})`
    ).join('\n');

    const orderMessage = `
🛒 NOVÁ OBJEDNÁVKA: ${orderNumber}

👤 ZÁKAZNÍK:
${orderData.name}
📞 ${orderData.phone}
📧 ${orderData.email || 'Nezadán'}

📦 PRODUKTY:
${cartItems}

💰 CELKOVÁ CENA: ${getTotalPrice()} Kč

📝 POZNÁMKA:
${orderData.note || 'Žádná poznámka'}

⏰ Objednáno: ${new Date().toLocaleString('cs-CZ')}
    `;

    try {
      // 1. 📱 ODESLAT NA WHATSAPP
      const whatsappUrl = `https://wa.me/420605198143?text=${encodeURIComponent(orderMessage)}`;
      window.open(whatsappUrl, '_blank');

      // 2. 🎮 ODESLAT NA DISCORD WEBHOOK (na pozadí)
      sendToDiscord(orderMessage, cart, orderData, orderNumber);

      // 3. 📧 ODESLAT EMAIL (na pozadí)
      sendEmail(orderMessage, orderData, orderNumber);

      // 4. Vyčistit košík a zobrazit jen číslo objednávky
      setCart([]);
      setShowOrderForm(false);
      setShowCart(false);
      
      alert(`✅ Objednávka byla odeslána!\n\nČíslo objednávky: ${orderNumber}\n\nBudete kontaktováni na uvedený telefon nebo email.`);

    } catch (error) {
      console.error('Chyba při odesílání:', error);
      alert(`✅ Objednávka byla odeslána!\n\nČíslo objednávky: ${orderNumber}`);
    }
  };

  // 🎮 DISCORD WEBHOOK FUNKCE - OPRAVENÁ URL
  const sendToDiscord = async (message, cart, orderData, orderNumber) => {
    try {
      const discordWebhookUrl = "https://discord.com/api/webhooks/1398951680267259914/Vlg2P6XOpgP2Y6qQbsfThonEAxBcBhxPRIN7wk-KnnG7y9MXNnrVgcV-pmjUTFFnRFF6";
      
      const embed = {
        title: `🛒 Nová objednávka - ${orderNumber}`,
        color: 0x28a745, // Zelená barva
        fields: [
          {
            name: "👤 Zákazník",
            value: `**${orderData.name}**\n📞 ${orderData.phone}\n📧 ${orderData.email || 'Nezadán'}`,
            inline: false
          },
          {
            name: "📦 Produkty",
            value: cart.map(item => `• ${item.name} - ${item.quantity}x (${item.priceNum * item.quantity} Kč)`).join('\n'),
            inline: false
          },
          {
            name: "💰 Celková cena",
            value: `**${getTotalPrice()} Kč**`,
            inline: true
          },
          {
            name: "⏰ Čas objednávky",
            value: new Date().toLocaleString('cs-CZ'),
            inline: true
          }
        ],
        footer: {
          text: "Dobroty od mamky • Automatická objednávka"
        },
        timestamp: new Date().toISOString()
      };

      if (orderData.note) {
        embed.fields.push({
          name: "📝 Poznámka",
          value: orderData.note,
          inline: false
        });
      }

      const response = await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [embed],
          username: "Objednávky Bot",
          avatar_url: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png"
        })
      });

      if (response.ok) {
        console.log('✅ Discord webhook úspěšný');
      } else {
        console.error('❌ Discord webhook chyba:', response.status);
      }
    } catch (error) {
      console.error('❌ Discord webhook error:', error);
    }
  };

  // 📧 EMAIL FUNKCE (pro budoucí implementaci)
  const sendEmail = async (message, orderData, orderNumber) => {
    try {
      // Pro EmailJS implementaci později
      console.log('📧 Email by byl odeslán na: suslice1@seznam.cz');
      console.log('Objednávka:', orderNumber);
      console.log('Obsah:', message);
      
      // TODO: Implementovat EmailJS
      // const emailData = {
      //   to_email: 'suslice1@seznam.cz',
      //   from_name: orderData.name,
      //   phone: orderData.phone,
      //   order_number: orderNumber,
      //   message: message
      // };
      
    } catch (error) {
      console.error('❌ Email error:', error);
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
            
            {/* ✅ KOŠÍK TLAČÍTKO */}
            <button 
              className="cart-btn" 
              onClick={() => setShowCart(true)}
            >
              🛒 Košík ({getTotalItems()})
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section className="products-section">
          <h2>Naše nabídka</h2>
          
          {/* SLANÉ PRODUKTY */}
          <div className="category-section">
            <h3>🧄 Slané dobroty</h3>
            <div className="products-grid">
              {products.slane.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <Image 
                      src={product.image || '/placeholder.jpeg'} 
                      alt={product.name}
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="product-content">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <div className="product-footer">
                      <span className="price">{product.price}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="add-to-cart-btn"
                      >
                        Přidat do košíku
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SLADKÉ PRODUKTY */}
          <div className="category-section">
            <h3>🍰 Sladké dobroty</h3>
            <div className="products-grid">
              {products.sladke.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <Image 
                      src={product.image || '/placeholder.jpeg'} 
                      alt={product.name}
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="product-content">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <div className="product-footer">
                      <span className="price">{product.price}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="add-to-cart-btn"
                      >
                        Přidat do košíku
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KOŠÍK MODAL */}
        {showCart && (
          <div className="modal-overlay">
            <div className="cart-modal">
              <div className="cart-header">
                <h3>🛒 Váš košík</h3>
                <button onClick={() => setShowCart(false)}>✕</button>
              </div>
              
              <div className="cart-content">
                {cart.length === 0 ? (
                  <p>Košík je prázdný</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-image">
                          <Image 
                            src={item.image || '/placeholder.jpeg'} 
                            alt={item.name}
                            width={80}
                            height={60}
                            style={{ objectFit: 'cover', borderRadius: '8px' }}
                          />
                        </div>
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <p>{item.price}</p>
                        </div>
                        <div className="cart-item-quantity">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <div className="cart-item-total">
                          {item.priceNum * item.quantity} Kč
                        </div>
                        <button 
                          className="remove-item"
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                    
                    <div className="cart-total">
                      <strong>Celkem: {getTotalPrice()} Kč</strong>
                    </div>
                    
                    <div className="cart-actions">
                      <button 
                        className="order-btn"
                        onClick={() => {
                          setShowCart(false);
                          setShowOrderForm(true);
                        }}
                      >
                        Objednat
                      </button>
                      <button 
                        className="clear-cart-btn"
                        onClick={() => setCart([])}
                      >
                        Vyčistit košík
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* OBJEDNÁVKOVÝ FORMULÁŘ */}
        {showOrderForm && (
          <div className="modal-overlay">
            <div className="order-modal">
              <OrderForm 
                cart={cart}
                onSubmit={handleOrderSubmit}
                onCancel={() => setShowOrderForm(false)}
                totalPrice={getTotalPrice()}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

// Komponenta objednávkového formuláře zůstává stejná
function OrderForm({ cart, onSubmit, onCancel, totalPrice }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    note: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h3>Dokončit objednávku</h3>
      
      <div className="order-summary">
        <h4>Souhrn objednávky:</h4>
        {cart.map(item => (
          <div key={item.id} className="order-item">
            <span>{item.name} - {item.quantity}x</span>
            <span>{item.priceNum * item.quantity} Kč</span>
          </div>
        ))}
        <div className="order-total">
          <strong>Celkem: {totalPrice} Kč</strong>
        </div>
      </div>

      <div className="form-group">
        <input
          type="text"
          placeholder="Jméno a příjmení *"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="tel"
          placeholder="Telefon *"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Poznámka k objednávce"
          value={formData.note}
          onChange={(e) => setFormData({...formData, note: e.target.value})}
        />
      </div>

      <div className="form-buttons">
        <button type="submit">Odeslat objednávku</button>
        <button type="button" onClick={onCancel}>Zrušit</button>
      </div>
    </form>
  );
}