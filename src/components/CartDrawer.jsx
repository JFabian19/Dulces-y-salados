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
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-surface-container z-[70] shadow-2xl transform transition-transform duration-400 ease-out flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        id="cart-drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              shopping_basket
            </span>
            <h2 className="font-headline font-black italic text-xl text-on-surface uppercase">Tu Pedido</h2>
            {totalItems > 0 && (
              <span className="bg-primary text-on-primary text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            aria-label="Cerrar"
            id="close-cart"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
                shopping_cart
              </span>
              <p className="text-on-surface-variant text-lg font-bold italic mb-1">Tu carrito está vacío</p>
              <p className="text-on-surface-variant/60 text-sm italic">Agrega productos desde el menú</p>
            </div>
          ) : (
            items.map((item) => {
              const subtotal = (parsePrice(item.precio) * item.qty).toFixed(2);
              return (
                <div
                  key={item.cod}
                  className="bg-surface-container-high rounded-2xl p-4 flex items-center gap-3 animate-fade-in-up border border-white/5"
                >
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-sm uppercase text-on-surface truncate">
                      {item.nombre}
                    </p>
                    <p className="text-on-surface-variant text-xs italic mt-0.5">
                      {item.precio} c/u
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => removeItem(item.cod)}
                      className="w-7 h-7 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center hover:bg-error/20 hover:border-error hover:text-error transition-colors cursor-pointer"
                      aria-label="Reducir cantidad"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>remove</span>
                    </button>
                    <span className="font-headline font-black text-sm w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => addItem(item)}
                      className="w-7 h-7 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center hover:bg-primary/20 hover:border-primary hover:text-primary transition-colors cursor-pointer"
                      aria-label="Aumentar cantidad"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right shrink-0 w-16">
                    <p className="font-headline font-black text-sm text-secondary">S/ {subtotal}</p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => deleteItem(item.cod)}
                    className="shrink-0 text-on-surface-variant/40 hover:text-error transition-colors cursor-pointer"
                    aria-label={`Eliminar ${item.nombre}`}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer — total + actions */}
        {items.length > 0 && (
          <div className="border-t border-white/5 px-6 py-5 space-y-4 bg-surface-container-low">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Productos</span>
                <span>{totalItems} items</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-headline font-black italic text-lg uppercase">Total</span>
                <span className="font-headline font-black text-2xl text-secondary">
                  S/ {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* WhatsApp button */}
            <button
              onClick={sendToWhatsApp}
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white py-4 rounded-full font-headline font-black italic uppercase tracking-wider active:scale-95 transition-all shadow-lg shadow-[#25D366]/30 cursor-pointer"
              id="send-whatsapp"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Pedir por WhatsApp
            </button>

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="w-full text-center text-on-surface-variant/60 hover:text-error text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer py-1"
              id="clear-cart"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
