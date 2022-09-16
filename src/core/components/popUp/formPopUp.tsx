import { XMarkIcon } from '@heroicons/react/20/solid';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { store } from '../../store';
import { apiActions } from '../../store/api';
import { FormErrorMessage, FormWrapper } from '../form';
import { PopUpTextField } from '../form/popUpTextField';

export interface FormPopUpProps {
    id: string;
    title: string;
    willOpen: boolean;
    formPopUpFields: FormPopUpField[];
    handleSubmit: (data: any, id?: string) => Promise<any>;
    setIsOpening: (value: boolean) => void;
}

export interface FormPopUpField {
    name: string;
    label: string;
    isRequired?: boolean;
    defaultValue?: string;
}

const defaultValues: any = {};

function FormPopUp({ id, title, willOpen, formPopUpFields, handleSubmit, setIsOpening }: FormPopUpProps) {
    const [formFields, setFormFields] = React.useState<FormPopUpField[]>([]);
    const methods = useForm<any>({ defaultValues });
    const [errors, setErrors] = React.useState<any>({});

    React.useEffect(() => {
        setIsOpening(willOpen);
        setFormFields(formPopUpFields);
        formFields.forEach((field) => {
            methods.setValue(field.name, field.defaultValue || '');
        });
    }, [willOpen, formPopUpFields]);

    if (willOpen)
        return (
            <>
                <div className="fixed z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <div className="w-full px-4 py-10 bg-white shadow sm:rounded-lg sm:px-10 min-w-[400px] relative">
                        <div className="z-50 space-y-5">
                            <div className="flex flex-col space-y-4">
                                <p className="text-lg font-semibold">{title}</p>
                                <FormWrapper methods={methods}>
                                    <form
                                        onSubmit={methods.handleSubmit(async (data) => {
                                            const res = await handleSubmit(data, id);
                                            if (!res) setIsOpening(false);
                                            else {
                                                setErrors(res.data);
                                            }
                                            store.dispatch(apiActions.updateErrorDetails({}));
                                        })}
                                    >
                                        {formFields.map((field) => (
                                            <PopUpTextField
                                                key={field.name}
                                                label={field.label}
                                                name={field.name}
                                                isRequired={field.isRequired}
                                                error={errors[field.name]}
                                            />
                                        ))}
                                        <FormErrorMessage />
                                        <div className="flex justify-end space-x-2 mt-9">
                                            <button
                                                onClick={() => {
                                                    setIsOpening(false);
                                                    setErrors({});
                                                }}
                                                type="button"
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Cancel
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
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                setIsOpening(false);
                                setErrors({});
                            }}
                            className="absolute w-5 h-5 text-gray-500 cursor-pointer right-5 top-5"
                        >
                            <XMarkIcon />
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => {
                        setIsOpening(false);
                        setErrors({});
                    }}
                    className="fixed top-0 left-0 z-10 w-screen h-screen cursor-pointer bg-gray-900/50"
                ></div>
            </>
        );

    return <></>;
}

export default FormPopUp;
