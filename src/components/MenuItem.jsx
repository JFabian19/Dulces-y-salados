import { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';

export default function MenuItem({ item, staggerIndex }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  // Mock silhouetted/food image
  const imageUrl = item.imagen || `https://images.unsplash.com/photo-1540333563391-645cb71ec74d?q=80&w=400&auto=format&fit=crop`;

  const handleAdd = useCallback((e) => {
    e.stopPropagation();
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }, [addItem, item]);

  return (
    <div
      className={`group relative flex flex-col bg-surface-container rounded-3xl overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-300 animate-fade-in-up stagger-${Math.min(staggerIndex + 1, 17)} shadow-xl`}
      id={`item-${item.cod}`}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
        <img
          src={imageUrl}
          alt={item.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 pt-3">
        <h4 className="font-headline font-bold italic text-base text-white leading-tight mb-1 uppercase truncate">
          {item.nombre}
        </h4>
        <p className="text-on-surface-variant text-[10px] italic line-clamp-2 mb-4 leading-relaxed font-body h-6">
          {item.descripcion || "Receta tradicional preparada con los mejores ingredientes."}
        </p>

        {/* Footer: Price & Add Button */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-primary font-black italic text-base">
            {item.precio}
          </span>

          <button
            onClick={handleAdd}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg
              ${added
                ? 'bg-primary scale-110'
                : 'bg-surface-container-highest text-white hover:bg-primary border border-white/10'
              }`}
            aria-label={`Agregar ${item.nombre}`}
          >
            <span className="material-symbols-outlined text-xl">
              {added ? 'check' : 'add'}
            </span>
          </button>
        </div>
      </div>

      {/* Added feedback overlay */}
      {added && (
        <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none z-20">
          <div className="bg-primary text-white px-3 py-1.5 rounded-full font-bold text-[10px] shadow-2xl animate-cart-pop uppercase tracking-widest">
            ¡Agregado!
          </div>
        </div>
      )}
    </div>
  );
}



