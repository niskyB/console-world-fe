import * as React from 'react';

interface CommonLayoutWrapperProps extends React.PropsWithChildren {}

export const CommonLayoutWrapper: React.FC<CommonLayoutWrapperProps> = ({ children }) => {
    return (
        <div className="m-auto max-w-full">
            <>{children}</>
        </div>
    );
};
