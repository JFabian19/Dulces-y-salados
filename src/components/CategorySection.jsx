import MenuItem from './MenuItem';

export default function CategorySection({ category, index, sectionRef }) {
  return (
    <div className="space-y-6 animate-fade-in-up" ref={sectionRef} id={`category-${index}`}>
      {/* Category heading with Torn Edge */}
      <div className="relative py-3 px-8 bg-primary torn-edge shadow-xl mx-auto flex justify-center w-fit">
        <h3 className="font-headline font-black italic text-xl text-on-primary uppercase tracking-tight">
          {category.categoria}
        </h3>
      </div>

      {/* Items grid — Dense 2 columns */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {category.items.map((item, i) => (
          <MenuItem
            key={item.cod}
            item={item}
            staggerIndex={i}
          />
        ))}
      </div>
    </div>
  );
}

