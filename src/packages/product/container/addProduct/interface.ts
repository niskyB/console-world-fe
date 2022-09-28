import { Product } from '../../../../core/models/product';

export interface AddProductDTO extends Pick<Product, 'details' | 'briefInfo' | 'name'> {
    category: string;
    image: File | null;
}
