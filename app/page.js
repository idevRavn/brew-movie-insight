export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <nav className="border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-orange-500 text-2xl font-bold">Brew</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center py-20 px-4">
        <h1 className="text-6xl font-bold mb-4">
          <span className="text-orange-500">AI Movie</span> Insight
        </h1>
        <p className="text-white/50 text-lg">
          Enter any IMDb ID to discover what audiences really think
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter IMDb ID (e.g. tt0133093)"
            className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 
                       text-white placeholder-white/30 focus:outline-none 
                       focus:border-orange-500 transition-all duration-200"
          />
          <button
            className="px-8 py-4 bg-orange-500 hover:bg-orange-400 
                             text-white font-semibold rounded-xl transition-all 
                             duration-200 hover:scale-105 active:scale-95"
          >
            Analyze
          </button>
        </div>

        {/* Example */}
        <div className="mt-4 flex gap-4 justify-center">
          <span className="text-white/30 text-sm">Try:</span>
          <button className="text-orange-400 hover:text-orange-300 text-sm underline underline-offset-2">
            tt0133093
          </button>
          <button className="text-orange-400 hover:text-orange-300 text-sm underline underline-offset-2">
            tt1375666
          </button>
          <button className="text-orange-400 hover:text-orange-300 text-sm underline underline-offset-2">
            tt0468569
          </button>
        </div>
      </div>
    </main>
  );
}
