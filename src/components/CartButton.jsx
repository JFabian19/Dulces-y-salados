import { useCart } from '../context/CartContext';

export default function CartButton({ onClick }) {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[55] flex items-center gap-3 bg-primary text-black pl-4 pr-5 py-3.5 rounded-2xl font-headline font-black uppercase tracking-wider shadow-[0_8px_30px_rgba(0,209,102,0.4)] hover:shadow-[0_12px_40px_rgba(0,209,102,0.6)] active:scale-95 transition-all duration-300 cursor-pointer animate-cart-pop whitespace-nowrap"
      id="view-cart-btn"
    >
      <div className="relative">
        <span className="material-symbols-outlined text-xl">shopping_bag</span>
        <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
          {totalItems}
        </span>
      </div>
      <span className="text-sm">Ver Pedido</span>
      <span className="text-sm font-black tracking-tight border-l border-black/20 pl-3 ml-1">
        S/ {totalPrice.toFixed(2)}
      </span>
    </button>
  );
}
