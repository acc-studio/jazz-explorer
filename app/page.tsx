"use client";

import { useState } from "react";
import { getRecommendations } from "./actions";
import InputEngine from "@/components/InputEngine";
import ListeningDeck from "@/components/ListeningDeck";
import { Album } from "@/types/jazz";

export default function Home() {
  const [step, setStep] = useState<"input" | "results">("input");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Album[]>([]);

  const handleSearch = async (taste: string) => {
    setLoading(true);
    // Artificial delay for dramatic effect if API is too fast
    // In production, remove the delay, but for jazz apps, "slowness" is sometimes "luxury"
    const data = await getRecommendations(taste);
    
    // Fallback mock data if API fails or no key provided (for testing)
    if (!data || data.length === 0) {
       console.warn("Using fallback data");
       // Insert the Mock Data from the prompt here if needed for testing
    } else {
       setResults(data);
    }
    
    setLoading(false);
    setStep("results");
  };

  return (
    <main className="min-h-screen bg-jazz-void">
      {step === "input" ? (
        <InputEngine onSubmit={handleSearch} isLoading={loading} />
      ) : (
        <ListeningDeck albums={results} onReset={() => setStep("input")} />
      )}
    </main>
  );
}