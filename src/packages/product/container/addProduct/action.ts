import { http } from '../../../../core/api';
import { FormParser, SendFormRequestConfig } from '../../../../core/util/form';
import { AddProductDTO } from './interface';

export const addProduct = async (input: AddProductDTO) => {
    const form = FormParser(input);
    const res = await http.post('/postproduct', form, SendFormRequestConfig());

    return res;
};
