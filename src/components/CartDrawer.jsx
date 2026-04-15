import { useState } from 'react';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = '51903143807';

function parsePrice(priceStr) {
  return parseFloat(priceStr.replace('S/', '').trim());
}

const PAYMENT_METHODS = [
  { id: 'yape',          label: 'Yape',                  icon: 'payments',        number: '+51 903 143 807' },
  { id: 'plin',          label: 'Plin',                  icon: 'smartphone',      number: '+51 903 143 807' },
  { id: 'transferencia', label: 'Transferencia Bancaria', icon: 'account_balance', number: null },
  { id: 'efectivo',      label: 'Efectivo',               icon: 'money',           number: null },
];



/* ─── Step indicator ─── */
function StepDots({ step }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-1">
      {[1, 2, 3, 4].map((s) => (
        <span
          key={s}
          className={`block rounded-full transition-all duration-300 ${
            s === step
              ? 'w-6 h-2 bg-primary'
              : s < step
              ? 'w-2 h-2 bg-primary/40'
              : 'w-2 h-2 bg-white/15'
          }`}
        />
      ))}
    </div>
  );
}

/* ─── Main drawer ─── */
export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, addItem, clearCart, totalItems, totalPrice } = useCart();

  // step: 1=cart, 2=configure, 3=address, 4=payment, 5=summary
  const [step, setStep] = useState(1);

  // notes[cod] = string  (one note per unique item/cod)
  const [notes, setNotes] = useState({});

  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');

  /* Reset flow when drawer closes */
  const handleClose = () => {
    onClose();
    setTimeout(() => setStep(1), 400);
  };

  /* Build and send WhatsApp message */
  const sendToWhatsApp = () => {
    if (items.length === 0) return;

    const selectedPayment = PAYMENT_METHODS.find((p) => p.id === payment);

    let msg = '*NUEVO PEDIDO - Dulces & Salados*\n';
    msg += '─────────────────────\n\n';

    items.forEach((item, i) => {
      const subtotal = (parsePrice(item.precio) * item.qty).toFixed(2);
      msg += `${i + 1}. *${item.nombre}* x${item.qty}\n`;
      msg += `   Subtotal: S/ ${subtotal}\n`;

      // Notes: keys are stored as "cod_1", "cod_2" etc.
      for (let u = 1; u <= item.qty; u++) {
        const noteText = notes[`${item.cod}_${u}`];
        if (noteText && noteText.trim()) {
          const label = item.qty > 1 ? `Pedido ${u}` : 'Nota';
          msg += `   >> ${label}: ${noteText.trim()}\n`;
        }
      }

      msg += '\n';
    });

    msg += '─────────────────────\n';
    msg += `*TOTAL: S/ ${totalPrice.toFixed(2)}*\n\n`;
    msg += `Direccion: ${address || 'No especificada'}\n`;

    const paymentLabel = selectedPayment
      ? `${selectedPayment.label}${selectedPayment.number ? ` (${selectedPayment.number})` : ''}`
      : payment || 'No especificado';
    msg += `Pago: ${paymentLabel}\n`;
    msg += '\n¡Gracias por su pedido!';

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    clearCart();
    handleClose();
  };

  /* Shared header */
  const stepTitles = {
    1: 'Tu Carrito',
    2: 'Configurar Pedido',
    3: 'Dirección de Entrega',
    4: 'Forma de Pago',
    5: 'Resumen del Pedido',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[450px] bg-[#111] z-[70] shadow-2xl transform transition-transform duration-400 ease-out flex flex-col border-l border-white/10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="cart-drawer"
      >
        {/* ── Header ── */}
        <div className="flex flex-col px-6 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="Volver"
                >
                  <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
              )}
              <span className="material-symbols-outlined text-primary text-2xl">
                {step === 1 ? 'shopping_bag' : step === 2 ? 'edit_note' : step === 3 ? 'location_on' : step === 4 ? 'payments' : 'receipt_long'}
              </span>
              <h2 className="font-headline font-black text-lg text-white uppercase tracking-tight">
                {stepTitles[step]}
              </h2>
              {step === 1 && totalItems > 0 && (
                <span className="bg-primary text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                  {totalItems}
                </span>
              )}
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Cerrar"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
          {step > 1 && <StepDots step={step} />}
        </div>

        {/* ══════════════════════════════
            STEP 1 — CART
        ══════════════════════════════ */}
        {step === 1 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-5xl text-white/20">shopping_bag</span>
                  </div>
                  <p className="text-white text-xl font-black uppercase tracking-tight mb-2">Carrito vacío</p>
                  <p className="text-white/40 text-sm max-w-[200px]">Parece que aún no has agregado nada delicioso.</p>
                </div>
              ) : (
                items.map((item) => {
                  const subtotal = (parsePrice(item.precio) * item.qty).toFixed(2);
                  return (
                    <div key={item.cod} className="bg-white/5 rounded-2xl p-4 flex items-center gap-4 border border-white/5">
                      <div className="flex-1 min-w-0">
                        <p className="font-headline font-bold text-sm text-white uppercase tracking-tight truncate">{item.nombre}</p>
                        <p className="text-primary text-xs font-black mt-0.5">
                          {item.precio} <span className="text-white/40 font-medium">unid.</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
                        <button
                          onClick={() => removeItem(item.cod)}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white hover:bg-red-500/20 hover:text-red-400 transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="font-headline font-black text-sm w-8 text-center text-white">{item.qty}</span>
                        <button
                          onClick={() => addItem(item)}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white hover:bg-primary/20 hover:text-primary transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      <div className="text-right shrink-0 w-16">
                        <p className="font-headline font-black text-sm text-white">S/ {subtotal}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/5 px-6 py-6 space-y-4 bg-black/30">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 font-black text-xs uppercase tracking-widest">Total</span>
                  <span className="font-headline font-black text-2xl text-primary">S/ {totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => { setNotes({}); setStep(2); }}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-black py-4 rounded-2xl font-headline font-black uppercase tracking-wider active:scale-[0.98] transition-all shadow-xl shadow-primary/20 cursor-pointer text-sm"
                  id="go-configure"
                >
                  <span className="material-symbols-outlined">edit_note</span>
                  Configurar Pedido
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-white/25 hover:text-red-400 text-[10px] font-black uppercase tracking-[0.2em] transition-colors cursor-pointer"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </>
        )}

        {/* ══════════════════════════════
            STEP 2 — CONFIGURE (notes per item unit)
        ══════════════════════════════ */}
        {step === 2 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <p className="text-white/40 text-xs uppercase tracking-widest font-black">
                Agrega notas o instrucciones especiales para cada pedido
              </p>
              {items.map((item) => {
                const units = Array.from({ length: item.qty }, (_, i) => i + 1);
                return (
                  <div key={item.cod} className="space-y-3">
                    {/* Item header */}
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-base">restaurant</span>
                      <span className="font-headline font-black text-sm text-white uppercase tracking-tight">
                        {item.nombre}
                      </span>
                      <span className="ml-auto text-primary font-black text-xs bg-primary/10 px-2 py-0.5 rounded-full">
                        x{item.qty}
                      </span>
                    </div>

                    {/* One textarea per unit if qty > 1, else single textarea */}
                    {item.qty === 1 ? (
                      <div>
                        <label className="text-white/40 text-[10px] uppercase tracking-widest font-black block mb-1">
                          Notas para este pedido
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Ej: sin cebolla, extra salsa..."
                          value={notes[`${item.cod}_1`] || ''}
                          onChange={(e) =>
                            setNotes((n) => ({ ...n, [`${item.cod}_1`]: e.target.value }))
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary/50 resize-none transition-colors"
                        />
                      </div>
                    ) : (
                      units.map((u) => (
                        <div key={u}>
                          <label className="text-primary/80 text-[10px] uppercase tracking-widest font-black block mb-1">
                            Pedido {u} — Notas
                          </label>
                          <textarea
                            rows={2}
                            placeholder={`Ej: sin cebolla, extra salsa... (pedido ${u})`}
                            value={notes[`${item.cod}_${u}`] || ''}
                            onChange={(e) =>
                              setNotes((n) => ({ ...n, [`${item.cod}_${u}`]: e.target.value }))
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary/50 resize-none transition-colors"
                          />
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/5 px-6 py-6 bg-black/30">
              <button
                onClick={() => setStep(3)}
                className="w-full flex items-center justify-center gap-2 bg-primary text-black py-4 rounded-2xl font-headline font-black uppercase tracking-wider active:scale-[0.98] transition-all shadow-xl shadow-primary/20 cursor-pointer text-sm"
              >
                <span className="material-symbols-outlined">location_on</span>
                Siguiente: Dirección
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════
            STEP 3 — ADDRESS
        ══════════════════════════════ */}
        {step === 3 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
              <p className="text-white/40 text-xs uppercase tracking-widest font-black">
                ¿Dónde entregamos tu pedido?
              </p>

              <div className="space-y-3">
                <label className="text-white/60 text-[11px] uppercase tracking-widest font-black block">
                  Dirección de entrega
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xl">location_on</span>
                  <input
                    type="text"
                    placeholder="Calle Alcanfores 471 dep 202, Miraflores"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <p className="text-white/25 text-[10px]">Incluye el número de piso o departamento si aplica.</p>
              </div>
            </div>

            <div className="border-t border-white/5 px-6 py-6 bg-black/30">
              <button
                onClick={() => setStep(4)}
                disabled={!address.trim()}
                className="w-full flex items-center justify-center gap-2 bg-primary disabled:opacity-40 disabled:cursor-not-allowed text-black py-4 rounded-2xl font-headline font-black uppercase tracking-wider active:scale-[0.98] transition-all shadow-xl shadow-primary/20 cursor-pointer text-sm"
              >
                <span className="material-symbols-outlined">payments</span>
                Siguiente: Forma de Pago
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════
            STEP 4 — PAYMENT METHOD
        ══════════════════════════════ */}
        {step === 4 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-4">
              <p className="text-white/40 text-xs uppercase tracking-widest font-black mb-2">
                Selecciona cómo pagarás
              </p>

              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setPayment(pm.id)}
                  className={`w-full flex items-center gap-5 px-5 py-5 rounded-2xl border transition-all cursor-pointer text-left ${
                    payment === pm.id
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  <span className={`material-symbols-outlined text-2xl ${payment === pm.id ? 'text-primary' : 'text-white/40'}`}>
                    {pm.icon}
                  </span>
                  <span className="font-headline font-black uppercase tracking-wider text-sm">{pm.label}</span>
                  {payment === pm.id && (
                    <span className="ml-auto material-symbols-outlined text-primary">check_circle</span>
                  )}
                </button>
              ))}
            </div>

            <div className="border-t border-white/5 px-6 py-6 bg-black/30">
              <button
                onClick={() => setStep(5)}
                disabled={!payment}
                className="w-full flex items-center justify-center gap-2 bg-primary disabled:opacity-40 disabled:cursor-not-allowed text-black py-4 rounded-2xl font-headline font-black uppercase tracking-wider active:scale-[0.98] transition-all shadow-xl shadow-primary/20 cursor-pointer text-sm"
              >
                <span className="material-symbols-outlined">receipt_long</span>
                Ver Resumen
              </button>
            </div>
          </>
        )}

        {/* ══════════════════════════════
            STEP 5 — SUMMARY + SEND
        ══════════════════════════════ */}
        {step === 5 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {/* Item list */}
              <div className="space-y-3">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-black">Pedido</p>
                {items.map((item) => {
                  const subtotal = (parsePrice(item.precio) * item.qty).toFixed(2);
                  const unitNotes = Array.from({ length: item.qty }, (_, i) => notes[`${item.cod}_${i + 1}`] || '').filter(Boolean);
                  return (
                    <div key={item.cod} className="bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-headline font-bold text-sm text-white uppercase">{item.nombre}</p>
                          <p className="text-white/40 text-xs mt-0.5">{item.qty}x {item.precio}</p>
                        </div>
                        <p className="font-headline font-black text-sm text-primary">S/ {subtotal}</p>
                      </div>
                      {unitNotes.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {unitNotes.map((note, idx) => (
                            <p key={idx} className="text-white/40 text-xs">
                              📝 {item.qty > 1 ? `Pedido ${idx + 1}: ` : ''}{note}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-white/5" />

              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">location_on</span>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-black">Dirección</p>
                  <p className="text-white text-sm font-medium mt-0.5">{address}</p>
                </div>
              </div>

              {/* Payment */}
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5">payments</span>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-black">Forma de Pago</p>
                  <p className="text-white text-sm font-medium mt-0.5">
                    {PAYMENT_METHODS.find((p) => p.id === payment)?.label}
                  </p>
                </div>
              </div>

              {/* Total */}
              <div className="bg-white/5 rounded-2xl px-5 py-4 flex justify-between items-center border border-white/5">
                <span className="text-white/60 font-black text-xs uppercase tracking-widest">Total a pagar</span>
                <span className="font-headline font-black text-2xl text-primary">S/ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-white/5 px-6 py-6 bg-black/30 space-y-3">
              {/* WhatsApp button — green */}
              <button
                onClick={sendToWhatsApp}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-headline font-black uppercase tracking-wider active:scale-[0.98] transition-all shadow-xl cursor-pointer text-sm text-white"
                style={{ backgroundColor: '#25D366', boxShadow: '0 8px 30px rgba(37,211,102,0.35)' }}
                id="send-whatsapp"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Mandar Pedido a WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
