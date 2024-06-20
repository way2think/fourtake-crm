'use client';
import CountryActionModal from '@/components/CMS/countries/CountryActionModal';
import TableLayout from '@/components/layouts/table-layout';
import { showMessage } from '@/utils/notification';

import Swal from 'sweetalert2';
import VisaApplicationTabs from './Visa-application-tabs';

import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

const ListVisaApplication: React.FC<{ listapplication: any }> = ({ listapplication }) => {
    const [data, setData] = useState(listapplication);
    const exportColumns = ['id', 'applydate', 'refno', 'apptype', 'applname', 'cosultantname', 'destination', 'type', 'duration', 'entry'];
    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'SNo' },
        { accessor: 'country', textAlign: 'left', title: 'Apply Date' },
        { accessor: 'country', textAlign: 'left', title: 'ReferenceNo' },
        { accessor: 'country', textAlign: 'left', title: 'App Type' },
        { accessor: 'country', textAlign: 'left', title: 'Applicant Name' },
        { accessor: 'country', textAlign: 'left', title: 'Consultant Name' },
        { accessor: 'country', textAlign: 'left', title: 'Destination' },
        { accessor: 'country', textAlign: 'left', title: 'Type' },
        { accessor: 'country', textAlign: 'left', title: 'Duration' },
        { accessor: 'country', textAlign: 'left', title: 'Entry' },
        // { accessor: 'phone', textAlign: 'left' },
        // { accessor: 'email', textAlign: 'left' },
        // { accessor: 'address', textAlign: 'left' },
        // {
        //     accessor: 'is_active',
        //     textAlign: 'left',
        //     render: ({ is_active }: { is_active: any }) => {
        //         return is_active;
        //     },
        // },
    ];
    const handleDelete = (row: any) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                setData(data.filter((item: any) => item.id !== row.id));
                Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
                return true;
            }
        });
    };

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = (value: any) => {
        if (value.country == '' || value.country == null) {
            showMessage('Enter country name', 'error');
            return false;
        }
        // if (!isValidName(params.lastname)) {
        //     showMessage('Last Name is required.', 'error');
        //     return true;
        // }
        // if (!isValidEmail(params.email)) {
        //     showMessage('Invalid Email.', 'error');
        //     return true;
        // }
        // if (params.center == '') {
        //     showMessage('Select Center', 'error');
        //     return true;
        // }

        // if (params.phone?.length < 0 || params.phone?.length > 10) {
        //     showMessage('Invalid phone number', 'error');
        //     return true;
        // }
        // if (!isValidPassword(params.password)) {
        //     showMessage('Password must be at least 6 characters long and include at least 1 number, 1 symbol, and 1 uppercase letter', 'error');
        //     return true;
        // }
        // if (!isValidPassword(params.confirmpassword)) {
        //     showMessage('Confirm Password must be at least 6 characters long and include at least 1 number, 1 symbol, and 1 uppercase letter', 'error');
        //     return true;
        // }
        // if (params.password !== params.confirmpassword) {
        //     showMessage('Passwords must match', 'error');
        //     return true;
        // }
        // if (params.designation === '') {
        //     showMessage('Designation is required.', 'error');
        //     return true;
        // }

        // if (params.address == '') {
        //     showMessage('Enter Address', 'error');
        //     return true;
        // }

        if (value.id) {
            //update user
            let formData: any = data.find((d: any) => d.id === value.id);
            formData.country = value.country;
            formData.language = value.language;
            formData.dailingcode = value.dailingcode;
            formData.capital = value.capital;
            formData.cities = value.cities;
            formData.countrydetails = value.countrydetails;
            formData.climate = value.climate;
            formData.currency = value.currency;
            formData.timezone = value.timezone;
            formData.additionalinfo = value.additionalinfo;
            formData.website = value.website;
            formData.ispopular = value.ispopular;
            formData.isoutsource = value.isoutsource;
            formData.isjurisdiction = value.isjurisdiction;
            formData.image = value.image;
            formData.flag = value.flag;

            return formData;
        } else {
            //add user
            let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

            let formData = {
                id: +maxUserId + 1,
                country: value.country,
                language: value.language,
                dailingcode: value.dailingcode,
                capital: value.capital,
                cities: value.cities,
                countrydetails: value.countrydetails,
                climate: value.climate,
                currency: value.currency,
                timezone: value.timezone,
                additionalinfo: value.additionalinfo,
                website: value.website,
                ispopular: value.ispopular,
                isoutsource: value.isoutsource,
                isjurisdiction: value.isjurisdiction,
                image: value.image,
                flag: value.flag,
            };
            setData([...data, formData]);
            return formData;

            //   searchContacts();
        }

        // showMessage('User has been saved successfully.');
        // setAddContactModal(false);
        // setIsEdit(false);
    };

    return (
        <>
            <div className="mb-5">
                {isMounted && (
                    <Tab.Group>
                        <Tab.List className="mt-3 flex flex-wrap">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-primary text-white !outline-none' : ''}
                                                    ' -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}
                                    >
                                        All
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}
                                    >
                                        Group
                                    </button>
                                )}
                            </Tab>
                            {/* <Tab as={Fragment}>
                            {({ selected }) => (
                                <button className={`${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block rounded p-3.5 py-2 hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`}>
                                    Contact
                                </button>
                            )}
                        </Tab> */}
                            {/* <Tab className="pointer-events-none -mb-[1px] block rounded p-3.5 py-2 text-white-light dark:text-dark">Disabled</Tab> */}
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="active pt-5">
                                    <TableLayout
                                        title="List Visa Application "
                                        setData={setData}
                                        filterby="country"
                                        handleDelete={handleDelete}
                                        data={data}
                                        totalPages={data?.length || 0}
                                        tableColumns={tableColumns}
                                        exportColumns={exportColumns}
                                        ActionModal={CountryActionModal}
                                        handleSubmit={handleSubmit}
                                    />
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <div>
                                    <div className=" pt-5">
                                        <div className="flex-auto">Group</div>
                                    </div>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                )}
            </div>
        </>
    );
};

export default ListVisaApplication;
