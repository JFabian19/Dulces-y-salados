import MenuItem from './MenuItem';

/* Category icon mapping */
const categoryIcons = {
  'JUGOS CLASICOS': 'local_bar',
  'JUGOS ESPECIALES': 'wine_bar',
  'BATIDOS': 'blender',
  'MILKSHAKE': 'icecream',
  'CREMOLADAS': 'ac_unit',
  'BEBIDAS FRIAS': 'local_drink',
  'POSTRES': 'cake',
  'BEBIDAS CALIENTES': 'coffee',
};

/* Category image mapping */
const categoryImages = {
  'JUGOS CLASICOS': '/images/jugos_clasicos.png',
  'JUGOS ESPECIALES': '/images/jugos_especiales.png',
  'BATIDOS': '/images/batidos.png',
  'MILKSHAKE': '/images/milkshake.png',
  'CREMOLADAS': '/images/cremoladas.png',
  'BEBIDAS FRIAS': '/images/bebidas_frias.png',
  'POSTRES': '/images/postres.png',
  'BEBIDAS CALIENTES': '/images/bebidas_calientes.png',
};

/* Alternating accent colors per category */
const accentClasses = [
  { border: 'border-secondary', text: 'text-secondary', hover: 'group-hover:text-secondary' },
  { border: 'border-primary', text: 'text-primary', hover: 'group-hover:text-primary' },
  { border: 'border-tertiary', text: 'text-tertiary', hover: 'group-hover:text-tertiary' },
  { border: 'border-secondary', text: 'text-secondary', hover: 'group-hover:text-secondary' },
  { border: 'border-primary', text: 'text-primary', hover: 'group-hover:text-primary' },
  { border: 'border-tertiary', text: 'text-tertiary', hover: 'group-hover:text-tertiary' },
  { border: 'border-secondary', text: 'text-secondary', hover: 'group-hover:text-secondary' },
  { border: 'border-primary', text: 'text-primary', hover: 'group-hover:text-primary' },
];

export default function CategorySection({ category, index, sectionRef }) {
  const accent = accentClasses[index % accentClasses.length];
  const icon = categoryIcons[category.categoria] || 'restaurant';
  const image = categoryImages[category.categoria];

  return (
    <div className="space-y-5 animate-fade-in-up" ref={sectionRef} id={`category-${index}`}>
      {/* Category heading */}
      <div className={`flex items-center gap-3 border-l-4 ${accent.border} pl-4`}>
        <span
          className={`material-symbols-outlined ${accent.text} text-2xl`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
        <h3 className={`font-headline font-black italic text-2xl sm:text-3xl ${accent.text} uppercase`}>
          {category.categoria}
        </h3>
      </div>

      {/* Category image */}
      {image && (
        <div className="w-full h-40 sm:h-48 md:h-56 rounded-2xl overflow-hidden shadow-xl border border-white/5 group">
          <img
            alt={category.categoria}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            src={image}
            loading="lazy"
          />
        </div>
      )}

      {/* Items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
        {category.items.map((item, i) => (
          <MenuItem
            key={item.cod}
            item={item}
            hoverColor={accent.hover}
            staggerIndex={i}
          />
        ))}
      </div>
    </div>
  );
}
