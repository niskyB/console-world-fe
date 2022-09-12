import * as React from 'react';
import { AllRole } from '../../src/core/models/user';

import { RouterProtectionWrapper } from '../../src/core/components/routerProtection';
import { ChangePassword } from '../../src/packages/user/containers/changePassword';
import { StoreLayout } from '../../src/packages/store/components/storeLayout';

interface PasswordPageProps {}

const PasswordPage: React.FunctionComponent<PasswordPageProps> = () => {
    return (
        <RouterProtectionWrapper acceptRoles={AllRole}>
            <StoreLayout>
                <ChangePassword />
            </StoreLayout>
        </RouterProtectionWrapper>
    );
};

export default PasswordPage;
