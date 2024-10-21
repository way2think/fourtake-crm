'use client';
// import PanelCodeHighlight from '@/components/panel-code-highlight';
import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import ComponentsAuthLoginForm from '../auth/components-auth-login-form';
import TimeSheet from '../attendence/TimeSheet';
import ListAttendanceTable from '../attendence/ListAttendanceTable';
import TimeOffRequestTable from '../attendence/TimeOffRequestTable';

const TabsAttendence = () => {
    // const [isMounted, setIsMounted] = useState(false);
    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

    return (
        <div className="mb-5">
            {/* {isMounted && ( */}
            <Tab.Group>
                <Tab.List className="mt-3 flex flex-wrap justify-start space-x-2 border-b border-[#bbb] rtl:space-x-reverse">
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? 'rounded-none  border-b-2 border-[#005fbe] text-[#005fbe]  !outline-none' : ''}
                                                    -mb-[1px] block  rounded p-3.5 py-2 before:inline-block hover:border-[#005fbe] hover:text-[#005fbe]`}
                            >
                                Time Sheet
                            </button>
                        )}
                    </Tab>
                    <Tab as={Fragment}>
                        {({ selected }) => (
                            <button
                                className={`${selected ? '  rounded-none  border-b-2 border-[#005fbe] text-[#005fbe] !outline-none ' : ''}
                                                    -mb-[1px] block  rounded p-3.5 py-2 before:inline-block hover:border-[#005fbe] hover:text-[#005fbe] `}
                            >
                                Time-off Request
                            </button>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <div className="active pt-5">
                            <TimeSheet />
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="pt-5">
                            <TimeOffRequestTable />
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
            {/* )} */}
        </div>
    );
};

export default TabsAttendence;
