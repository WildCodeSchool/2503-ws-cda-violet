export type Category = {
  id: number;
  title: string;
};

export type Tag = {
  id: number;
  title: string;
};

export type AdDetails = {
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: string;
  category: Category;
  tags: Tag[];
};
