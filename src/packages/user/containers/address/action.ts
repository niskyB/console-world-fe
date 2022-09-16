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

export const updateUserAddress = async (id: string, data: UserAddressDto) => {
    const res = await http.put(`/address/${id}`, data);
    return res.data;
};

export const setDefaultUserAddress = async (id: string) => {
    const res = await http.put(`/address/${id}`);
    return res.data;
};

export const deleteUserAddress = async (id: string) => {
    const res = await http.delete(`/address/${id}`);
    return res;
};
