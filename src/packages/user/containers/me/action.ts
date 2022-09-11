import { http } from '../../../../core/api';
import { User } from '../../../../core/models/user';

export interface EditProfileDto extends Pick<User, 'name' | 'phone'> {}

export const updateProfile = async (input: EditProfileDto) => {
    const res = await http.put('/user', input);
    return res;
};
