import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useStoreApi } from '../../store';

interface FormSuccessMessageProps {}

export const FormSuccessMessage: React.FC<FormSuccessMessageProps> = () => {
    const { message = '' } = useStoreApi();

    return <>{Boolean(message) && <div>{message}</div>}</>;
};
