export default function StatsBar() {
  return (
    <section className="w-full bg-blue-600 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-white">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold mb-1">15,000+</div>
            <div className="text-blue-100 font-medium">Interactions Checked</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold mb-1">500+</div>
            <div className="text-blue-100 font-medium">Medications Covered</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold mb-1">200+</div>
            <div className="text-blue-100 font-medium">Supplements Tracked</div>
          </div>
        </div>
      </div>
    </section>
  );
}
