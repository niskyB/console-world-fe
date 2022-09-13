import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormErrorMessage, FormWrapper, TextField } from '../../../../core/components/form';
import { ChangePasswordDto, userChangePassword } from './action';

interface PasswordProps {}

const defaultValues: ChangePasswordDto = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

export const ChangePassword: React.FunctionComponent<PasswordProps> = () => {
    const methods = useForm<ChangePasswordDto>({ defaultValues });

    const _handleOnSubmit = async (data: ChangePasswordDto) => {
        try {
            await userChangePassword(data);
            toast.success('Change Password Success!');
        } catch (err) {
            toast.error('Change Password Fail!');
        }
    };

    return (
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <FormWrapper methods={methods}>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Change Password</h3>
                <FormErrorMessage />
                <form className="pt-8 space-y-6" onSubmit={methods.handleSubmit(_handleOnSubmit)}>
                    <TextField label="Password" name="currentPassword" type="password" />
                    <TextField label="New Password" name="newPassword" type="password" />
                    <TextField label="Confirm Password " name="confirmNewPassword" type="password" />
                    <FormErrorMessage />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </FormWrapper>
        </div>
    );
};
