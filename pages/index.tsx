import type { NextPage } from 'next';
import { useForm, FormProvider } from 'react-hook-form';

// --- components
import { FormWrapper } from '../src/core/components/form';
import { FormErrorMessage } from '../src/core/components/form/formErrorMessage';
import { TextField } from '../src/core/components/form/textField';
import { RadioField } from '../src/core/components/form/radioField';
import { SelectField } from '../src/core/components/form/selectField';
import Link from 'next/link';

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
            <FormWrapper methods={methods}>
                {/* <TextField name="username" label="Username" /> */}
                <TextField name="username" label="Username" type="file" />
                <RadioField
                    name="hello"
                    label="test"
                    values={[
                        { label: 'test', value: '23' },
                        { label: 'tes3t', value: '24' },
                    ]}
                />
                <FormErrorMessage />
                <SelectField
                    name="lll"
                    label="test"
                    values={[
                        { label: 'test', value: '23' },
                        { label: 'tes3t', value: '24' },
                    ]}
                />
            </FormWrapper>

            <h1 className="text-3xl font-bold underline">{process.env.MY_ENV}</h1>
            <Link href={'/auth/login'} passHref>
                <a type="button" className="inline-flex items-center px-4 py-2 text-sm font-semibold border-2 rounded-md shadow-sm">
                    Login
                </a>
            </Link>
        </div>
    );
};

export default Home;
