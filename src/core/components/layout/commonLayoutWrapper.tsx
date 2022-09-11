import * as React from 'react';

interface CommonLayoutWrapperProps extends React.PropsWithChildren {}

export const CommonLayoutWrapper: React.FC<CommonLayoutWrapperProps> = ({ children }) => {
    return (
        <div className="m-auto max-w-7xl">
            <>{children}</>
        </div>
    );
};
