/**
 * In this challenge, you must sort all ads by their price (cheapest first). If some of them
 * have the same price, you should sort by their title alphabetically (A to Z)
 *
 * @param ads Unsorted list of ads
 * @returns Sorted list of ads
 */

// ↓ uncomment bellow lines and add your response!
export default function ({ ads }: { ads: Ad[] }): Ad[] {
  return ads.sort((adA, adB) => {
    // prix differents
    const diff = adA.price - adB.price;
    if (diff) return diff;

    // prix identiques
    return adA.title.localeCompare(adB.title);
  });
}

// used interfaces, do not touch
export interface Ad {
  title: string;
  price: number;
  tags: string[];
}
