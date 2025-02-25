import { CategorySelector } from './components/category-selector';
import { Converter } from './components/converter';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            GoConvertUnits
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Quick and accurate unit conversions
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <CategorySelector />
        <Converter />
      </main>
    </div>
  );
}

export default App;