import Link from 'next/link';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormWrapper, TextField } from '../../../../core/components/form';
import { toast } from 'react-toastify';
import { useStoreUser } from '../../../../core/store';
import { EditProfileDto, updateProfile } from './action';
import { routes } from '../../../../core/routes';

const defaultValues: EditProfileDto = {
    name: '',
    phone: '',
};

interface UserMeProps {}

export const UserMe: React.FC<UserMeProps> = () => {
    const methods = useForm<EditProfileDto>({ defaultValues });
    const userState = useStoreUser();

    React.useEffect(() => {
        if (userState.id) {
            methods.setValue('name', userState.name);
            methods.setValue('phone', userState.phone);
        }
    }, [userState, methods]);

    const _handleOnSubmit = async (data: EditProfileDto) => {
        try {
            await updateProfile(data);
            toast.success('Update profile success!');
        } catch (err) {
            toast.error('Update Profile fail!');
        }
    };

    return (
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <FormWrapper methods={methods}>
                <form className="space-y-6" onSubmit={methods.handleSubmit(_handleOnSubmit)}>
                    <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Email
                                    </label>
                                    <p>{userState.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                            </div>
                            <TextField label="Name" name="name" />
                            <TextField label="Phone Number" name="phone" />
                            <FormErrorMessage />
                            <div className="mt-4 space-y-2">
                                <div className="flex-shrink-0">
                                    <Link href={routes.changePasswordUrl}>
                                        <p className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500 w-fit">Change Password</p>
                                    </Link>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link href="#">
                                        <p className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500 w-fit">Manage Address</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </FormWrapper>
        </div>
    );
};
