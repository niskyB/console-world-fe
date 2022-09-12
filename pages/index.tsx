import type { NextPage } from 'next';
import { useForm, FormProvider } from 'react-hook-form';

// --- components
import { FormWrapper } from '../src/core/components/form';
import { FormErrorMessage } from '../src/core/components/form/formErrorMessage';
import { TextField } from '../src/core/components/form/textField';
import { RadioField } from '../src/core/components/form/radioField';
import { SelectField } from '../src/core/components/form/selectField';
import Link from 'next/link';
import { routes } from '../src/core/routes';
import { Navigation } from '../src/packages/store/container/navigation';
import { StoreLayout } from '../src/packages/store/components/storeLayout';

interface TestDto {
    username: string;
    hello: string;
    lll: string;
}

const defaultValues: TestDto = {
    username: '',
    hello: '24',
    lll: '24',
};

const Home: NextPage = () => {
    return <StoreLayout></StoreLayout>;
};

export default Home;
