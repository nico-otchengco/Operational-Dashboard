export const dlTxt = (txt: string, fname: string) => {
  const blob = new Blob([txt], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fname;
  a.click();

  URL.revokeObjectURL(url);
};
