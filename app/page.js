"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleNabidkaClick = () => {
    setShowModal(true);
  };

  const handleCategorySelect = (category) => {
    setShowModal(false);
    window.location.href = `/nabidka?category=${category}`;
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h2>Mamky Dobroty</h2>
          </div>
          <nav className="navigation">
            <Link href="/" className="nav-link active">Domů</Link>
            <button onClick={handleNabidkaClick} className="nav-link">Nabídka</button>
            <Link href="/kontakt" className="nav-link">Kontakt</Link>
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
            <button 
              onClick={() => setShowModal(false)}
              className="close-btn"
              style={{marginTop: '1rem'}}
            >
              ✕ Zavřít
            </button>
          </div>
        </div>
      )}

      <main>
        <section className="hero">
          <h1>Dobroty od mamky</h1>
          <p>Domácí slané výtvory s láskou – na zakázku</p>
        </section>

        <section className="contact">
          <h2>Kontakt</h2>
          <p><strong>Telefon:</strong> +420 605 198 143</p>
          <p><strong>Email:</strong> suslice1@seznam.cz</p>
          <p><strong>Místo:</strong> Rychnov nad Kněžnou</p>
          <p><strong>Adresa:</strong> Jirsákova 1802, Rychnov nad Kněžnou</p>
        </section>
      </main>
    </>
  );
}
