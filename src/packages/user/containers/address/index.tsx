import { DevicePhoneMobileIcon, MapPinIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormErrorMessage, FormWrapper, TextField } from '../../../../core/components/form';
import { Address } from '../../../../core/models/address';
import { routes } from '../../../../core/routes';
import { addUserAddress, getListUserAddress, UserAddressDto, deleteUserAddress } from './action';

interface AddressProps {}

const defaultValues: UserAddressDto = {
    location: '',
    phone: '',
};

export const UserAddress: React.FunctionComponent<AddressProps> = () => {
    const methods = useForm<UserAddressDto>({ defaultValues });
    const [addresses, setAddresses] = React.useState<Address[]>([]);

    const fetchApi = () => {
        getListUserAddress()
            .then((res) => {
                if (addresses.length !== 0 || res.length !== 0) setAddresses(res);
            })
            .catch((err) => {
                if (err.status >= 500) toast.error('Something went wrong!');
            });
    };

    React.useEffect(() => {
        fetchApi();
    }, []);

    const _handleOnDelete = async (id: string) => {
        try {
            await deleteUserAddress(id);
            fetchApi();
            toast.success('Delete Address Success!');
        } catch (err) {
            toast.error('Delete Address Fail!');
        }
    };

    const _handleOnSubmit = async (data: UserAddressDto) => {
        try {
            await addUserAddress(data);
            fetchApi();
            toast.success('Add Address Success!');
        } catch (err) {
            toast.error('Add Address Fail!');
        }
    };

    return (
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <FormWrapper methods={methods}>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Address</h3>
                <FormErrorMessage />
                <form className="pt-8 space-y-6" onSubmit={methods.handleSubmit(_handleOnSubmit)}>
                    <TextField label="Location" name="location" type="text" />
                    <TextField label="Phone Number" name="phone" type="text" />
                    <FormErrorMessage />
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <Link href={routes.meUrl}>Back To Profile</Link>
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </FormWrapper>
            <h3 className="my-4 text-2xl font-medium leading-6 text-gray-900">Your Addresses</h3>
            <div className="space-y-4">
                {addresses.map((item) => (
                    <div key={item.id} className="flex">
                        <dd className="flex-1 text-sm text-gray-900">
                            <ul role="list" className="border border-gray-200 divide-y divide-gray-200 rounded-md">
                                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex items-center flex-1 w-0">
                                        <MapPinIcon className="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
                                        <span className="flex-1 w-0 ml-2 truncate">{item.location}</span>
                                    </div>
                                </li>
                                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex items-center flex-1 w-0">
                                        <DevicePhoneMobileIcon className="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
                                        <span className="flex-1 w-0 ml-2 truncate">{item.phone}</span>
                                    </div>
                                </li>
                            </ul>
                        </dd>
                        <div className="h-full my-auto ml-4">
                            <p className="block font-medium text-center text-indigo-600 cursor-pointer hover:text-indigo-500">Edit</p>
                            <p onClick={() => _handleOnDelete(item.id)} className="block font-medium text-red-600 cursor-pointer hover:text-red-500">
                                Delete
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
