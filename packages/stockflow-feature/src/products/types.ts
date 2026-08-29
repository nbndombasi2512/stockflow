export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  category: string;
  unit: string;
  reorderThreshold: number | null;
  imageUrl: string | null;
  archived: boolean;
  createdAt: string;
}
