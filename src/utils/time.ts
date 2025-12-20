export const getStartDate = (range: "7d" | "30d" | "90d") => {
  const now = new Date();

  switch (range) {
    case "7d":
      now.setDate(now.getDate() - 7);
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
