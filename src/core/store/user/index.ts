import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { constant } from '../../constant';

import { User, UserRole, UserStatus } from '../../models/user';
import { userThunk } from './thunks';

export interface UserState extends User {
    isLogin: boolean;
}

const initialState: UserState = {
    email: '',
    name: '',
    id: '',
    createDate: '',
    updateDate: '',
    googleId: '',
    password: '',
    role: UserRole.ADMIN || UserRole.USER,
    status: UserStatus.ACTIVE,
    isLogin: false,
    imageUrl: '',
};

const reducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: () => ({ ...initialState }),
        updateLogin: (state) => ({ ...state, isLogin: true }),
    },
    extraReducers: (builder) => {
        builder.addCase(userThunk.getCurrentUser.fulfilled, (state, { payload }) => {
            return { ...state, ...payload, isLogin: true };
        });
        builder.addCase(userThunk.getCurrentUser.rejected, (state) => {
            const cookies = new Cookies();
            cookies.set(constant.TOKEN_COOKIE_KEY, '', { maxAge: -999 });

            return { ...state, isLogin: true };
        });
    },
});
export const userActions = {
    ...reducer.actions,
};
export const userReducer = reducer.reducer;
