export default function Sidebar() {
  return (
    <aside className="space-y-8">
      {/* Highlighted section card */}
      <div className="bg-surface-container-high rounded-[2.5rem] p-7 sm:p-8 relative overflow-hidden shadow-2xl animate-fade-in-up">
        <div className="relative z-10">
          <h3 className="font-headline font-black italic text-2xl text-secondary uppercase mb-1">
            Nuestros Favoritos
          </h3>
          <p className="text-on-surface-variant text-xs italic mb-5">Lo más pedido por nuestros clientes</p>

          <div className="space-y-4">
            {[
              { name: 'Frappuccino Moka', price: 'S/ 14.00', icon: 'coffee' },
              { name: 'Mousse de Chocolate', price: 'S/ 8.00', icon: 'cake' },
              { name: 'Frozen Fresa', price: 'S/ 19.00', icon: 'local_drink' },
              { name: 'Lúcuma con Leche', price: 'S/ 13.00', icon: 'blender' },
            ].map((item) => (
              <div key={item.name} className="flex justify-between items-center group cursor-pointer">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary/60 text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                  <span className="font-bold group-hover:text-primary transition-colors">{item.name}</span>
                </div>
                <span className="font-headline font-black text-secondary">{item.price}</span>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/51941210594"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full mt-8 bg-primary text-on-primary py-4 rounded-full font-headline font-black italic uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-primary/20 animate-pulse-glow"
            id="order-now-btn"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              shopping_basket
            </span>
            Pedir Ahora
          </a>
        </div>

        {/* Decorative background icon */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-20">
          <span
            className="material-symbols-outlined text-8xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_cafe
          </span>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-surface-container rounded-[2rem] p-6 border border-white/5 animate-fade-in-up">
        <h4 className="font-headline font-black italic text-lg text-primary uppercase mb-3">Horario</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Lun - Vie</span>
            <span className="font-bold">8:00 AM - 9:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Sábados</span>
            <span className="font-bold">9:00 AM - 10:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Domingos</span>
            <span className="font-bold">9:00 AM - 8:00 PM</span>
          </div>
        </div>
      </div>

      {/* Location card */}
      <div className="bg-surface-container rounded-[2rem] p-6 border border-white/5 animate-fade-in-up">
        <h4 className="font-headline font-black italic text-lg text-primary uppercase mb-3">Ubicación</h4>
        <div className="flex items-start gap-2 text-sm">
          <span className="material-symbols-outlined text-primary text-lg mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
            location_on
          </span>
          <span className="text-on-surface-variant">Encuéntranos en nuestra sucursal principal. ¡Te esperamos!</span>
        </div>
      </div>
    </aside>
  );
}
