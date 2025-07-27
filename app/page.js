"use client";

import { useState } from 'react';
import Image from 'next/image';
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

        <section className="menu">
          <h2>Nabídka</h2>
          <div className="menu-grid">
            <div className="menu-item">
              <Image src="/product-cake.jpg" alt="Ovocný dort" width={300} height={200} />
              <h3>Ovocný dort</h3>
              <p>Lehký krém, piškot a čerstvé ovoce.</p>
              <p>od 450 Kč</p>
            </div>
            <div className="menu-item">
              <Image src="/product-croissant.jpg" alt="Plněné rohlíčky" width={300} height={200} />
              <h3>Plněné rohlíčky</h3>
              <p>Na sladko i na slano – ideální na oslavy.</p>
              <p>7 Kč / kus</p>
            </div>
            <div className="menu-item">
              <Image src="/product-macarons.jpg" alt="Makronky" width={300} height={200} />
              <h3>Makronky</h3>
              <p>Křehké, barevné a plné chuti.</p>
              <p>15 Kč / kus</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
