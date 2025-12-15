export const getStartDate = (range: "24h" | "30d" | "90d") => {
  const d = new Date();
  const days =
    range === "24h" ? 1 :
    range === "30d" ? 30 : 90;

  d.setDate(d.getDate() - days);
  return d.toISOString();
};
