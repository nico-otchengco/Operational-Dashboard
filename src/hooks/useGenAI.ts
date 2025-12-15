import { useState, useCallback } from "react";

export const useGenAI = (prompt: string) => {
  const [insight, setInsight] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const gen = async () => {
    setIsLoading(true);

    const res = await fetch(
      "https://eqiphbamlogoyfbdeytp.functions.supabase.co/gen-insight",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SB_ANON_KEY}`,
          apikey: import.meta.env.VITE_SB_ANON_KEY,
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!res.ok) throw new Error("Failed to generate insight");

    const json = await res.json();
    setInsight(json.insight);
    setIsLoading(false);
  };

  return { gen, insight, isLoading };
};
