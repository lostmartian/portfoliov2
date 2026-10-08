const DIGITS = "०१२३४५६७८९";

/** 12 -> "१२" */
export function devaNum(n: number | string): string {
  return String(n).replace(/\d/g, (d) => DIGITS[Number(d)]);
}
