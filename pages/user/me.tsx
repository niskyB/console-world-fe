import * as React from 'react';
import { RouterProtectionWrapper } from '../../src/core/components/routerProtection';
import { UserMe } from '../../src/packages/user/containers/me';
import { UserRole } from '../../src/core/models/user';
import { StoreLayout } from '../../src/packages/store/components/storeLayout';

interface UserMePageProps {}

const UserMePage: React.FC<UserMePageProps> = () => {
    return (
        <RouterProtectionWrapper acceptRoles={[UserRole.USER]}>
            <StoreLayout>
                <UserMe />
            </StoreLayout>
        </RouterProtectionWrapper>
    );
};

export default UserMePage;
