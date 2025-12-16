import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ insight: "No prompt provided" }),
        { headers: corsHeaders }
      );
    }


    const insight = `
    You are a Principal Site Reliability Engineer (SRE) reviewing live API traffic metrics.

Context:
- This data comes from a production API system.
- Assume traffic is real and customer-facing.
- Your goal is to provide operationally useful insights.

Time Window: ${range}

Metrics:
- Total requests: ${totalReq}
- Average requests per interval: ${avgReq}
- Traffic trend: ${trend}

Instructions:
1. Assess system health based strictly on the metrics
2. Identify risks or early warning signals
3. Suggest concrete, actionable improvements
4. Highlight what to monitor next

Constraints:
- Do NOT explain what the metrics mean
- Do NOT give generic advice
- Do NOT mention AI, models, or uncertainty
- Use concise bullet points
- Assume the reader is an engineer

Output format:
- Start with a one-line system assessment
- Follow with bullet points grouped by:
  • Observations
  • Risks
  • Recommendations
    `.trim();

    return new Response(
      JSON.stringify({ insight }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ insight: "AI generation failed", error: String(e) }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});
