import { useCart } from '../context/CartContext';

export default function CartButton({ onClick }) {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 md:bottom-8 z-[55] flex items-center gap-3 bg-primary text-on-primary pl-5 pr-6 py-3.5 rounded-full font-headline font-black italic uppercase tracking-wider shadow-[0_8px_30px_rgba(255,143,111,0.5)] hover:shadow-[0_12px_40px_rgba(255,143,111,0.7)] active:scale-95 transition-all duration-300 cursor-pointer animate-cart-pop"
      id="view-cart-btn"
    >
      <div className="relative">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          shopping_basket
        </span>
        <span className="absolute -top-2 -right-2 bg-secondary text-on-secondary text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
          {totalItems}
        </span>
      </div>
      <span className="text-sm">Ver Pedido</span>
      <span className="text-sm font-black">S/ {totalPrice.toFixed(2)}</span>
    </button>
  );
}
