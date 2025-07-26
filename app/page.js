import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">

      {/* Sekce s hlavním nadpisem a logem - Větší a výraznější */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 flex flex-col items-center justify-center overflow-hidden">
        {/* Pozadí sekce - může být gradient nebo obrázek */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-red-100 dark:from-gray-800 dark:to-gray-900 opacity-80"></div>
        {/* Volitelně sem můžeš přidat obrázek na pozadí, např: */}
        {/* <Image
          src="/pekarna-pozadi.jpg" // Zde cesta k obrázku na pozadí, pokud nějaký máš
          alt="Pozadí pekárny"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-20" // Jemně průhledný
        /> */}

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl w-full">
          {/* Logo Mamky Dobroty s animací */}
          <div className="mb-8 fade-in-slide-up" style={{ animationDelay: '0.2s' }}>
            <Image
              className="rounded-full shadow-2xl transform transition-transform duration-300 hover:scale-105"
              src="/mamky-dobroty-logo.png"
              alt="Logo Mamky Dobroty"
              width={200}
              height={200}
              priority
            />
          </div>

          {/* Nadpis s animací */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white fade-in-slide-up" style={{ animationDelay: '0.4s' }}>
            Vítejte u <span className="text-pink-700 dark:text-pink-400">Mamky Dobroty</span>
          </h1>

          {/* Krátký úvodní text s animací */}
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl leading-relaxed fade-in-slide-up" style={{ animationDelay: '0.6s' }}>
            S láskou pro vás pečeme ty nejlepší domácí dobroty. Od křupavých sušenek po nadýchané dorty – u nás najdete něco pro každou chuť a příležitost.
          </p>
        </div>
      </section>

      {/* Sekce s navigačními "kartami" */}
      <section className="w-full py-16 px-4 md:px-8 lg:px-16 flex justify-center bg-white dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
          {/* Odkaz: O nás */}
          <a
            href="#"
            className="group flex flex-col items-center p-8 border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover-effect bg-white dark:bg-gray-700"
            rel="noopener noreferrer"
          >
            {/* Volitelná ikonka (můžeš si stáhnout a umístit do public složky) */}
            {/* <Image src="/icon-about.svg" alt="O nás ikona" width={50} height={50} className="mb-4 text-pink-500" /> */}
            <h2 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-white">
              O nás{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &rarr;
              </span>
            </h2>
            <p className="m-0 text-sm text-gray-600 dark:text-gray-400 text-center leading-snug">
              Přečtěte si, kdo jsme a jak pro vás pečeme s vášní.
            </p>
          </a>

          {/* Odkaz: Produkty */}
          <a
            href="#"
            className="group flex flex-col items-center p-8 border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover-effect bg-white dark:bg-gray-700"
            rel="noopener noreferrer"
          >
            {/* <Image src="/icon-products.svg" alt="Produkty ikona" width={50} height={50} className="mb-4 text-pink-500" /> */}
            <h2 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-white">
              Produkty{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &rarr;
              </span>
            </h2>
            <p className="m-0 text-sm text-gray-600 dark:text-gray-400 text-center leading-snug">
              Prohlédněte si naši lahodnou nabídku čerstvých dobrot.
            </p>
          </a>

          {/* Odkaz: Objednávka */}
          <a
            href="#"
            className="group flex flex-col items-center p-8 border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover-effect bg-white dark:bg-gray-700"
            rel="noopener noreferrer"
          >
            {/* <Image src="/icon-order.svg" alt="Objednávka ikona" width={50} height={50} className="mb-4 text-pink-500" /> */}
            <h2 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-white">
              Objednávka{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &rarr;
              </span>
            </h2>
            <p className="m-0 text-sm text-gray-600 dark:text-gray-400 text-center leading-snug">
              Vytvořte si objednávku snadno a rychle online.
            </p>
          </a>

          {/* Odkaz: Kontakt */}
          <a
            href="#"
            className="group flex flex-col items-center p-8 border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover-effect bg-white dark:bg-gray-700"
            rel="noopener noreferrer"
          >
            {/* <Image src="/icon-contact.svg" alt="Kontakt ikona" width={50} height={50} className="mb-4 text-pink-500" /> */}
            <h2 className="mb-3 text-2xl font-semibold text-gray-800 dark:text-white">
              Kontakt{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &rarr;
              </span>
            </h2>
            <p className="m-0 text-sm text-gray-600 dark:text-gray-400 text-center leading-snug">
              Napište nám, rádi vám odpovíme na jakékoli dotazy.
            </p>
          </a>
        </div>
      </section>

      {/* Patička (Footer) */}
      <footer className="w-full py-8 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <p>&copy; {new Date().getFullYear()} Mamky Dobroty. Všechna práva vyhrazena.</p>
        {/* Zde můžete přidat další informace, např. odkaz na soukromí */}
        {/* <p className="mt-2"><a href="#">Zásady ochrany osobních údajů</a></p> */}
      </footer>

    </main>
  );
}