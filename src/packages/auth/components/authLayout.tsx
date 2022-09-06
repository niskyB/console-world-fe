import * as React from 'react';

interface AuthLayoutProps extends React.PropsWithChildren {}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return <div>{children}</div>;
};
