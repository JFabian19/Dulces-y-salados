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

export default function Header({ onCategoryClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  const marqueeText = "EL MEJOR SABOR DE MIRAFLORES • ";

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex flex-col items-center bg-black/95 backdrop-blur-xl border-b border-white/5">
      {/* Top row */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Logo Space */}
          <div className="w-11 h-11 rounded-full bg-surface-container border border-primary/30 flex items-center justify-center overflow-hidden shrink-0">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover opacity-50" /> {/* Placeholder */}
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-[Fredoka] font-bold text-primary leading-none tracking-tight">
              Dulces &amp; Salados
            </h1>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-on-surface-variant flex items-center gap-2">
              Broasteria - Juguería
              <span className="w-1 h-1 bg-primary rounded-full" />
              Restaurante
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-white/50">Delivery</span>
            <span className="text-secondary font-black text-sm tracking-widest">903 143 807</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-white border border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-xl">shopping_bag</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Marquee */}
      <div className="w-full bg-surface-container-low/50 py-3 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-4">
           {/* Search Input */}
           <div className="w-full relative shrink-0">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
            <input 
              type="text" 
              placeholder="¿Qué te apetece hoy? Busca aquí..." 
              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-on-surface-variant font-body italic"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Infinity Marquee */}
      <div className="w-full py-2 bg-primary/10 overflow-hidden whitespace-nowrap border-b border-primary/20">
        <div className="animate-marquee inline-flex">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="font-headline font-black italic text-[11px] text-primary uppercase tracking-widest px-4">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}


