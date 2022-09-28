import * as React from 'react';
import { Navigation } from './navigation';

interface StoreLayoutProps extends React.PropsWithChildren {}

export const StoreLayout: React.FC<StoreLayoutProps> = ({ children }) => {
    return (
        <>
            <div className="flex flex-col w-full h-full min-h-screen bg-gray-200">
                <Navigation />
                <div className="flex-1 p-5 ">
                    <div className="w-full mx-auto max-w-7xl">{children}</div>
                </div>
            </div>
        </>
    );
};
