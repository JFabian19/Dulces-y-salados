export default function Hero() {
  return (
    <section className="mb-10 relative animate-fade-in-up" id="hero-section">
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1540333563391-645cb71ec74d?q=80&w=1200&auto=format&fit=crop" 
          alt="Jugos y Postres" 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-primary px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg animate-pulse-glow">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-[10px] sm:text-xs font-black text-white tracking-widest uppercase">¡Abierto Ahora!</span>
        </div>

        {/* Content */}
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 right-6">
          <div className="inline-block bg-primary text-white px-3 py-1 rounded-md text-[10px] font-black mb-3 shadow-lg uppercase tracking-tighter">
            Especialidad de la Casa
          </div>
          <h2 className="font-headline font-black italic text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-[0.9] mb-1 drop-shadow-2xl">
            Sabor <span className="text-primary italic">Tradicional</span>
          </h2>
          <p className="text-primary font-bold text-sm sm:text-lg uppercase tracking-widest flex items-center gap-3 italic">
            Los mejores sabores
            <span className="w-12 h-0.5 bg-primary/50" />
          </p>
        </div>
      </div>
    </section>
  );
}


