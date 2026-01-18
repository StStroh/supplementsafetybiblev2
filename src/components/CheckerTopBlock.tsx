export default function CheckerTopBlock() {
  return (
    <div className="max-w-4xl mx-auto mb-8 px-4 sm:px-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          Check supplement + medication interactions
        </h1>

        <p className="text-lg text-slate-600 font-medium leading-relaxed">
          See documented interactions between your supplements and prescription medications before you take them.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 pt-2">
          <span className="font-medium">Educational</span>
          <span>•</span>
          <span className="font-medium">Evidence-based</span>
          <span>•</span>
          <span className="font-medium">Not medical advice</span>
        </div>
      </div>
    </div>
  );
}
