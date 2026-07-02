export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  createdAt: Date;
};

export type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  imageUrl?: string | null;
  categoryId: number;
  category?: Category;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
};