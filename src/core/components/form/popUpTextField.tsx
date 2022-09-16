import * as React from 'react';
import { useFormContext } from 'react-hook-form';

interface PopUpTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    isRequired?: boolean;
    error: string;
}

export const PopUpTextField: React.FC<PopUpTextFieldProps> = ({ name, label, isRequired = true, error, ...rest }) => {
    const { register } = useFormContext();

    return (
        <div>
            <div>
                {label && (
                    <label htmlFor={name} className="inline-block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                {isRequired && (
                    <p className="inline text-red-500" id="require">
                        {' '}
                        *
                    </p>
                )}
            </div>
            <div className="mt-1">
                <input
                    {...register(name)}
                    {...rest}
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {error && <div className="text-red-500">{error}</div>}
            </div>
        </div>
    );
};
