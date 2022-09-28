import { SelectionFieldValues } from '../interface';
import { useGetList } from '../hooks';
import { ProductCategory } from '../../models/product';
import { ApiListRoutes } from '../enum';

export const useProductCategoriesFieldData = () => {
    const { list } = useGetList<ProductCategory, null>(ApiListRoutes.PRODUCTS_CATEGORIES);
    const productCategoriesFieldData: SelectionFieldValues<string>[] = list.map((category) => ({ label: category.description, value: category.id }));
    return { productCategoriesFieldData };
};
