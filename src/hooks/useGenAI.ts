import { useState, useCallback } from "react";

const SB_URL = import.meta.env.VITE_SB_URL;
const SB_ANON_KEY = import.meta.env.VITE_SB_ANON_KEY;

export const useGenAI = (prompt: string) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const gen = useCallback(async () => {
    if (!prompt) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${SB_URL}/functions/v1/gen-insight`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SB_ANON_KEY}`,
            "apikey": SB_ANON_KEY,
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`AI failed: ${res.status} – ${text}`);
      }

      const data = await res.json();

      if (!data?.insight) {
        throw new Error("No insight returned from AI");
      }

      setInsight(data.insight);
    } catch (err) {
      console.error("AI Insight Error:", err);
      setInsight(null);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return { gen, insight, isLoading };
};
