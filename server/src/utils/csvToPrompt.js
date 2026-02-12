export function csvToPrompt(data, maxRows = 15) {
  const headers = Object.keys(data[0]);
  const rows = data.slice(0, maxRows);

  let text = `Columns: ${headers.join(", ")}\n\nSample rows:\n`;

  rows.forEach((row, i) => {
    text += `${i + 1}. ${headers.map(h => row[h]).join(" | ")}\n`;
  });

  return text;
}
