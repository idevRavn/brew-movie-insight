"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [imdbId, setImdbId] = useState("");
  const [movie, setMovie] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!imdbId.trim()) {
      setError("Please enter an IMDb ID");
      return;
    }

    if (!imdbId.match(/^tt\d{7,8}$/)) {
      setError("Invalid format. Should look like tt0133093");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMovie(null);
    setSentiment(null);
    try {
      const movieRes = await fetch(`/api/movie?id=${imdbId}`);
      const movieData = await movieRes.json();

      if (!movieRes.ok) {
        setError(movieData.error || "Failed to fetch movie details.");
        setIsLoading(false);
        return;
      }

      setMovie(movieData);

      const sentimentRes = await fetch(`/api/sentiment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: movieData.title,
          plot: movieData.plot,
          rating: movieData.rating,
          genre: movieData.genre,
        }),
      });

      const sentimentData = await sentimentRes.json();
      if (sentimentRes.ok) {
        setSentiment(sentimentData);
      }
    } catch (err) {
      setError("Failed to fetch movie details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            value={imdbId}
            onChange={(e) => setImdbId(e.target.value)}
            placeholder="Enter IMDb ID (e.g. tt0133093)"
            className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 
                       text-white placeholder-white/30 focus:outline-none 
                       focus:border-orange-500 transition-all duration-200"
          />
          <button
            onClick={handleSearch}
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
          <button
            onClick={() => setImdbId("tt30476518")}
            className="text-orange-400 hover:text-orange-300 text-sm underline underline-offset-2"
          >
            tt30476518
          </button>
          <button
            onClick={() => setImdbId("tt1375666")}
            className="text-orange-400 hover:text-orange-300 text-sm underline underline-offset-2"
          >
            tt1375666
          </button>
          <button
            onClick={() => setImdbId("tt0468569")}
            className="text-orange-400 hover:text-orange-300 text-sm underline underline-offset-2"
          >
            tt0468569
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-center text-red-400 mt-4 text-sm">{error}</p>
      )}

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 mt-16 mb-16">
        {isLoading && <p className="text-center text-white/50">Analyzing...</p>}

        {movie && (
          <div className="flex gap-8">
            {/* Poster */}
            <Image
              src={movie.poster}
              alt={movie.title}
              width={192}
              height={288}
              className="rounded-xl object-cover flex-shrink-0"
            />

            {/* Details */}
            <div className="flex-1">
              <h2 className="text-4xl font-bold">{movie.title}</h2>
              <div className="flex gap-3 mt-3">
                <span className="text-orange-400">⭐ {movie.rating}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/60">{movie.release_year}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/60">{movie.genre}</span>
              </div>
              <p className="text-white/40 text-sm mt-1">
                Directed by {movie.director}
              </p>
              <p className="text-white/70 mt-4 leading-relaxed">{movie.plot}</p>
            </div>
          </div>
        )}

        {/* Cast */}
        {movie && (
          <div className="mt-8 flex flex-wrap gap-2">
            <p className="w-full text-white/40 text-xs uppercase tracking-widest mb-2">
              Cast
            </p>
            {movie.cast.map((name, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-white/5 border border-white/10 
                               rounded-full text-white/70 text-sm"
              >
                {name}
              </span>
            ))}
          </div>
        )}

        {/* Sentiment */}
        {sentiment && (
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">
                AI Sentiment Analysis
              </h3>
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize
        ${sentiment.classification === "positive" ? "bg-green-500/20 text-green-400 border border-green-500/30" : ""}
        ${sentiment.classification === "mixed" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : ""}
        ${sentiment.classification === "negative" ? "bg-red-500/20 text-red-400 border border-red-500/30" : ""}
      `}
              >
                {sentiment.classification === "positive"
                  ? "😊"
                  : sentiment.classification === "mixed"
                    ? "😐"
                    : "😞"}{" "}
                {sentiment.classification}
              </span>
            </div>

            {/* Score bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/50">Audience Score</span>
                <span className="text-white font-bold">
                  {sentiment.audienceScore}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000
            ${sentiment.classification === "positive" ? "bg-green-400" : ""}
            ${sentiment.classification === "mixed" ? "bg-yellow-400" : ""}
            ${sentiment.classification === "negative" ? "bg-red-400" : ""}
          `}
                  style={{ width: `${sentiment.audienceScore}%` }}
                />
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-4">
              {sentiment.sentimentSummary}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-green-400 text-sm font-medium mb-2">
                  ✅ What audiences love
                </p>
                <ul className="space-y-1">
                  {sentiment.positivePoints.map((p, i) => (
                    <li key={i} className="text-white/60 text-sm flex gap-2">
                      <span className="text-green-400">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-red-400 text-sm font-medium mb-2">
                  ⚠️ Common criticisms
                </p>
                <ul className="space-y-1">
                  {sentiment.negativePoints.map((p, i) => (
                    <li key={i} className="text-white/60 text-sm flex gap-2">
                      <span className="text-red-400">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
