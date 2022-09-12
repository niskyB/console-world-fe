import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useStoreApi } from '../../store';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    isRequired?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({ name, label, isRequired = true, ...rest }) => {
    const { errorDetails } = useStoreApi();
    const { register } = useFormContext();
    return (
        <div>
            <div>
                <label htmlFor={name} className="inline-block text-sm font-medium text-gray-700">
                    {label}
                </label>
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
                {errorDetails[name] && <div className="text-red-500">{errorDetails[name]}</div>}
            </div>
        </div>
    );
};
