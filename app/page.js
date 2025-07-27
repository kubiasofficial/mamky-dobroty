"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
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
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>Dobroty od mamky</h1>
          <p>Domácí slané výtvory s láskou – na zakázku</p>
        </section>
      </main>
    </>
  );
}
