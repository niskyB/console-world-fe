import { NextPage } from 'next';
import * as React from 'react';
import { RouterProtectionWrapper } from '../../src/core/components/routerProtection';
import { UserRole } from '../../src/core/models/user';
import { StoreLayout } from '../../src/packages/store/components/storeLayout';
import { UserAddress } from '../../src/packages/user';

interface UserAddressProps {}

const UserMePage: NextPage<UserAddressProps> = () => {
    return (
        <RouterProtectionWrapper acceptRoles={[UserRole.USER]}>
            <StoreLayout>
                <UserAddress />
            </StoreLayout>
        </RouterProtectionWrapper>
    );
};

export default UserMePage;
