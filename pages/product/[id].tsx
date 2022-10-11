import { NextPage, NextPageContext } from 'next';
import { ProductDetail } from '../../src/packages/product/container/productDetail';
import { ProductDetailFilterDTO } from '../../src/packages/product/container/productDetail/interface';
import { StoreLayout } from '../../src/packages/store/components/storeLayout';

interface ProductDetailPageProps extends ProductDetailFilterDTO {}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ id }) => {
    return (
        <StoreLayout>
            <ProductDetail id={id} />
        </StoreLayout>
    );
};

ProductDetailPage.getInitialProps = async (ctx: NextPageContext): Promise<ProductDetailPageProps> => {
    let props = {
        id: ctx.query?.id || '',
    } as ProductDetailPageProps;
    return props;
};

export default ProductDetailPage;
