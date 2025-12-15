export const toCsv = (rows: any[]) => {
  if (!rows.length) return "";

  const hdr = Object.keys(rows[0]).join(",");
  const body = rows.map(r =>
    Object.values(r).join(",")
  );

  return [hdr, ...body].join("\n");
};
