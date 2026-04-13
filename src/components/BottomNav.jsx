export default function BottomNav({ onCategoryClick }) {
  return (
    <nav
      className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-8 pt-4 bg-[#0e0e0e]/95 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)] md:hidden border-t border-white/5"
      id="bottom-nav"
    >
      <a
        className="flex flex-col items-center justify-center text-white/50 px-4 py-2 hover:text-primary transition-all"
        href="#hero-section"
      >
        <span className="material-symbols-outlined mb-1">home</span>
        <span className="font-body font-bold italic text-[10px] uppercase">Inicio</span>
      </a>
      <button
        className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-full px-8 py-2 translate-y-[-12px] shadow-[0_4px_20px_rgba(255,143,111,0.5)] cursor-pointer active:scale-95 transition-transform"
        onClick={() => onCategoryClick(0)}
        id="bottom-nav-menu"
      >
        <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
          restaurant_menu
        </span>
        <span className="font-body font-bold italic text-[10px] uppercase">Carta</span>
      </button>
      <a
        className="flex flex-col items-center justify-center text-white/50 px-4 py-2 hover:text-primary transition-all"
        href="https://wa.me/51903143807"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="material-symbols-outlined mb-1">call</span>
        <span className="font-body font-bold italic text-[10px] uppercase">Contacto</span>
      </a>
    </nav>
  );
}
