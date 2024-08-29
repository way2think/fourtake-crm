'use client';
import IconHome from '@/components/icon/icon-home';
import IconPhone from '@/components/icon/icon-phone';
import IconUser from '@/components/icon/icon-user';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { stateCityData } from '@/utils/constant';
import { VisaType } from '@/entities/visa-type.entity';

const DashboardCheck = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [addData, setAddData] = useState<any>({
        destination_country: '',
        is_group: false,
        visa_type: '',
        nationality: '75',
        state_of_residence: '',
        visa_duration: '',
        entry_type: '',
        customer_type: '',
        travel_date: '',
    });

    const [states] = useState(Object.keys(stateCityData).sort());
    const [visaTypes, setVisaTypes] = useState([]);

    function handleInputChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className="mb-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                    <img src="/assets/images/korea.png" alt="" style={{ maxWidth: '6%' }} className="mr-2" />
                    <h2 className="text-2xl font-bold">North Korea</h2>
                </div>

                <div className="dropdown mb-5 mr-5">
                    <label htmlFor="state_of_residence"> Select State</label>
                    <select
                        className="form-input"
                        defaultValue=""
                        id="state_of_residence"
                        value={addData?.state_of_residence}
                        onChange={(e) => handleInputChange(e)}
                        // disabled={role == 'employee' ? true : false}
                    >
                        <option value="" disabled={true}>
                            Select State
                        </option>

                        {states.map((state) => (
                            <option value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div className="dropdown mb-5 mr-5">
                    <label htmlFor="visa_type" style={{width: "100px"}}>Visa Type</label>
                    <select
                        className="form-input"
                        defaultValue=""
                        id="visa_type"
                        value={addData?.visa_type?.id}
                        // disabled={role == 'employee' ? true : false}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="" disabled={true}>
                            Visa Type
                        </option>
                        {/* <option value="Business Type">Business Visa</option>
                                <option value="Vistor Visa">Vistor Visa</option> */}
                        {visaTypes.map((visaType: VisaType) => (
                            <option key={visaType.id} value={visaType.id}>
                                {visaType.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="dropdown mb-5 mr-5">
                    <label htmlFor="country">Country</label>
                    <select className="form-input w-48" defaultValue="" id="country">
                        <option value="" disabled={true}>
                            Country
                        </option>
                        <option value="Canada">Canada</option>
                        <option value="India">India</option>
                        <option value="Usa">Usa</option>
                    </select>
                </div>
                <div className="mb-5 mr-5">
                    <label htmlFor="mail">Email</label>
                    <input id="mail" type="mail" placeholder="Enter Email" className="form-input" />
                </div>
                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                    Send
                </button>
            </div>
            {isMounted && (
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light bg-[#005fbe] dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? 'border-b-2 !border-[#005fbe] bg-[#fff] font-bold text-[#005fbe] !outline-none' : ''}
                                                    -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block`}
                                >
                                    Requirment
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? 'border-b-2 !border-[#005fbe] bg-[#fff] font-bold text-[#005fbe] !outline-none' : ''}
                                                -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block `}
                                >
                                    Visa Fee
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? 'border-b-2 !border-[#005fbe] bg-[#fff] font-bold text-[#005fbe] !outline-none' : ''}
                                                -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block`}
                                >
                                    Consulate & VFS
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
