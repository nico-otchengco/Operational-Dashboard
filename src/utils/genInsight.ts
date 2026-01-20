
type Trend = "up" | "down" | "flat";

interface InsightInput {
  range: string;
  totalReq: number;
  avgReq: number;
  trend: Trend;
  errPct: number;
  rows: { reqCnt: number }[];
}

export const generateInsight = ({
  range,
  totalReq,
  avgReq,
  trend,
  errPct,
  rows,
}: InsightInput) => {
  const insights: string[] = [];

  /* ------------------------------
    Human-like summary
  -------------------------------*/
  insights.push(
    `Over the selected ${range} window, the platform handled ${totalReq.toLocaleString()} total requests, averaging ${avgReq.toLocaleString()} requests per interval.`
  );

  if (trend === "up") {
    insights.push(
      "Traffic volume shows a clear upward trajectory, suggesting increased user engagement or system activity."
    );
  } else if (trend === "down") {
    insights.push(
      "A downward trend in traffic was observed, which may indicate reduced usage or seasonal behavior."
    );
  } else {
    insights.push(
      "Request volume remained largely stable, indicating consistent system usage."
    );
  }

  /* ------------------------------
     Anomaly detection
  -------------------------------*/
  let anomalyDetected = false;

  if (rows.length > 3) {
    const values = rows.map(r => r.reqCnt);
    const max = Math.max(...values);
    const min = Math.min(...values);

    if (max > avgReq * 1.8) {
      anomalyDetected = true;
      insights.push(
        "A significant traffic spike was detected during the period, which may require capacity review."
      );
    }

    if (min < avgReq * 0.4) {
      anomalyDetected = true;
      insights.push(
        "An unusually low traffic interval was observed, potentially indicating downtime or reduced demand."
      );
    }
  }

  if (errPct > 5) {
    anomalyDetected = true;
    insights.push(
      `Error rates reached ${errPct.toFixed(
        2
      )}%, exceeding normal operational thresholds and warranting investigation.`
    );
  } else {
    insights.push(
      `System error rate remained low at ${errPct.toFixed(
        2
      )}%, indicating healthy request handling.`
    );
  }

  /* ------------------------------
     Confidence score
  -------------------------------*/
  let confidence = 70;

  if (rows.length > 10) confidence += 10;
  if (!anomalyDetected) confidence += 10;
  if (trend !== "flat") confidence += 5;

  confidence = Math.min(confidence, 95);

  return {
    text: insights.join(" "),
    confidence,
    anomalyDetected,
  };
};
