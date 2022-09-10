import * as React from 'react';
import { useStoreApi } from '../../store';

interface FormErrorMessageProps {}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = () => {
    const { errorMessage = '' } = useStoreApi();

    return <>{Boolean(errorMessage) && <div>{errorMessage}</div>}</>;
};
