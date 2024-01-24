export interface Shoe {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  discount: number;
  images: string[];
  category: string;
  sizes: number[];
  colors: string[];
  gender: string;
  isNewArrival: boolean;
  isBestSeller: boolean;
}