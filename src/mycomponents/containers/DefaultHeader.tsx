import { Fragment, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";

import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
    HeartIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {AuthReducerActionType, IAuthReducerState} from "../auth/login/AuthReducer.ts";
import {useNavigate} from "react-router-dom";
import DropdownUser from "../tailwind/DropdownUser.tsx";

const colors = ['bg-gray-100', 'bg-green-100', 'bg-yellow-100', 'bg-blue-100', 'bg-white', 'bg-red-100', 'bg-green-100', 'bg-gray-200'];

const products = [
    { name: 'Black', description: 'Start with the classics', href: '/tea/Black', icon: HeartIcon },
    { name: 'Green', description: 'Rich in antioxidants', href: '/tea/Green', icon: HeartIcon },
    { name: 'Yellow', description: 'Sunny shade of happiness', href: '/tea/Yellow', icon: HeartIcon },
    { name: 'Oolong', description: 'Unbeatable balance of yellow and red', href: '/tea/Oolong', icon: HeartIcon },
    { name: 'White', description: 'Minimal processing', href: '/tea/White', icon: HeartIcon },
    { name: 'Puerh', description: 'Source of feelings', href: '/tea/Puerh', icon: HeartIcon },
    { name: 'Matcha', description: 'Green trend', href: '/tea/Matcha', icon: HeartIcon },
    { name: 'All', description: 'No limitations', href: '/tea/All', icon: HeartIcon },
];

const callsToAction = [
    { name: 'savor the elite culture', href: '#', icon: PlayCircleIcon }

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const {isAuth, user} = useSelector((redux: any)=>redux.auth as IAuthReducerState)



    return (
        <header className="bg-white dark:">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-8 w-auto" src="../../../public/icon.png" alt="" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            Tea
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {products.map((item, index) => (
                                        <div
                                            key={item.name}
                                            className={`group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 
                    hover:bg-gray-50 ${colors[index % colors.length]}`}
                                            style={{ marginBottom: index === products.length - 1 ? 0 : '10px' }}
                                        >
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                            </div>
                                            <div className="flex-auto">
                                                <a href={item.href} className="block font-semibold text-gray-900">
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                </a>
                                                <p className="mt-1 text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}



                                </div>
                                <div className="grid  divide-x divide-gray-900/5 bg-gray-50">
                                    {callsToAction.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Culture
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Our Philosophy
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Reviews
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Contacts
                    </a>
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isAuth ? (
                        // If authenticated, show Logout
                        <div className="gap-5 hidden lg:flex lg:flex-1 lg:justify-end">

                            <DropdownUser></DropdownUser>


                        </div>
                    ) : (
                        // If not authenticated, show Login
                        <div className="gap-5 hidden lg:flex lg:flex-1 lg:justify-end">
                            <a href="/register" className="text-sm font-semibold leading-6 text-gray-900">
                                Sign Up <span aria-hidden="true"></span>
                            </a>
                        <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                            Log In <span aria-hidden="true">&rarr;</span>
                        </a>


                        </div>
                    )}
                </div>

            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="../../../public/icon.png"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Tea
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {products.map((item, index) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className={`block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 
                    ${colors[index % colors.length]} 
                    text-gray-900 hover:bg-gray-300`}
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Culture
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Our Philosophy
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Reviews
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Contacts
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log In
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
