'use client';
import IconHome from '@/components/icon/icon-home';
import IconPhone from '@/components/icon/icon-phone';
import IconUser from '@/components/icon/icon-user';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

const DashboardCheck = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="mb-5">
            <div className="flex items-center justify-start">
                <img src="/assets/images/korea.png" alt="" style={{ maxWidth: '6%' }} className="mr-2" />
                <h2 className="text-2xl font-bold">North Korea</h2>
            </div>
            {isMounted && (
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light bg-[#005fbe] dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? 'border-b !border-secondary font-bold text-[#fff] !outline-none' : ''}
                                                    -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block`}
                                >
                                    Requirment
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? 'border-b !border-secondary font-bold  text-[#fff] !outline-none' : ''}
                                                -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block `}
                                >
                                    Visa Fee
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? 'border-b !border-secondary font-bold text-[#fff]  !outline-none' : ''}
                                                -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block`}
                                >
                                    Consulat
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <h4 className="mb-4 mt-4  p-2 text-xl font-semibold text-[#005fbe]">Business Visa</h4>
                            <div className="active p-3 pt-5">
                                <h4 className="mb-4 text-xl font-semibold">Judiciary</h4>
                                <ul>
                                    <li className="mb-4 ">
                                        {' '}
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </li>
                                    <li className="mb-4">
                                        {' '}
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </li>
                                </ul>
                                <h4 className="mb-4 text-xl font-semibold">Disclaimer</h4>

                                <ul>
                                    <li className="mb-4 ">
                                        {' '}
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </li>
                                    <li className="mb-4">
                                        {' '}
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </li>
                                </ul>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className=" p-3 pt-5">
                                <h4 className="mb-4 text-xl font-semibold">Disclaimer</h4>
                                <ul>
                                    <li className="mb-4 ">
                                        {' '}
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </li>
                                    <li className="mb-4">
                                        {' '}
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </li>
                                </ul>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className=" p-3 pt-5">
                                <h4 className="mb-4 text-xl font-semibold">Disclaimer</h4>
                                <ul>
                                    <li className="mb-4 ">
                                        {' '}
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </li>
                                    <li className="mb-4">
                                        {' '}
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </li>
                                </ul>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>Disabled</Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            )}
        </div>
    );
};

export default DashboardCheck;
