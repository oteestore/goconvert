export interface Unit {
  name: string;
  symbol: string;
  ratio: number;
  offset?: number;
}

export interface Category {
  name: string;
  units: Unit[];
  icon: string;
}

export const categories: Category[] = [
  {
    name: 'length',
    icon: 'ruler',
    units: [
      { name: 'meters', symbol: 'm', ratio: 1 },
      { name: 'kilometers', symbol: 'km', ratio: 1000 },
      { name: 'centimeters', symbol: 'cm', ratio: 0.01 },
      { name: 'millimeters', symbol: 'mm', ratio: 0.001 },
      { name: 'feet', symbol: 'ft', ratio: 0.3048 },
      { name: 'inches', symbol: 'in', ratio: 0.0254 },
      { name: 'yards', symbol: 'yd', ratio: 0.9144 },
      { name: 'miles', symbol: 'mi', ratio: 1609.344 },
    ],
  },
  {
    name: 'temperature',
    icon: 'thermometer',
    units: [
      { name: 'celsius', symbol: '°C', ratio: 1, offset: 0 },
      { name: 'fahrenheit', symbol: '°F', ratio: 5/9, offset: -32 },
      { name: 'kelvin', symbol: 'K', ratio: 1, offset: -273.15 },
    ],
  },
  {
    name: 'weight',
    icon: 'scale',
    units: [
      { name: 'kilograms', symbol: 'kg', ratio: 1 },
      { name: 'grams', symbol: 'g', ratio: 0.001 },
      { name: 'pounds', symbol: 'lb', ratio: 0.45359237 },
      { name: 'ounces', symbol: 'oz', ratio: 0.028349523125 },
      { name: 'metric tons', symbol: 't', ratio: 1000 },
    ],
  },
];

export function convert(value: number, from: Unit, to: Unit): number {
  if (from.offset !== undefined && to.offset !== undefined) {
    // Handle temperature conversions
    const standardValue = (value + (from.offset || 0)) * from.ratio;
    return (standardValue / to.ratio) - (to.offset || 0);
  }
  
  // Handle regular conversions
  return (value * from.ratio) / to.ratio;
}

export function findUnit(category: string, unitName: string): Unit | undefined {
  return categories.find(c => c.name === category)?.units.find(u => u.name === unitName);
}

export function getCategory(name: string): Category | undefined {
  return categories.find(c => c.name === name);
}