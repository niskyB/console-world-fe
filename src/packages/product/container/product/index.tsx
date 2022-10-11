import Link from 'next/link';
import * as React from 'react';
import { Product } from '../../../../core/models/product';
import { productsFilter } from './action';
import { ProductsFilterDTO } from './interface';

interface ProductListProps extends ProductsFilterDTO {}

export const ProductList: React.FunctionComponent<ProductListProps> = ({
    name,
    minPrice,
    pageSize,
    maxPrice,
    currentPage,
    order,
    categories,
    isSale,
}) => {
    const [products, setProduct] = React.useState<Product[]>([]);
    const [count, setCount] = React.useState<number>(0);

    //dung useMemo de tao ra 1 object moi khi cac props thay doi
    //ko lam thay doi dia chi cua object
    const filterParams = React.useMemo<ProductsFilterDTO>(() => {
        return { name, minPrice, pageSize, maxPrice, currentPage, order, categories, isSale };
    }, [name, minPrice, pageSize, maxPrice, currentPage, order, categories, isSale]);

    //neu lam nhu nay se lam thay doi dia chi cua 1 object lien tuc, dung useMemo de tao ra 1 object moi khi cac props thay doi va ko lam thay doi dia chi cua object
    // const filterParams = { name, minPrice, pageSize, maxPrice, currentPage, order, categories, isSale };
    React.useEffect(() => {
        productsFilter(filterParams).then((res) => {
            setProduct(res.data.data);
            setCount(res.data.count);
        });
    }, [filterParams]);

    React.useEffect(() => {
        console.log('Product', products);
        console.log('Count', count);
    }, [products, count]);
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-xl font-bold text-gray-900">Console / Game Store</h2>

                <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((products) => (
                        <div key={products.id}>
                            <div className="relative">
                                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                    <img src={products.imageUrl} alt={products.name} className="h-full w-full object-cover object-center" />
                                </div>
                                <div className="relative mt-4">
                                    <Link href={`product/${products.id}`}>
                                        <h3 className="text-sm font-medium text-gray-900 cursor-pointer">{products.name}</h3>
                                    </Link>
                                    <p className="mt-1 text-sm text-gray-500">{products.description}</p>
                                </div>
                                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                                    <p className="relative text-lg font-semibold text-white">{products.price} $</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <a
                                    // href={products.href}
                                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200 cursor-pointer"
                                >
                                    Add to bag<span className="sr-only">, {products.name}</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
