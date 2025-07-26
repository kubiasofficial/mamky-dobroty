"use client"; // Toto je důležité pro použití useState a useEffect v Client Component

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Komponenta pro animace při scrollování
const AnimatedSection = ({ children, initial = { opacity: 0, y: 50 }, whileInView = { opacity: 1, y: 0 }, viewport = { once: true, amount: 0.3 }, transition = { duration: 0.8, ease: "easeOut" } }) => (
  <motion.section
    initial={initial}
    whileInView={whileInView}
    viewport={viewport}
    transition={transition}
    className="w-full flex justify-center"
  >
    {children}
  </motion.section>
);

// Animace varianty pro text a logo v hlavičce
const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
  hover: { scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

// Varianty pro karty
const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1
    }
  }
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Dummy data pro produkty (nahradíte skutečnými obrázky a popisy)
  const products = [
    { id: 1, name: 'Čokoládový dort', image: '/product-cake.jpg', description: 'Nadýchaný čokoládový dort s bohatou krémovou náplní.' },
    { id: 2, name: 'Křupavé croissanty', image: '/product-croissant.jpg', description: 'Zlatavé croissanty, křupavé zvenku, měkké uvnitř.' },
    { id: 3, name: 'Domácí sušenky', image: '/product-cookies.jpg', description: 'Voňavé sušenky s kousky čokolády a ořechů.' },
    { id: 4, name: 'Makronky', image: '/product-macarons.jpg', description: 'Barevné makronky s různými příchutěmi, ideální kávě.' },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white overflow-x-hidden">

      {/* Sekce 1: Hlavní hlavička s obrázkem na pozadí a centrálním obsahem */}
      <section
        className="relative w-full min-h-[80vh] flex flex-col items-center justify-start pt-24 pb-12 bg-cover bg-center text-white"
        style={{ backgroundImage: 'url("/pekarna-pozadi.jpg")' }} // Ujisti se, že máš tento obrázek v public/
      >
        {/* Tmavé překrytí pro lepší čitelnost textu */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Centrální blok obsahu, inspirovaný Nicepage */}
        {isClient && ( // Renderujeme pouze na klientu pro Framer Motion
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 max-w-2xl mx-auto bg-white/85 dark:bg-gray-900/85 rounded-lg shadow-2xl text-center backdrop-blur-sm"
          >
            {/* Logo Mamky Dobroty */}
            <motion.div variants={headerVariants} className="mb-6">
              <Image
                className="rounded-full shadow-lg transition-transform duration-300 hover:scale-105 mx-auto"
                src="/mamky-dobroty-logo.png"
                alt="Logo Mamky Dobroty"
                width={140}
                height={140}
                priority
              />
            </motion.div>

            {/* Hlavní nadpis */}
            <motion.h1 variants={headerVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Cukrárna <span className="text-pink-600 dark:text-pink-400">Mamky Dobroty</span>
            </motion.h1>

            {/* Popisný text */}
            <motion.p variants={headerVariants} className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Skutečným dojmem je udělat chutné, čerstvě upečené dobroty s těmi, na kterých vám záleží. Mamky Dobroty má vše a co víc, naše menu se denně bude péct nebo vařit.
            </motion.p>

            {/* Tlačítka s animací */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.a
                href="#"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-3 bg-pink-600 text-white font-semibold rounded-md shadow-md hover:bg-pink-700 transform hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                Prohlédnout Produkty
              </motion.a>
              <motion.a
                href="#"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-3 border-2 border-pink-600 text-pink-600 font-semibold rounded-md hover:bg-pink-50 hover:text-pink-700 transform hover:-translate-y-1 transition-all duration-300 dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-900 active:scale-95"
              >
                Více o nás
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Sekce 2: Blok s úvodním textem (bílé pozadí pro kontrast) */}
      <AnimatedSection>
        <div className="max-w-3xl w-full py-16 md:py-20 lg:py-24 px-4 md:px-8 bg-white dark:bg-gray-800 flex justify-center text-center shadow-inner-top rounded-lg my-8"> {/* Přidáno my-8 pro vertikální mezery */}
          <div className="w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Máme rádi tradice a moderní přístup
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              V Mamky Dobroty věříme, že nejlepší chutě pochází z poctivých surovin a generacemi prověřených receptů. Každý náš výrobek je pečen s láskou a pečlivostí, abychom vám přinesli nejen skvělý zážitek, ale i kousek domova. Jsme hrdí na naše dědictví a zároveň se nebojíme inovovat.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Sekce 3: Karty s informacemi / odkazy s animacemi */}
      <section className="w-full py-16 md:py-20 lg:py-24 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 flex justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Karta: Prvotřídní Kvalita */}
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            className="group flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700
                       transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:rotate-1"
          >
            {/* Ikona - zde nahradit SVG */}
            <div className="text-pink-600 dark:text-pink-400 mb-4 text-6xl">⭐</div>
            <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
              Prvotřídní Kvalita
            </h3>
            <p className="m-0 text-sm text-gray-600 dark:text-gray-400 text-center leading-snug">
              Používáme jen ty nejlepší, čerstvé a lokální suroviny pro naše dobroty.
            </p>
          </motion.div>

          {/* Karta: Vždy Čerstvé */}
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            className="group flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700
                       transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:rotate-1"
          >
            <div className="text-pink-600 dark:text-pink-400 mb-4 text-6xl">⏰</div>
            <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
              Vždy Čerstvé
            </h3>
            <p className="m-0 text-sm text-gray-600 dark:text-gray-400 text-center leading-snug">
              Pečeme a připravujeme denně, abychom vám zaručili maximální čerstvost.
            </p>
          </motion.div>

          {/* Karta: Pečeno s Láskou */}
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            className="group flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700
                       transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:rotate-1"
          >
            <div className="text-pink-600 dark:text-pink-400 mb-4 text-6xl">💖</div>
            <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
              Pečeno s Láskou
            </h3>
            <p className="m-0 text-sm text-gray-600 dark:text-gray-400 text-center leading-snug">
              Každý kousek je vytvořen s vášní a pečlivostí, jako pro vlastní rodinu.
            </p>
          </motion.div>

          {/* Karta: Tradiční Recepty */}
          <motion.div
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            className="group flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700
                       transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:rotate-1"
          >
            <div className="text-pink-600 dark:text-pink-400 mb-4 text-6xl">👵</div>
            <h3 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
              Tradiční Recepty
            </h3>
            <p className="m-0 text-sm text-gray-600 dark:text-gray-400 text-center leading-snug">
              Vycházíme z osvědčených receptů našich babiček s moderním nádechem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sekce 4: Galerie produktů / Karusel (Grid s efekty) */}
      <AnimatedSection>
        <div className="max-w-6xl w-full py-16 md:py-20 lg:py-24 px-4 md:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl my-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Naše neodolatelné dobroty
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={cardVariants} // Znovu použijeme cardVariants pro animaci objevování
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, ...cardVariants.onscreen.transition }} // Postupné zpoždění
                className="relative group bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden
                           transform transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400} // Upravte dle potřeby
                  height={300} // Upravte dle potřeby, zajistěte konzistentní poměr stran
                  objectFit="cover"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
                </div>
                {/* Overlay efekt při najetí - moderní prvek */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-bold">Detail & Objednat</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Sekce 5: Kontaktní formulář a mapa (widgety) */}
      <AnimatedSection>
        <div className="max-w-6xl w-full py-16 md:py-20 lg:py-24 px-4 md:px-8 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl my-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
            Kontaktujte nás
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Kontaktní formulář */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Napište nám zprávu</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Jméno</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Vaše jméno"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
                    placeholder="vas@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Zpráva</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Vaše zpráva"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-pink-600 text-white font-semibold rounded-md shadow-md hover:bg-pink-700 transform hover:-translate-y-1 transition-all duration-300 active:scale-95"
                >
                  Odeslat zprávu
                </button>
              </form>
            </div>

            {/* Sekce s kontaktními informacemi a Google Mapou */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Kde nás najdete</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 mb-8">
                <p><strong>Adresa:</strong> Pekařská 123, 110 00 Praha 1</p>
                <p><strong>Telefon:</strong> +420 123 456 789</p>
                <p><strong>Email:</strong> info@mamkydobroty.cz</p>
                <p><strong>Otevírací doba:</strong> Po-Pá: 8:00 - 18:00, So: 9:00 - 14:00</p>
              </div>
              {/* Placeholder pro Google Mapu - skutečná implementace by vyžadovala API klíč */}
              <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.8458739199276!2d14.41725351571732!3d50.0818290794276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94921966580f%3A0xc3f3b92c4a9a0e6b!2sWenceslas%20Square!5e0!3m2!1sen!2scz!4v1678912345678!5m2!1sen!2scz"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokace Mamky Dobroty"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Patička (Footer) */}
      <footer className="w-full py-8 px-4 md:px-8 lg:px-16 text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <p>&copy; {new Date().getFullYear()} Mamky Dobroty. Všechna práva vyhrazena.</p>
        <p className="mt-2 text-xs">Vytvořeno s láskou a 💖 pro Mamky Dobroty.</p>
      </footer>

    </main>
  );
}