import { Product } from '../../../../core/models/product';

export interface ProductsFilterDTO extends Pick<Product, 'name' | 'isSale'> {
    currentPage: number;
    minPrice: number;
    maxPrice: number;
    pageSize: number;
    order: string;
    categories?: string[];
}
