import { useEffect, useState } from 'react';
import { useConversionStore } from '../lib/store';
import { Input } from './ui/input';
import { convert, findUnit, getCategory } from '../lib/conversions';
import { formatNumber } from '../lib/utils';

export function Converter() {
  const { category, fromUnit, toUnit, value, setFromUnit, setToUnit, setValue } = useConversionStore();
  const [result, setResult] = useState<string>('');
  
  const currentCategory = getCategory(category);
  
  useEffect(() => {
    if (!value || !currentCategory) return;
    
    const from = findUnit(category, fromUnit);
    const to = findUnit(category, toUnit);
    
    if (!from || !to) return;
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    
    const converted = convert(numValue, from, to);
    setResult(formatNumber(converted));
  }, [category, fromUnit, toUnit, value]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Value</label>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium">From</h3>
          <div className="flex flex-col gap-1.5">
            {currentCategory?.units.map((unit) => (
              <button
                key={unit.name}
                onClick={() => setFromUnit(unit.name)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  fromUnit === unit.name
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {unit.name} ({unit.symbol})
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">To</h3>
          <div className="flex flex-col gap-1.5">
            {currentCategory?.units.map((unit) => (
              <button
                key={unit.name}
                onClick={() => setToUnit(unit.name)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  toUnit === unit.name
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {unit.name} ({unit.symbol})
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {result && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
          <p className="text-center flex items-center justify-center">
            <span className="text-4xl font-bold">{result}</span>
            <span className="ml-2 text-gray-700 text-xl">
              {findUnit(category, toUnit)?.symbol}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
