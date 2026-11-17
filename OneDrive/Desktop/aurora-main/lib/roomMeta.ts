// Presentation details that live in code (images/features); name, price and text live in the DB.
const META: Record<string, { image: string; features: string[] }> = {
  '1 Bed Room': { image: '/images/1bed.jpg', features: ['1 Double Bed', 'Air Conditioning', 'Private Bathroom', 'Free WiFi'] },
  '2 Bed Room': { image: '/images/2bed.jpg', features: ['2 Double Beds', 'Air Conditioning', 'Private Bathroom', 'Mountain View'] },
  '3 Bed Room': { image: '/images/3bed.jpg', features: ['3 Double Beds', 'Air Conditioning', 'Private Bathroom', 'Ocean View'] },
};
export const metaFor = (name: string) => META[name] ?? { image: '/images/1bed.jpg', features: [] };
