import { NextPage, NextPageContext } from 'next';
import { ProductList } from '../../src/packages/product/container/product';
import { ProductsFilterDTO } from '../../src/packages/product/container/product/interface';
import { StoreLayout } from '../../src/packages/store/components/storeLayout';

interface ProductListPageProps extends ProductsFilterDTO {}
//Next Page cho thuc hien truyen param trong nextjs

const ProductListPage: NextPage<ProductListPageProps> = ({ currentPage, pageSize, name, order, categories, isSale, minPrice, maxPrice }) => {
    return (
        <StoreLayout>
            <ProductList
                currentPage={currentPage}
                pageSize={pageSize}
                name={name}
                order={order}
                categories={categories}
                isSale={isSale}
                minPrice={minPrice}
                maxPrice={maxPrice}
            />
        </StoreLayout>
    );
};

//getInitialProps chay dau tien de lay param tu url
ProductListPage.getInitialProps = async (ctx: NextPageContext): Promise<ProductListPageProps> => {
    let props = {
        currentPage: ctx.query?.currentPage || 1,
        pageSize: ctx.query?.pageSize || 12,
        name: ctx.query?.name || '',
        order: ctx.query?.order || 'DESC',
        categories: ctx.query?.categories || [],
        isSale: ctx.query?.isSale || true,
        minPrice: ctx.query?.minPrice || 1,
        maxPrice: ctx.query?.maxPrice || 1000,
    } as ProductListPageProps;
    return props;
};

export default ProductListPage;
