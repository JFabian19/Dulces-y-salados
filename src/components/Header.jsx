import { useState, useRef, useEffect } from 'react';

/* ─── Category icon mapping ─── */
const categoryIcons = {
  'JUGOS CLASICOS': 'local_bar',
  'JUGOS ESPECIALES': 'wine_bar',
  'BATIDOS': 'blender',
  'MILKSHAKE': 'icecream',
  'CREMOLADAS': 'ac_unit',
  'BEBIDAS FRIAS': 'local_drink',
  'POSTRES': 'cake',
  'BEBIDAS CALIENTES': 'coffee',
};

export default function Header({ categories, activeCategory, onCategoryClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  /* scroll active category pill into view */
  useEffect(() => {
    if (navRef.current && activeCategory !== null) {
      const btn = navRef.current.querySelector(`[data-cat="${activeCategory}"]`);
      if (btn) btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeCategory]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col items-center px-4 sm:px-6 py-3 sm:py-4 max-w-full bg-[#0e0e0e]/95 backdrop-blur-lg rounded-b-3xl border-b border-white/5">
      {/* Top row */}
      <div className="flex justify-between items-center w-full mb-2">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-primary cursor-pointer"
            aria-label="Toggle menu"
            id="menu-toggle"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black italic text-primary drop-shadow-[0_4px_4px_rgba(255,143,111,0.4)] font-headline uppercase tracking-tighter scale-105 origin-left">
            Dulces &amp; Salados
          </h1>
        </div>
      </div>

      {/* Horizontal category navigation */}
      <nav
        ref={navRef}
        className="category-nav flex gap-2 overflow-x-auto w-full py-1 px-1"
      >
        {categories.map((cat, i) => (
          <button
            key={cat}
            data-cat={i}
            onClick={() => onCategoryClick(i)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border
              ${activeCategory === i
                ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/30'
                : 'bg-surface-container-high text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary'
              }`}
            id={`cat-nav-${i}`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Mobile slide-out menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-surface-container/98 backdrop-blur-xl border-b border-white/5 py-4 px-6 space-y-3 animate-fade-in-up md:hidden">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => { onCategoryClick(i); setMenuOpen(false); }}
              className="flex items-center gap-3 w-full text-left py-2 px-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {categoryIcons[cat] || 'restaurant'}
              </span>
              <span className="font-headline font-bold text-sm uppercase tracking-wide">{cat}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
