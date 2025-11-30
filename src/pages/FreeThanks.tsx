export default function FreeThanks() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900">You're in! 🎉</h1>
        <p className="mt-2 text-gray-600">
          Your free plan is active. Explore the interaction checker and tools now.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200"
          style={{ touchAction: 'manipulation' }}
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
