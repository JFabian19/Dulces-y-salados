import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import menuData from './data/menu.json';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import Sidebar from './components/Sidebar';
import Features from './components/Features';
import BottomNav from './components/BottomNav';
import CartButton from './components/CartButton';
import CartDrawer from './components/CartDrawer';

function AppContent() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const sectionRefs = useRef([]);

  /* Category names for the nav */
  const categories = useMemo(
    () => menuData.menu.map((c) => c.categoria),
    []
  );

  /* Scroll a category into view */
  const handleCategoryClick = useCallback((index) => {
    const el = sectionRefs.current[index];
    if (el) {
      const yOffset = -180;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  /* Scroll to top whenever category changes (view transition) */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeCategory]);

  return (

    <>

      <Header
        onCategoryClick={handleCategoryClick}
      />

      <main className="pt-48 pb-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        {activeCategory === null ? (
          /* HOME VIEW */
          <div className="animate-fade-in-up">
            <Hero />

            {/* Category Boxes Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-headline font-black italic text-2xl text-white uppercase tracking-tight">Nuestra Carta</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(i)}
                    className="group relative h-32 sm:h-40 rounded-3xl overflow-hidden border border-white/5 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-2xl"
                  >
                    {/* Background */}
                    <div className="absolute inset-0 bg-surface-container transition-colors group-hover:bg-primary/20" />
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                       <span className="material-symbols-outlined text-8xl rotate-12 transition-transform group-hover:scale-110">
                        {cat.includes('JUGO') ? 'local_bar' : cat.includes('BATIDO') ? 'blender' : 'restaurant'}
                       </span>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                       <span className="font-headline font-black italic text-base sm:text-xl text-white uppercase tracking-tighter text-center leading-tight">
                        {cat}
                       </span>
                       <div className="w-8 h-1 bg-primary mt-2 origin-center scale-x-0 group-hover:scale-x-100 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* CATEGORY PAGE VIEW */
          <div className="animate-fade-in-up min-h-[60vh]">
            {/* Back Button */}
            <button 
              onClick={() => setActiveCategory(null)}
              className="mb-8 flex items-center gap-2 px-6 py-3 rounded-2xl bg-surface-container border border-white/5 text-primary font-headline font-black italic uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all cursor-pointer shadow-xl group"
            >
              <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">arrow_back</span>
              Volver al inicio
            </button>

            <CategorySection
              category={menuData.menu[activeCategory]}
              index={activeCategory}
            />
          </div>
        )}
      </main>




      {/* Floating Elements */}
      {/* Floating WhatsApp */}

      <a 
        href="https://wa.me/51941210594" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-pulse-glow"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Cart floating button */}
      <CartButton onClick={() => setCartOpen(true)} />


      {/* Cart drawer overlay */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
