import { Product } from '../../../../core/models/product';

export interface ProductDetailFilterDTO extends Pick<Product, 'id'> {}
