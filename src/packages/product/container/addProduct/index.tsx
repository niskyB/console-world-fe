import * as React from 'react';
import { useForm } from 'react-hook-form';
import { store } from '../../../../core/store';
import { apiActions } from '../../../../core/store/api';
import { useProductCategoriesFieldData } from '../../../../core/common/dataField/productCategory';
import { toast } from 'react-toastify';
import { AddProductDTO } from './interface';
import { unsetFieldData } from '../../../../core/common/dataField/unset';
import { addProduct } from './action';
import { FormWrapper, SelectField, TextField, QuillInput, FileField } from '../../../../core/components/form';
import { FeatureFieldData } from '../../../../core/common/dataField/feature';
import { TextareaField } from '../../../../core/components/form/textareaField';
import Link from 'next/link';
import { routes } from '../../../../core/routes';
import { RedStar } from '../../../store';
interface AddProductProps {}
const defaultValues: AddProductDTO = {
    category: '',
    briefInfo: '',
    details: '',
    image: null,
    name: '',
};
export const AddProductProps: React.FunctionComponent<AddProductProps> = () => {
    const methods = useForm<AddProductDTO>({
        defaultValues,
    });
    const [previewThumbnailUrl, setPreviewThumbnailUrl] = React.useState<string>('');
    const [thumbnailFile, setThumbnailFile] = React.useState<File | null>(null);
    const [details, setDetails] = React.useState<string>('');

    const { productCategoriesFieldData } = useProductCategoriesFieldData();

    const _handleOnSubmit = async (data: AddProductDTO) => {
        if (thumbnailFile) data.image = thumbnailFile;
        if (details) data.details = details;

        //call api here
        addProduct(data).then(() => {
            methods.reset();
            setPreviewThumbnailUrl('');
            setThumbnailFile(null);
            setDetails('');

            store.dispatch(apiActions.resetState());
            toast.success('Add new product success!');
        });
    };

    return (
        <FormWrapper methods={methods}>
            <form onSubmit={methods.handleSubmit(_handleOnSubmit)} className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Add new product</h3>
                            <p className="max-w-2xl mt-1 text-sm text-gray-500">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                        </div>

                        <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                            <TextField name="name" label="Name" direction="row" />

                            <SelectField label="Category" name="category" values={[unsetFieldData, ...productCategoriesFieldData]} direction="row" />

                            <SelectField label="Feature" name="isFeature" values={[unsetFieldData, ...FeatureFieldData]} direction="row" />

                            <TextareaField label="Brief Info" name="briefInfo" direction="row" />

                            <QuillInput label="Description" description={details} setDescription={setDetails} direction="row" />

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <div className="flex justify-start space-x-2">
                                    <label htmlFor="Thumbnail" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                        Thumbnail
                                    </label>

                                    <RedStar />
                                </div>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <FileField
                                        label=""
                                        name="image"
                                        setFile={setThumbnailFile}
                                        file={thumbnailFile}
                                        previewUrl={previewThumbnailUrl}
                                        setPreviewUrl={setPreviewThumbnailUrl}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <Link href={routes.adminProductListUrl} passHref>
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                        </Link>

                        <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </FormWrapper>
    );
};

export default AddProductProps;
