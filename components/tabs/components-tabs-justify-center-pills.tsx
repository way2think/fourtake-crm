'use client';
// import PanelCodeHighlight from '@/components/panel-code-highlight';
import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import ComponentsAuthLoginForm from '../auth/components-auth-login-form';

const ComponentsTabsJustifyCenterPills = () => {
    // const [isMounted, setIsMounted] = useState(false);
    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

    return (
        <div className="mb-5">
            {/* {isMounted && ( */}
            <Tab.Group>
                <Tab.List className="mt-3 flex flex-wrap justify-center space-x-2 rtl:space-x-reverse">
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? 'w-40  bg-[#005fbe] text-white !outline-none' : ''}
                                                    -mb-[1px] block w-40 rounded p-3.5 py-2 before:inline-block hover:bg-[#005fbe] hover:text-white`}
                            >
                                Employee
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? ' w-40 bg-[#005fbe] text-white !outline-none ' : ''}
                                                    -mb-[1px] block w-40 rounded p-3.5 py-2 before:inline-block hover:bg-[#005fbe] hover:text-white`}
                            >
                                Client
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <div className="active pt-5">
                            <ComponentsAuthLoginForm type="employee" />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div>
                            <ComponentsAuthLoginForm type="client" />
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            {/* )} */}
        </div>
    );
};

export default ComponentsTabsJustifyCenterPills;
