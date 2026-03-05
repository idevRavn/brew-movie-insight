# 🎬 Brew Movie Insight

AI-powered movie detail and sentiment analysis

## Live Demo

[Brew Movie Insight](https://brew-movie-insight.vercel.app/)

## Website Preview

![Brew Movie Insight Preview](/preview/web_preview.png)

## What it does

Enter any IMDb movie ID and get:

- Movie title, poster, cast, rating, genre, director and plot
- AI-generated audience sentiment analysis
- Sentiment classification — positive / mixed / negative
- Visual audience score

## Tech Stack

- **Next.js** — Frontend and backend
- **Tailwind CSS** — Styling
- **TMDB API** — Movie data
- **Groq API** — AI sentiment analysis
- **Vercel** — Deployment

## Setup

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/idevRavn/brew-movie-insight
cd brew-movie-insight
npm install
```

2. Create `.env.local` in the root:

```
TMDB_API_KEY=your_omdb_key
GROQ_API_KEY=your_groq_key
```

3. Run locally:

```bash
npm run dev
```

Open **http://localhost:3000** in your browser to view the site.
