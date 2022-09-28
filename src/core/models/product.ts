import { SystemType } from '../common/interface';

export interface ProductCategory extends SystemType<string> {}
export interface Product {
    id: string;
    name: string;
    briefInfo: string;
    details: string;
    thumbnailUrl: string;
    createdAt: string;
    updatedAt: string;
    isShow: boolean;
    category: ProductCategory;
    isFeature: boolean;
    price: number;
}
