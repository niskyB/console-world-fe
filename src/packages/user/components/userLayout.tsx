import * as React from 'react';

interface UserLayoutProps extends React.PropsWithChildren {}

export const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
    return <div>{children}</div>;
};
