export const metadata = {
  title: "Allergen Information | Peckers",
  description: "Allergen information for Peckers menu items.",
};

export default function AllergensPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-peakers text-4xl md:text-6xl mb-8">Allergen Information</h1>
        <p className="text-white/80 text-base md:text-lg leading-relaxed">
          If you have any allergies, please contact the store before ordering.
          This page is a placeholder for detailed allergen guidance.
        </p>
      </div>
    </main>
  );
}
