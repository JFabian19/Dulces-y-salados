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

  /* IntersectionObserver to highlight active category as user scrolls */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveCategory(idx);
          }
        });
      },
      { rootMargin: '-200px 0px -60% 0px', threshold: 0 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Stucco texture overlay */}
      <div className="fixed inset-0 stucco-overlay pointer-events-none z-0" />

      <Header
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />

      <main className="pt-44 pb-32 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu categories */}
          <div className="lg:col-span-2 space-y-14">
            {menuData.menu.map((cat, i) => (
              <CategorySection
                key={cat.categoria}
                category={cat}
                index={i}
                sectionRef={(el) => (sectionRefs.current[i] = el)}
              />
            ))}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>

        <Features />
      </main>

      <BottomNav onCategoryClick={handleCategoryClick} />

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
