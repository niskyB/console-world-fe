import * as querystring from 'querystring';
import { http } from '../../../../core/api';
import { ProductDetailFilterDTO } from './interface';

export const productDetailFilter = async (input: ProductDetailFilterDTO) => {
    const { id } = input;
    const res = await http.get(`/product/${id}`);
    return res;
};
