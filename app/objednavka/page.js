"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ObjednavkaContent() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    jmeno: '',
    prijmeni: '',
    telefon: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const searchParams = useSearchParams();

  useEffect(() => {
    const cartData = searchParams.get('cart');
    if (cartData) {
      try {
        const parsedCart = JSON.parse(decodeURIComponent(cartData));
        setCart(parsedCart);
      } catch (error) {
        console.error('Chyba při načítání košíku:', error);
      }
    }
  }, [searchParams]);

  const generateOrderNumber = () => {
    return '#' + Date.now().toString().slice(-6);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatOrderForDiscord = (orderNum, customer, cartItems) => {
    let message = `🛒 **NOVÁ OBJEDNÁVKA**\n\n`;
    message += `📋 **Číslo objednávky:** ${orderNum}\n`;
    message += `👤 **Zákazník:** ${customer.jmeno} ${customer.prijmeni}\n`;
    message += `📞 **Telefon:** ${customer.telefon}\n`;
    message += `📧 **Email:** ${customer.email}\n\n`;
    message += `🍰 **OBJEDNANÉ POLOŽKY:**\n`;
    
    cartItems.forEach(item => {
      message += `- ${item.name} x${item.quantity} (${item.price})\n`;
    });
    
    message += `\n📊 **Celkem položek:** ${getTotalItems()}\n`;
    message += `⏰ **Čas objednávky:** ${new Date().toLocaleString('cs-CZ')}`;
    
    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderNum = generateOrderNumber();
    setOrderNumber(orderNum);

    try {
      // Odeslání na Discord webhook
      const discordMessage = formatOrderForDiscord(orderNum, formData, cart);
      
      await fetch('https://discord.com/api/webhooks/1398951680267259914/Vlg2P6XOpgP2Y6qQbsfThonEAxBcBhxPRIN7wk-KnnG7y9MXNnrVgcV-pmjUTFFnRFF6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: discordMessage
        })
      });

      // Odeslání emailu přes API
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber: orderNum,
          customer: formData,
          cart: cart,
          totalItems: getTotalItems()
        })
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Chyba při odesílání objednávky:', error);
      alert('Chyba při odesílání objednávky. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main>
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h1>Děkujeme za vaši poptávku!</h1>
          <p><strong>Číslo objednávky: {orderNumber}</strong></p>
          <p>Vaše poptávka byla úspěšně odeslána.</p>
          <p>Mamča se vám brzy ozve na vámi uvedené kontaktní údaje.</p>
          <p>Děkujeme vám za důvěru! 🍰</p>
          
          <Link href="/">
            <button className="back-home-btn">
              Zpět na hlavní stránku
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="order-container">
        <h1>Dokončení poptávky</h1>
        
        {cart.length > 0 && (
          <div className="order-summary">
            <h2>Shrnutí objednávky</h2>
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <span>{item.name}</span>
                <span>x{item.quantity}</span>
                <span>{item.price}</span>
              </div>
            ))}
            <div className="order-total">
              <strong>Celkem položek: {getTotalItems()}</strong>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="order-form">
          <h2>Vaše kontaktní údaje</h2>
          
          <div className="form-group">
            <label htmlFor="jmeno">Jméno *</label>
            <input
              type="text"
              id="jmeno"
              name="jmeno"
              value={formData.jmeno}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="prijmeni">Příjmení *</label>
            <input
              type="text"
              id="prijmeni"
              name="prijmeni"
              value={formData.prijmeni}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefon">Telefon *</label>
            <input
              type="tel"
              id="telefon"
              name="telefon"
              value={formData.telefon}
              onChange={handleInputChange}
              placeholder="+420 123 456 789"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="vas@email.cz"
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Odesílám...' : 'Odeslat poptávku'}
          </button>
        </form>
      </div>
    </main>
  );
}

function LoadingFallback() {
  return (
    <main>
      <div className="order-container">
        <h1>Načítám...</h1>
      </div>
    </main>
  );
}

export default function Objednavka() {
  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h2>Mamky Dobroty</h2>
          </div>
          <nav className="navigation">
            <Link href="/" className="nav-link">Domů</Link>
            <Link href="/nabidka" className="nav-link">Nabídka</Link>
            <Link href="/kontakt" className="nav-link">Kontakt</Link>
          </nav>
        </div>
      </header>

      <Suspense fallback={<LoadingFallback />}>
        <ObjednavkaContent />
      </Suspense>
    </>
  );
}