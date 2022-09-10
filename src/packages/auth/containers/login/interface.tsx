import { User } from '../../../../core/models/user';

export interface AuthLoginDto extends Pick<User, 'username' | 'password'> {}
