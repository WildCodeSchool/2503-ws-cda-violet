/**
 * In this challenge, you have to add a list of tags to each category (based on
 * ad tags in the category). Duplicate tags for one category is not permitted. Tags
 * must me sorted alphabatically. Categories order, ads order and ads tags order must remain
 * untouched.
 *
 * @param categories List of categories without tags, but with ads
 * @returns List of categories with a new prop tags
 */
// ↓ uncomment bellow lines and add your response!
export default function ({
  categories,
}: {
  categories: Category[];
}): CategoryWithTags[] {
  //pr chq categorie
  return categories.map((category) => {
    // je cree une liste de tags viode
    let allTags: string[] = [];
    // j'ajoute une liste de tags triés et uniques
    // pour chaque annonce
    category.ads.map((ad) => {
      // je regarde tous les tags existants dans l'annonce: ad.tags
      // ajouter les tags à allTags
      const unorderedTags = ad.tags;
      allTags.push(...unorderedTags);
      //return new Set(unorderedTags)
    });

    return { ...category, tags: [...new Set(allTags.sort())] };
  });
  // ne pas canger l'ordre

  // return categories.map((category) => {
  //   const unSortedTags = category.ads.reduce((acc, ad) => {
  //     return [...acc, ...ad.tags];
  //   }, [] as string[]);
  //   const categoryTags = [...new Set(unSortedTags.sort())];
  //   return { ...category, tags: categoryTags };
  // });
}

// used interfaces, do not touch
interface Ad {
  title: string;
  price: number;
  tags: string[];
}

export interface Category {
  ads: Ad[];
  name: string;
}

export interface CategoryWithTags extends Category {
  tags: string[];
}
