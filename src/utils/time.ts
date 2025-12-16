export const getStartDate = (range: "24h" | "30d" | "90d") => {
  const now = new Date();

  switch (range) {
    case "24h":
      now.setHours(now.getHours() - 24);
      break;
    case "30d":
      now.setDate(now.getDate() - 30);
      break;
    case "90d":
      now.setDate(now.getDate() - 90);
      break;
  }

  return now.toISOString();
};
