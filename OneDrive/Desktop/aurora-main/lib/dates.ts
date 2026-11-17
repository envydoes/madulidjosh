export const isISODate = (s: unknown): s is string =>
  typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));

export const nightsBetween = (a: string, b: string) =>
  Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

// Today in the resort's timezone, as YYYY-MM-DD
export const todayManila = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' });
