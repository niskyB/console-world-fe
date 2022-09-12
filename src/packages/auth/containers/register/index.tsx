import * as React from 'react';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormWrapper, TextField } from '../../../../core/components/form';
import { authRegister, AuthRegisterDto } from './action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { routes } from '../../../../core/routes';
import { store } from '../../../../core/store';
import { apiActions } from '../../../../core/store/api';
import Link from 'next/link';

const defaultValues: AuthRegisterDto = {
    password: '',
    email: '',
    confirmPassword: '',
    name: '',
};

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
    const router = useRouter();
    const methods = useForm<AuthRegisterDto>({
        defaultValues,
    });

    React.useEffect(() => {
        store.dispatch(apiActions.resetState());
        return () => {};
    }, []);

    const _handleOnSubmit = async (data: AuthRegisterDto) => {
        const res = await authRegister(data);
        if (res) {
            toast.success('Sign up success!');
            router.push(routes.loginUrl);
        }
    };

    return (
        <FormWrapper methods={methods}>
            <FormErrorMessage />
            <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">Register</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={methods.handleSubmit(_handleOnSubmit)}>
                            <TextField label="Email" name="email" />
                            <TextField label="Name" name="name" />
                            <TextField label="Password" name="password" type="password" />
                            <TextField label="Confirm Password" name="confirmPassword" type="password" />
                            <div className="flex flex-col items-center space-y-4">
                                <button
                                    type="submit"
                                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-600 hover:to-blue-700 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Register
                                </button>
                                <div className="space-x-1 text-sm">
                                    <span className="">Already have an account?</span>
                                    <Link href={routes.loginUrl}>
                                        <a className="font-medium text-indigo-600 underline hover:text-indigo-500">Login here</a>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </FormWrapper>
    );
};
