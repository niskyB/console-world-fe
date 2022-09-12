import * as React from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useStoreUser } from '../../../../core/store';
import { useRouter } from 'next/router';
import { routes } from '../../../../core/routes';
import { UserRole } from '../../../../core/models/role';
import { logout } from './action';

interface NavigationProps {}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
const NAV_LINK = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Contact', link: '/contact' },
    { label: 'Product', link: '/product' },
];
const COMMON_ACTION_LINK = [{ label: 'your profile', link: routes.meUrl }];

const GUEST_SELECTION = [
    { label: 'Sign in', link: routes.loginUrl },
    { label: 'Register', link: routes.registerUrl },
];

export const Navigation: React.FunctionComponent<NavigationProps> = () => {
    const router = useRouter();
    const userState = useStoreUser();
    const [popUp, setPopUp] = React.useState<boolean>(false);
    const _onLogout = async () => {
        const res = await logout();
        if (res) window.location.reload();
    };
    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex px-2 lg:px-0">
                                <Link href={routes.homeUrl} passHref>
                                    <div className="flex flex-shrink-0 items-center">
                                        <img className="block w-auto h-full" src="/asset/images/icon/logo-image.png" alt="" />
                                        <img className="block w-auto h-full " src="/asset/images/icon/logo-text.png" alt="" />
                                    </div>
                                </Link>
                                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                                    {NAV_LINK.map((item) => (
                                        <Link href={item.link} key={item.label}>
                                            <a
                                                className={`${
                                                    router.pathname === item.link
                                                        ? 'border-indigo-500 text-gray-900'
                                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                                } inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 `}
                                            >
                                                {item.label}
                                            </a>
                                        </Link>
                                    ))}
                                    {/* {userState.role !== UserRole.USER && (
                                        <Link href={'/dashBoardLink'}>
                                            <a
                                                className={`${'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 `}
                                            >
                                                Dashboard
                                            </a>
                                        </Link>
                                    )} */}
                                </div>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                                <div className="w-full max-w-lg lg:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex items-center">
                                {userState.id && userState.role === UserRole.USER && (
                                    <div
                                        onClick={() => setPopUp(true)}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Deposit
                                    </div>
                                )}
                                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                    {/* Profile dropdown */}
                                    {userState.id ? (
                                        <Menu as="div" className="relative flex-shrink-0 ml-4">
                                            <div>
                                                <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    <img
                                                        className="w-8 h-8 rounded-full"
                                                        src={userState.imageUrl ? userState.imageUrl : '/asset/images/avatar/default-avatar.png'}
                                                        alt="avatar"
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 w-48 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="flex flex-col font-semibold text-white bg-orange-500 cursor-none">
                                                        <p className={'block px-4 py-2 text-sm  capitalize cursor-pointer '}>
                                                            Hello, {userState.name}
                                                        </p>
                                                        {/* {balance !== null && balance != undefined && (
                                                            <p className={'block px-4 py-2 text-sm  capitalize cursor-pointer '}>
                                                                Balance: {vietnamCurrencyConverter(balance)}
                                                            </p>
                                                        )} */}
                                                    </div>
                                                    {COMMON_ACTION_LINK.map((item) => (
                                                        <Menu.Item key={item.label}>
                                                            {({ active }) => (
                                                                <Link href={item.link}>
                                                                    <a
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm text-gray-700 capitalize'
                                                                        )}
                                                                    >
                                                                        {item.label}
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                    {/* {userState.role.description === UserRole.CUSTOMER &&
                                                        CUSTOMER_ACTION_LINK.map((item) => (
                                                            <Menu.Item key={item.label}>
                                                                {({ active }) => (
                                                                    <Link href={item.link}>
                                                                        <a
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm text-gray-700 capitalize'
                                                                            )}
                                                                        >
                                                                            {item.label}
                                                                        </a>
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        ))} */}

                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <div
                                                                onClick={() => _onLogout()}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block hover:bg-gray-100 px-4 cursor-pointer py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                Sign out
                                                            </div>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    ) : (
                                        <Link href={routes.loginUrl} passHref>
                                            <a
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Login
                                            </a>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="lg:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {NAV_LINK.map((item) => (
                                <Link passHref key={item.label} href={item.link}>
                                    <Disclosure.Button
                                        as="a"
                                        className={`block py-2 pl-3 pr-4 text-base font-medium text-gray-600 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 ${
                                            router.pathname === item.link && 'bg-indigo-50 border-indigo-500 text-indigo-700 capitalize'
                                        }`}
                                    >
                                        {item.label}
                                    </Disclosure.Button>
                                </Link>
                            ))}
                        </div>
                        <div className="pt-4 pb-2 border-t border-gray-200">
                            {userState.id ? (
                                <>
                                    <div className="flex items-center px-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={userState.imageUrl ? userState.imageUrl : '/asset/images/default-avatar.png'}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">{userState.name}</div>
                                            <div className="text-sm font-medium text-gray-500">{userState.email}</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-1">
                                        {/* {CUSTOMER_ACTION_LINK.map((item) => (
                                            <Link href={item.link} key={item.label} passHref>
                                                <a
                                                    className={`block w-full px-4 py-2 text-base font-medium text-left text-gray-500 hover:text-gray-800 hover:bg-gray-100 ${
                                                        router.asPath === item.link && 'bg-indigo-50 text-indigo-500'
                                                    }`}
                                                >
                                                    {item.label}
                                                </a>
                                            </Link>
                                        ))} */}

                                        <div
                                            onClick={() => _onLogout()}
                                            className="block px-4 py-2 text-base font-medium text-left text-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {GUEST_SELECTION.map((item) => (
                                        <Link key={item.label} href={item.link} passHref>
                                            <div
                                                className={`block cursor-pointer py-2 pl-3 pr-4 text-base font-medium text-gray-600 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 ${
                                                    item.link === router.pathname && 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                                }`}
                                            >
                                                {item.label}
                                            </div>
                                        </Link>
                                    ))}
                                </>
                            )}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};
