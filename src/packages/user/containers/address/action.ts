import { http } from '../../../../core/api';

export interface UserAddressDto {
    location: string;
    phone: string;
}

export const addUserAddress = async (input: UserAddressDto) => {
    const res = await http.post('/address', input);
    return res.data;
};

export const getListUserAddress = async () => {
    const res = await http.get('/address');
    return res.data;
};
