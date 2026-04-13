import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = '51903143807';

function parsePrice(priceStr) {
  return parseFloat(priceStr.replace('S/', '').trim());
}

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, addItem, deleteItem, clearCart, totalItems, totalPrice } = useCart();

  /* Build WhatsApp message and open it */
  const sendToWhatsApp = () => {
    if (items.length === 0) return;

    let msg = '🧾 *NUEVO PEDIDO — Dulces & Salados*\n';
    msg += '─────────────────────\n\n';

    items.forEach((item, i) => {
      const subtotal = (parsePrice(item.precio) * item.qty).toFixed(2);
      msg += `${i + 1}. *${item.nombre}*\n`;
      msg += `   ${item.qty}x ${item.precio} = S/ ${subtotal}\n\n`;
    });

    msg += '─────────────────────\n';
    msg += `💰 *TOTAL: S/ ${totalPrice.toFixed(2)}*\n\n`;
    msg += '📍 Por favor confirmar dirección de entrega.\n';
    msg += '¡Gracias por su pedido! 🙏';

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-black z-[70] shadow-2xl transform transition-transform duration-400 ease-out flex flex-col border-l border-white/10
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        id="cart-drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">
              shopping_bag
            </span>
            <h2 className="font-headline font-black text-xl text-white uppercase tracking-tight">Tu Carrito</h2>
            {totalItems > 0 && (
              <span className="bg-primary text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Cerrar"
            id="close-cart"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant/20">
                  shopping_bag
                </span>
              </div>
              <p className="text-white text-xl font-black uppercase tracking-tight mb-2">Carrito vacío</p>
              <p className="text-on-surface-variant text-sm font-body max-w-[200px]">Parece que aún no has agregado nada delicioso.</p>
            </div>
          ) : (
            items.map((item) => {
              const subtotal = (parsePrice(item.precio) * item.qty).toFixed(2);
              return (
                <div
                  key={item.cod}
                  className="bg-surface-container rounded-3xl p-5 flex items-center gap-4 animate-fade-in-up border border-white/5"
                >
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-sm text-white uppercase tracking-tight truncate">
                      {item.nombre}
                    </p>
                    <p className="text-primary text-xs font-black mt-1">
                      {item.precio} <span className="text-on-surface-variant/60 font-medium">unid.</span>
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/5">
                    <button
                      onClick={() => removeItem(item.cod)}
                      className="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center text-white hover:bg-error/20 hover:text-error transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="font-headline font-black text-sm w-8 text-center text-white">{item.qty}</span>
                    <button
                      onClick={() => addItem(item)}
                      className="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center text-white hover:bg-primary/20 hover:text-primary transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right shrink-0 w-20">
                    <p className="font-headline font-black text-sm text-white tracking-tight">S/ {subtotal}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer — total + actions */}
        {items.length > 0 && (
          <div className="border-t border-white/5 px-6 py-8 space-y-6 bg-surface-container-lowest">
            {/* Summary */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="font-headline font-black text-sm text-on-surface-variant uppercase tracking-widest">Total Orden</span>
                <span className="font-headline font-black text-3xl text-primary tracking-tighter leading-none">
                  S/ {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* WhatsApp button */}
            <button
              onClick={sendToWhatsApp}
              className="w-full flex items-center justify-center gap-3 bg-primary text-black py-4.5 rounded-2xl font-headline font-black uppercase tracking-wider active:scale-[0.98] transition-all shadow-xl shadow-primary/20 cursor-pointer"
              id="send-whatsapp"
            >
              <span className="material-symbols-outlined">send</span>
              Confirmar Pedido
            </button>

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="w-full text-center text-on-surface-variant/40 hover:text-error text-[10px] font-black uppercase tracking-[0.2em] transition-colors cursor-pointer"
              id="clear-cart"
            >
              Vaciar carrito de compras
            </button>
          </div>
        )}
      </div>
    </>
  );
}

