"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ObjednavkaContent() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    notes: '' // Přidáno pole pro poznámky
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validace formuláře
    if (!formData.name || !formData.surname || !formData.phone || !formData.email) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Příprava dat pro Discord webhook
      const orderData = {
        customer: {
          name: formData.name,
          surname: formData.surname,
          phone: formData.phone,
          email: formData.email,
          notes: formData.notes || 'Žádné poznámky'
        },
        items: cart,
        totalItems: getTotalItems(),
        timestamp: new Date().toLocaleString('cs-CZ')
      };

      // Formátování zprávy pro Discord
      const discordMessage = {
        embeds: [{
          title: "🍰 Nová objednávka - Dobroty od mamky",
          color: 13732126, // Oranžová barva
          fields: [
            {
              name: "👤 Zákazník",
              value: `**${orderData.customer.name} ${orderData.customer.surname}**`,
              inline: true
            },
            {
              name: "📞 Telefon",
              value: orderData.customer.phone,
              inline: true
            },
            {
              name: "📧 Email",
              value: orderData.customer.email,
              inline: true
            },
            {
              name: "🛒 Objednané položky",
              value: cart.map(item => 
                `• **${item.name}** - ${item.quantity}x (${item.price})`
              ).join('\n'),
              inline: false
            },
            {
              name: "📝 Poznámky",
              value: orderData.customer.notes,
              inline: false
            },
            {
              name: "📊 Celkem položek",
              value: `${orderData.totalItems}`,
              inline: true
            },
            {
              name: "🕐 Čas objednávky",
              value: orderData.timestamp,
              inline: true
            }
          ],
          footer: {
            text: "Dobroty od mamky - Objednávkový systém"
          }
        }]
      };

      // Odeslání na Discord webhook
      const discordResponse = await fetch('https://discord.com/api/webhooks/1321152748424675329/jHcEkQJNDJRKLrOoEV5XlHQ8HZrqOMT4eaYpRKxzCGFaDpwSP8XYNkXO-8qZ61iRRkDk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage)
      });

      if (discordResponse.ok) {
        // Vymazání košíku z localStorage
        localStorage.removeItem('mamky-cart');
        
        setSubmitStatus('success');
        
        // Reset formuláře
        setFormData({
          name: '',
          surname: '',
          phone: '',
          email: '',
          notes: ''
        });
        setCart([]);
        
        // Přesměrování po 3 sekundách
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        throw new Error('Chyba při odesílání na Discord');
      }

    } catch (error) {
      console.error('Chyba při odesílání objednávky:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
            <Link href="/nabidka" className="nav-link">Nabídka</Link>
            <Link href="/kontakt" className="nav-link">Kontakt</Link>
          </nav>
        </div>
      </header>

      <main className="order-page">
        <div className="container">
          
          {submitStatus === 'success' && (
            <div className="success-message">
              <h2>✅ Objednávka byla úspěšně odeslána!</h2>
              <p>Děkujeme za vaši objednávku. Brzy se vám ozveme.</p>
              <p>Za chvilku budete přesměrováni na hlavní stránku...</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="error-message">
              <h2>❌ Chyba při odesílání objednávky</h2>
              <p>Prosím zkontrolujte všechna povinná pole a zkuste to znovu.</p>
            </div>
          )}

          {cart.length === 0 && submitStatus !== 'success' ? (
            <div className="empty-cart">
              <h2>Košík je prázdný</h2>
              <p>Nejdříve si vyberte produkty z naší nabídky.</p>
              <Link href="/nabidka">
                <button className="cta-button">Přejít na nabídku</button>
              </Link>
            </div>
          ) : submitStatus !== 'success' && (
            <>
              {/* Shrnutí objednávky */}
              <section className="order-summary">
                <h2>Shrnutí objednávky</h2>
                <div className="order-items">
                  {cart.map(item => (
                    <div key={item.id} className="order-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                      <span className="item-price">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="total-items">
                  <strong>Celkem položek: {getTotalItems()}</strong>
                </div>
              </section>

              {/* Kontaktní formulář */}
              <section className="contact-form">
                <h2>Vaše kontaktní údaje</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Jméno *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="surname">Příjmení *</label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Telefon *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
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

                  <div className="form-group">
                    <label htmlFor="notes">Poznámky</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Zde můžete napsat poznámky k objednávce, speciální požadavky, termín dodání, atd..."
                      rows="4"
                    />
                    <small className="form-help">
                      Např.: termín dodání, speciální požadavky, alergeny, atd.
                    </small>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Odesílám...' : 'Odeslat poptávku'}
                  </button>
                </form>
              </section>
            </>
          )}
        </div>
      </main>
    </>
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
            <h2>Dobroty od mamky</h2>
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