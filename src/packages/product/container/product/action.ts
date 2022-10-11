import * as querystring from 'querystring';
import { http } from '../../../../core/api';
import { ProductsFilterDTO } from './interface';

export const productsFilter = async (input: ProductsFilterDTO) => {
    const { currentPage, ...rest } = input;
    const data = { currentPage: currentPage - 1 >= 0 ? currentPage - 1 : 0, ...rest };
    const res = await http.get(`/products?${new URLSearchParams(data).toString()}`);
    return res;
};
