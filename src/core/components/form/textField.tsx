import * as React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    isRequired?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({ name, label, isRequired = true, ...rest }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div>
            <div>
                <label htmlFor={name} className="inline-block text-sm font-medium text-gray-700">
                    {label}
                </label>
                {isRequired && (
                    <p className="inline text-red-500" id="require">
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
                {errors[name]?.message && <div className="text-red-500">{errors[name]?.message}</div>}
            </div>
        </div>
    );
};
