import { DevicePhoneMobileIcon, MapPinIcon } from '@heroicons/react/20/solid';
import * as React from 'react';
import { UserAddressDto } from '../action';
import { Address } from '../../../../../core/models/address';
import FormPopUp from '../../../../../core/components/popUp/formPopUp';

interface AddressProps {
    address: Address;
    onSubmit: (data: UserAddressDto, id?: string) => Promise<any>;
    onDelete: (id: string) => void;
}

export const AddressFrom: React.FunctionComponent<AddressProps> = ({ address, onSubmit, onDelete }) => {
    const [isPopUpOpening, setIsPopUpOpening] = React.useState<boolean>(false);

    return (
        <div className="flex flex-1 h-fit">
            <dd className="flex-1 text-sm text-gray-900 ">
                <ul role="list" className="border border-gray-200 divide-y divide-gray-200 rounded-md">
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div className="flex items-center flex-1 w-0 align-middle">
                            <MapPinIcon className="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
                            <span className="flex-1 w-0 ml-2 truncate">{address.location}</span>
                        </div>
                    </li>
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div className="flex items-center flex-1 w-0">
                            <DevicePhoneMobileIcon className="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
                            <span className="flex-1 w-0 ml-2 truncate">{address.phone}</span>
                        </div>
                    </li>
                </ul>
            </dd>
            <div className="flex-col justify-center my-auto ml-4 space-y-6">
                <p
                    onClick={() => setIsPopUpOpening(true)}
                    className="block font-medium text-center text-indigo-600 cursor-pointer hover:text-indigo-500"
                >
                    Edit
                </p>
                <p onClick={() => onDelete(address.id)} className="block font-medium text-red-600 cursor-pointer hover:text-red-500">
                    Delete
                </p>
            </div>
            <FormPopUp
                id={address.id}
                handleSubmit={(data, id) => onSubmit(data, id)}
                title="Edit Your Address"
                willOpen={isPopUpOpening}
                formPopUpFields={[
                    { name: 'location', label: 'Location', isRequired: true, defaultValue: address.location },
                    { name: 'phone', label: 'Phone', isRequired: true, defaultValue: address.phone },
                ]}
                setIsOpening={setIsPopUpOpening}
            />
        </div>
    );
};
