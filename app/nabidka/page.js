"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Nabidka() {
  const [showModal, setShowModal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const products = {
    slane: [
      {
        id: 1,
        name: "Slané koláče",
        description: "S pórkem, sýrem a šunkou.",
        price: "od 380 Kč",
        image: "/product-savory.jpg"
      },
      {
        id: 2,
        name: "Quiche",
        description: "Francouzský slaný koláč s různými náplněmi.",
        price: "od 420 Kč",
        image: "/product-quiche.jpg"
      }
    ],
    sladke: [
      {
        id: 3,
        name: "Ovocný dort",
        description: "Lehký krém, piškot a čerstvé ovoce.",
        price: "od 450 Kč",
        image: "/product-cake.jpg"
      },
      {
        id: 4,
        name: "Plněné rohlíčky",
        description: "Na sladko – ideální na oslavy.",
        price: "7 Kč / kus",
        image: "/product-croissant.jpg"
      },
      {
        id: 5,
        name: "Makronky",
        description: "Křehké, barevné a plné chuti.",
        price: "15 Kč / kus",
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
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}