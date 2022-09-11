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
    const methods = useForm({
        defaultValues,

        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    return (
        <div>
            <Navigation />
            <Link href={routes.loginUrl} passHref>
                <a type="button" className="inline-flex items-center px-4 py-2 text-sm font-semibold border-2 rounded-md shadow-sm">
                    Login
                </a>
            </Link>
        </div>
    );
};

export default Home;
