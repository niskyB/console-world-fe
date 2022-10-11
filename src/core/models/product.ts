import { ProductCategory } from './productCategory';
export interface Product {
    id: string;
    name: string;
    description: string;
    details: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    imageUrl: string;
    quantity: number;
    isSale: boolean;
    categories?: ProductCategory[];
}
