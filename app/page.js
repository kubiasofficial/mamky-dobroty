"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');

  // Produkty pro prezentaci (mix slaných a sladkých)
  const featuredProducts = [
    {
      id: 1,
      name: "Chlebíčky sešité",
      description: "Tradiční chlebíčky s různými náplněmi",
      price: "od 35 Kč/kus",
      image: "/chlebicky.jpeg", // ✅ OPRAVENO
      category: "slane"
    },
    {
      id: 2,
      name: "Obložená mísa",
      description: "Pestré obložené mísy pro různé příležitosti",
      price: "od 350 Kč",
      image: "/misa.jpeg", // ✅ OPRAVENO
      category: "slane"
    },
    {
      id: 3,
      name: "Obložené croissanty",
      description: "Křupavé croissanty s lahodnou náplní",
      price: "od 55 Kč/kus",
      image: "/croissanty.jpeg", // ✅ OPRAVENO
      category: "slane"
    },
    {
      id: 4,
      name: "Slaný dort",
      description: "Speciální slaný dort pro větší akce",
      price: "od 480 Kč",
      image: "/slanydort.jpeg", // ✅ OPRAVENO
      category: "slane"
    },
    {
      id: 8,
      name: "Obložené bagety",
      description: "Čerstvé bagety s chutnou náplní",
      price: "od 55 Kč/kus",
      image: "/bagety.jpeg", // ✅ OPRAVENO
      category: "slane"
    },
    {
      id: 9,
      name: "Vajíčka trochu jinak",
      description: "Kreativní úprava vajíček podle našich receptů",
      price: "60 Kč/kus",
      image: "/vajicka.jpeg", // ✅ OPRAVENO
      category: "slane"
    },
    {
      id: 10,
      name: "Vaječná-Tlačenka",
      description: "Domácí vaječná tlačenka podle tradiční receptury",
      price: "od 350 Kč",
      image: "/vajec-tlacenka.jpeg",  // ✅ OPRAVENO
      category: "slane"
    },
    {
      id: 11,
      name: "Masový Sulc",
      description: "Tradiční masový sulc z kvalitních surovin",
      price: "od 400 Kč",
      image: "/masovy-sulc.jpeg",     // ✅ OPRAVENO
      category: "slane"
    }
  ];

  // Automatické přepínání produktů každé 4 sekundy
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => 
        (prevIndex + 1) % featuredProducts.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const currentProduct = featuredProducts[currentProductIndex];

  const handleAdminLogin = () => {
    if (adminPin === '2811') {
      window.location.href = '/admin';
    } else {
      alert('Špatný PIN!');
      setAdminPin('');
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
            <Link href="/" className="nav-link active">Domů</Link>
            <Link href="/nabidka" className="nav-link">Nabídka</Link>
            <Link href="/kontakt" className="nav-link">Kontakt</Link>
            
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

      <main>
        <section className="hero">
          <h1>Dobroty od mamky</h1>
          <p>Domácí slané výtvory s láskou – na zakázku</p>
        </section>

        {/* Animovaná prezentace produktů */}
        <section className="product-showcase">
          <h2>Naše speciality</h2>
          
          <div className="showcase-container">
            <div className="product-slider">
              <div 
                className="product-slide"
                key={currentProduct.id}
              >
                <div className="product-image-container">
                  <Image 
                    src={currentProduct.image} 
                    alt={currentProduct.name}
                    width={400}
                    height={300}
                    className="showcase-image"
                  />
                  <div className="category-badge">
                    {currentProduct.category === 'slane' ? '🧀 Slané' : '🍰 Sladké'}
                  </div>
                </div>
                
                <div className="product-info">
                  <h3>{currentProduct.name}</h3>
                  <p>{currentProduct.description}</p>
                  <div className="price">{currentProduct.price}</div>
                  
                  <Link href="/nabidka">
                    <button className="cta-button">
                      Zobrazit všechny produkty
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Indikátory */}
            <div className="slider-indicators">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentProductIndex ? 'active' : ''}`}
                  onClick={() => setCurrentProductIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
