export default function normalizeCityName(name: string): string {
  return name
    .toLowerCase()
    .replace("г. ", "")
    .replace("г.", "")
    .replace("город ", "")
    .replace(/^мр\.?\s*|мо\.?\s*|мун\.?обл\.?\s*|округ\s*/i, "")
    .replace(/мр\.?|мо\.?|мун\.?обл\.?|округ\s*$/i, "")
    .trim();
}
