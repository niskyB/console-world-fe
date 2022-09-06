import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useStoreApi } from '../../store';

interface FormErrorMessageProps {}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = () => {
    const { errorMessage = '' } = useStoreApi();

    return <>{Boolean(errorMessage) && <div>{errorMessage}</div>}</>;
};
