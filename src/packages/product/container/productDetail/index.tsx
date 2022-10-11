import * as React from 'react';
import { Product } from '../../../../core/models/product';
import { productDetailFilter } from './action';
import { ProductDetailFilterDTO } from './interface';

import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

interface ProductDetailProps extends ProductDetailFilterDTO {}

const reviews = { average: 4, totalCount: 1624 };

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
export const ProductDetail: React.FunctionComponent<ProductDetailProps> = ({ id }) => {
    const [product, setProduct] = React.useState<Product>({
        id: '',
        name: '',
        description: '',
        details: '',
        price: 0,
        createdAt: '',
        updatedAt: '',
        imageUrl: '',
        isSale: false,
        quantity: 0,
        categories: [],
    });

    const filterParams = React.useMemo<ProductDetailFilterDTO>(() => {
        return { id };
    }, [id]);

    React.useEffect(() => {
        productDetailFilter(filterParams).then((res) => {
            setProduct(res.data);
        });
    }, [filterParams]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:max-w-lg lg:self-end">
                    <div className="mt-4">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
                    </div>

                    <section aria-labelledby="information-heading" className="mt-4">
                        <h2 id="information-heading" className="sr-only">
                            Product information
                        </h2>

                        <div className="flex items-center">
                            <p className="text-lg text-gray-900 sm:text-xl">{product.price} $</p>

                            <div className="ml-4 border-l border-gray-300 pl-4">
                                <h2 className="sr-only">Reviews</h2>
                                <div className="flex items-center">
                                    <div>
                                        <div className="flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    </div>
                                    <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 space-y-6">
                            <div className="text-base text-gray-500">{product.details}</div>
                        </div>

                        <div className="mt-6 flex items-center">
                            <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                            <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                        </div>
                    </section>
                </div>
                {/* Product image */}
                <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
                        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover object-center" />
                    </div>
                </div>
                {/* Product form */}
                <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                    <section aria-labelledby="options-heading">
                        <h2 id="options-heading" className="sr-only">
                            Product options
                        </h2>

                        <form>
                            <div className="mt-4">
                                <a href="#" className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                                    <span>What size should I buy?</span>
                                    <QuestionMarkCircleIcon
                                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </a>
                            </div>
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Add to bag
                                </button>
                            </div>
                            <div className="mt-6 text-center">
                                <a href="#" className="group inline-flex text-base font-medium">
                                    <ShieldCheckIcon
                                        className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <span className="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>
                                </a>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};
