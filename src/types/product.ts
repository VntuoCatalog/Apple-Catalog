export type ProductColor = {
  name: string;
  hex: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  category: "iPhone";
  name: string;
  year: number;
  colors: ProductColor[];
  capacities: string[];
  chip: string;
  modelNumbers: string[];
  introduction: string;
  heroImage: string;
};
