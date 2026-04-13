export default function Features() {
  const features = [
    { icon: 'local_bar', label: 'Jugos Frescos' },
    { icon: 'workspace_premium', label: 'Calidad Premium' },
    { icon: 'schedule', label: 'Hecho al Momento' },
    { icon: 'delivery_dining', label: 'Delivery Rápido' },
  ];

  return (
    <section className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up" id="features-section">
      {features.map((f) => (
        <div
          key={f.label}
          className="bg-surface-container-low p-5 sm:p-6 rounded-xl flex flex-col items-center text-center border border-white/5 hover:border-primary/30 transition-colors group"
        >
          <span
            className="material-symbols-outlined text-primary text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {f.icon}
          </span>
          <p className="font-bold text-xs sm:text-sm uppercase">{f.label}</p>
        </div>
      ))}
    </section>
  );
}
