import { useConversionStore } from '../lib/store';
import { categories } from '../lib/conversions';
import { Ruler, Thermometer, Scale } from 'lucide-react';
import { cn } from '../lib/utils';

const iconMap = {
  ruler: Ruler,
  thermometer: Thermometer,
  scale: Scale,
};

export function CategorySelector() {
  const { category: selectedCategory, setCategory } = useConversionStore();

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((category) => {
        const Icon = iconMap[category.icon as keyof typeof iconMap];
        return (
          <button
            key={category.name}
            onClick={() => setCategory(category.name)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
              selectedCategory === category.name
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="capitalize">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}