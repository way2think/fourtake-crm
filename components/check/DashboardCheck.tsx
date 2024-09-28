'use client';
import IconHome from '@/components/icon/icon-home';
import IconPhone from '@/components/icon/icon-phone';
import IconUser from '@/components/icon/icon-user';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { stateCityData } from '@/utils/constant';
import { VisaType } from '@/entities/visa-type.entity';
import { useGetVisaRequirementsQuery } from '@/services/api/dashboardSlice';
import { useRouter } from 'next/navigation';
import parse from 'html-react-parser';
import { showMessage } from '@/utils/notification';
import CountrySearchDropdown from '../Reusable/country-selector/CountrySearchDropdown';
import { useGetCountryVisaTypesQuery } from '@/services/api/cms/countryVisaTypeSlice';
import EmailSendModal from '../lead-management/lead-manage/EmailSendModal';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user.store';

const DashboardCheck = () => {
    const router = useRouter();
    const [queryParams, setQueryParams] = useState({
        countryId: '',
        visaTypeId: '',
        stateOfResidence: '',
    });

    const [checkData, setCheckData] = useState({
        state_of_residence: '',
        destination_country: '',
        visa_type: '',
    });

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    let countryId, visaTypeId, stateOfResidence, urlSearchParams;

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
    const [isOpenMail, setIsOpenMail] = useState(false);
    const [mailDetails, setMailDetails] = useState({
        name: '',
        email: '',
        cc: '',
        visa_checklist: '',
        additional_info: '',
    });

    const { data: visaRequirements } = useGetVisaRequirementsQuery({
        countryId: queryParams.countryId,
        visaTypeId: queryParams.visaTypeId,
        stateOfResidence: queryParams.stateOfResidence,
    });
    console.log('visaRequirement ', visaRequirements);
    const { data: countryVisaTypes } = useGetCountryVisaTypesQuery({ page: 0, limit: 0 });

    const user = useSelector(selectUser);

    const role = user?.role || 'guest';

    const visaChecklistItems =
        visaRequirements && visaRequirements.length > 0 ? `${visaRequirements[0]?.checklist || ''} ${visaRequirements[0]?.fee == null || '' ? '' : visaRequirements[0]?.fee}` : '';

    useEffect(() => {
        // Ensure the code runs client-side
        if (typeof window !== 'undefined') {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            setQueryParams({
                countryId: urlParams.get('countryId') || '',
                visaTypeId: urlParams.get('visaTypeId') || '',
                stateOfResidence: urlParams.get('stateOfResidence') || '',
            });

            setCheckData({
                destination_country: urlParams.get('countryId') || '',
                visa_type: urlParams.get('visaTypeId') || '',
                state_of_residence: urlParams.get('stateOfResidence') || '',
            });
        }
    }, [window.location.href]);
    useEffect(() => {
        if (visaRequirements) {
            const visaChecklist =
                visaRequirements && visaRequirements.length > 0 ? `${visaRequirements[0]?.checklist || ''} ${visaRequirements[0]?.fee == null || '' ? '' : visaRequirements[0]?.fee}` : '';
            setAddData({ ...addData, visa_checklist: visaChecklist });
        }
    }, [visaRequirements]);

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setCheckData({
            ...checkData,
            [id]: value,
        });
    };

    const handleSubmitChecklist = () => {
        if (checkData.state_of_residence == '') {
            showMessage('Select State', 'error');
        }
        if (checkData.visa_type == '') {
            showMessage('Select Visa Type', 'error');
        }
        if (checkData.destination_country == '') {
            showMessage('Select Country', 'error');
        }

        // Update the URLs
        const newUrl = `/check-requirements?countryId=${checkData.destination_country}&visaTypeId=${checkData.visa_type}&stateOfResidence=${checkData.state_of_residence}`;
        router.push(newUrl);

        // Force page reload with the new URL
        window.location.href = newUrl; //

        // Form is valid, handle the form submission here
        //alert('Form submitted successfully');
        showMessage('Form submitted successfully.');
    };

    const sanitizeHtmlString = (htmlString: any) => {
        // Replace escaped characters with normal ones (optional)
        if (typeof htmlString !== 'string') {
            // If it's not a string, try converting it to a string
            console.log('not a string');
            htmlString = String(htmlString);
        }
        return htmlString
            .replace(/\\r\\n/g, '') // Remove newlines
            .replace(/\\"/g, '"'); // Unescape quotes
    };

    // if (visaRequirements) {
    //     console.log('parse(visaRequirements?.[0]?.fee)', visaRequirements?.[0]?.fee, '1', sanitizeHtmlString(visaRequirements?.[0]?.fee));
    // }

    return (
        <>
            <div className="mb-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <h2 className="text-2xl font-bold">{visaRequirements?.[0]?.country?.name}</h2>
                    </div>

                    <div className="dropdown mb-5 mr-5">
                        <CountrySearchDropdown
                            addData={checkData}
                            setAddData={setCheckData}
                            //  handleEmbassyChange={handleEmbassyChange}
                            items={countryVisaTypes?.items}
                            setVisaTypes={setVisaTypes}
                            heading="I am going to"
                            title="destination_country"
                        />
                    </div>

                    <div className="dropdown mb-5 mr-5">
                        <label htmlFor="visa_type" style={{ width: '100px' }}>
                            Visa Type
                        </label>
                        <select
                            className="form-input"
                            defaultValue=""
                            id="visa_type"
                            value={checkData?.visa_type}
                            // disabled={role == 'employee' ? true : false}
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option value="" disabled={true}>
                                Visa Type
                            </option>
                            {visaTypes.map((visaType: VisaType) => (
                                <option key={visaType.id} value={visaType.id}>
                                    {visaType.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="dropdown mb-5 mr-1">
                        <label htmlFor="state_of_residence"> Select State</label>
                        <select className="form-input" defaultValue="" id="state_of_residence" value={checkData?.state_of_residence} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Select State
                            </option>

                            {states.map((state) => (
                                <option value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <button type="button" className="btn btn-primary ltr:ml-2 rtl:mr-4" onClick={handleSubmitChecklist}>
                        Submit
                    </button>
                    {role === 'super_admin' && (
                        <>
                            <div className="mb-5 mr-1">
                                <label htmlFor="mail">Email</label>
                                <input id="mail" type="mail" placeholder="Enter Email" className="form-input" />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                onClick={() => {
                                    setIsOpenMail(true);
                                    setAddData({ ...addData, visa_checklist: visaChecklistItems });
                                }}
                            >
                                Send
                            </button>
                        </>
                    )}
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
                                        Requirement
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
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'border-b-2 !border-[#005fbe] bg-[#fff] font-bold text-[#005fbe] !outline-none' : ''}
                                                -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block`}
                                    >
                                        Processing Time
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'border-b-2 !border-[#005fbe] bg-[#fff] font-bold text-[#005fbe] !outline-none' : ''}
                                                -mb-[1px] flex items-center border-transparent p-5 py-3 before:inline-block`}
                                    >
                                        Holidays
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <h4 className="mb-1 mt-5  pb-2 text-3xl font-bold text-[#005fbe]">{visaRequirements?.[0]?.visa_type?.name}</h4>
                                <div className="active pb-3 pt-3">
                                    {/* <h4 className="mb-1 text-xl font-semibold">Document Checklist</h4> */}
                                    <div>{typeof visaRequirements?.[0]?.checklist == 'string' && parse(visaRequirements?.[0]?.checklist)}</div>
                                    <h4 className="mb-4 mt-5 text-xl font-semibold">Judiciary</h4>
                                    <ul>
                                        <li className="mb-4 ">{visaRequirements?.[0]?.embassy_vfs?.[0]?.jurisdiction?.join()}</li>
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
                                    <h4 className="mb-4 text-xl font-semibold">Fee Details</h4>
                                    {/* <div style={{ border: '1px solid grey' }}> */}
                                    {typeof visaRequirements?.[0]?.fee === 'string' && parse(sanitizeHtmlString(visaRequirements?.[0]?.fee))}

                                    {/* </div> */}

                                    <h4 className="my-4 text-xl font-semibold">Disclaimer</h4>
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
                                    <h4 className="mb-4 text-xl font-semibold">{visaRequirements?.[0]?.embassy_vfs?.[0]?.name}</h4>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full table-auto rounded-lg border border-gray-300 bg-white">
                                            {/* <caption className="p-4 text-left text-lg font-semibold">{visaRequirements?.[0]?.embassy_vfs?.[0]?.name}</caption> */}
                                            <tbody>
                                                <tr className="border-b">
                                                    <th className="w-1/4 bg-gray-100 p-3 text-left font-semibold">Name</th>
                                                    <td className="p-3">{visaRequirements?.[0]?.embassy_vfs?.[0]?.name}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <th className="bg-gray-100 p-3 text-left font-semibold">Address</th>
                                                    <td className="p-3"> {visaRequirements?.[0]?.embassy_vfs?.[0]?.address}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <th className="bg-gray-100 p-3 text-left font-semibold">City</th>
                                                    <td className="p-3">{visaRequirements?.[0]?.embassy_vfs?.[0]?.city}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <th className="bg-gray-100 p-3 text-left font-semibold">Country</th>
                                                    <td className="p-3">India</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <th className="bg-gray-100 p-3 text-left font-semibold">Telephone</th>
                                                    <td className="p-3">{visaRequirements?.[0]?.embassy_vfs?.[0]?.phone}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <th className="bg-gray-100 p-3 text-left font-semibold">Fax</th>
                                                    <td className="p-3">{visaRequirements?.[0]?.embassy_vfs?.[0]?.fax}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <th className="bg-gray-100 p-3 text-left font-semibold">Email</th>
                                                    <td className="p-3">{visaRequirements?.[0]?.embassy_vfs?.[0]?.email}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <th className="bg-gray-100 p-3 text-left font-semibold">Submission Details</th>
                                                    <td className="p-3">{visaRequirements?.[0]?.embassy_vfs?.[0]?.submission_details}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <th className="bg-gray-100 p-3 text-left font-semibold">Collection Details</th>
                                                    <td className="p-3">{visaRequirements?.[0]?.embassy_vfs?.[0]?.collection_details}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <th className="bg-gray-100 p-3 text-left font-semibold">Processing Time</th>
                                                    <td className="p-3">{visaRequirements?.[0]?.embassy_vfs?.[0]?.processing_time}</td>
                                                </tr>
                                                <tr>
                                                    <th className="bg-gray-100 p-3 text-left font-semibold">Jurisdiction</th>
                                                    <td className="p-3">{visaRequirements?.[0]?.embassy_vfs?.[0]?.jurisdiction?.join()}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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
                                <div className="mt-3">
                                    <h4 className="text-2xl">Processing Time</h4>
                                    <p>{visaRequirements?.[0]?.embassy_vfs?.[0]?.processing_time}</p>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="mt-3">
                                    <h4 className="text-2xl">Holidays</h4>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                )}
            </div>
            <EmailSendModal isOpen={isOpenMail} setIsOpen={setIsOpenMail} addData={queryParams} setAddData={setQueryParams} visaChecklistData={visaRequirements} />
        </>
    );
};

export default DashboardCheck;
