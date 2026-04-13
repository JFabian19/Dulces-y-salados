import { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';

export default function MenuItem({ item, hoverColor, staggerIndex }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }, [addItem, item]);

  return (
    <div
      className={`flex items-center gap-2 group cursor-pointer animate-fade-in-up stagger-${Math.min(staggerIndex + 1, 17)} relative`}
      id={`item-${item.cod}`}
    >
      {/* Item name + dotted leader + price */}
      <div className="flex items-end flex-1 min-w-0 mb-0.5">
        <span className={`font-headline font-bold text-sm sm:text-base text-on-surface ${hoverColor} transition-colors uppercase truncate`}>
          {item.nombre}
        </span>
        <div className="dotted-leader" />
        <span className="font-headline font-black text-sm sm:text-base text-secondary whitespace-nowrap">
          {item.precio}
        </span>
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer
          ${added
            ? 'bg-green-500 scale-110 shadow-lg shadow-green-500/40'
            : 'bg-surface-container-high border border-outline-variant hover:bg-primary hover:border-primary hover:text-on-primary hover:shadow-lg hover:shadow-primary/30 active:scale-90'
          }`}
        aria-label={`Agregar ${item.nombre}`}
        id={`add-${item.cod}`}
      >
        <span
          className={`material-symbols-outlined text-lg transition-transform duration-300 ${added ? 'rotate-[360deg] text-white' : ''}`}
          style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}
        >
          {added ? 'check' : 'add'}
        </span>
      </button>

      {/* Added toast animation */}
      {added && (
        <div className="absolute -top-6 right-0 text-xs font-bold text-green-400 animate-toast pointer-events-none whitespace-nowrap">
          ¡Agregado! ✓
        </div>
      )}
    </div>
  );
}
