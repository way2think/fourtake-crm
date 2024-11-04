'use client';
import { useState } from 'react';
import IconSearch from '../icon/icon-search';
import IconUserPlus from '../icon/icon-user-plus';
import { exportToExcel } from '../Reusable/ExportExcel/exportToExcel';
import PaginationTable from '../Reusable/Table/PaginationTable';
import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useMemo } from 'react';
import ComponentsFormsFileUploadSingle from '../Reusable/file-upload/components-forms-file-upload-single';
import ComponentsFormsFileUploadMulti from '../Reusable/file-upload/components-forms-file-upload-multi';
import IconX from '../icon/icon-x';
import ReuseActionModal from '../Reusable/Modal/ActionModal';
import CountryActionModal from '../cms/countries/CountryActionModal';
import IconFile from '../icon/icon-zip-file';
import ComponentsFormDatePickerRange from '../lead-management/lead-manage/components-form-date-picker-range';
import CountView from '../popup/StatusWiseReportCountView';
import { useGetUsersQuery } from '@/services/api/userSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user.store';
import { useGetCentersQuery } from '@/services/api/centerSlice';
import { Center } from '@/entities/center.entity';
import { useGetDailyReportQuery, useLazyGetDailyReportQuery, useLazyGetInScanReportQuery, useLazyGetOutScanReportQuery } from '@/services/api/reportSlice';
import { showMessage } from '@/utils/notification';

interface ReportTableLayoutProps {
    title: string;
    data: object[];
    totalPages: number;
    tableColumns: object[];
    //ActionModal: any;
    Filtersetting?: any;
    handleSubmit?: any;
    exportColumns?: string[];
    handleDelete: any;
    //setData: any;
    //filterby: string;
    formData: {
        input1: string;
        input2: string;
        input3: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReportTableLayout: React.FC<ReportTableLayoutProps> = ({ title, data, totalPages, handleDelete, handleSubmit, tableColumns, exportColumns, Filtersetting, formData, handleChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAction, setIsOpenAction] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [search, setSearch] = useState('');
    const [filterItem, setFilterItem] = useState<any>();
    const [addData, setAddData] = useState<any>();
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [dateFilter, setDateFilter] = useState<any>();
    const [tableData, setTableData] = useState<{ name: string; value: number }[]>([]);
    const [tableDataRight, setTableDataRight] = useState<
        {
            referenceno: string;
            customertype: string;
            applydate: string;
            nationality: string;
            applicationname: string;
            gender: string;
            mobileno: string;
            emailid: string;
            passportno: string;
        }[]
    >([]);

    const { data: assigneeList } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'employee, admin', filter: 'is_active' });
    const currentUser: any = useSelector(selectUser);
    const [triggerGetDailyReport, { data: dailyReportData, isLoading }] = useLazyGetDailyReportQuery();

    const [triggerGetOutScanReport, { data: outScanReportData }] = useLazyGetOutScanReportQuery();

    const [triggerGetInScanReport, { data: inScanReportData }] = useLazyGetInScanReportQuery();

    console.log('inScanReportData', inScanReportData?.items);

    const { data: centers, isError, error } = useGetCentersQuery({ page: 0, limit: 0 });

    console.log('addData in report table', addData);

    // useEffect(() => {
    //     // console.log('datefi', dateFilter);
    //     // if (dateFilter && Object.keys(addData).length === 0) {
    //     //     setFilterItem(dateFilter);
    //     // }
    //     if (dateFilter) {
    //         setFilterItem(dateFilter);
    //     }
    // }, [dateFilter]);

    useEffect(() => {
        if (dailyReportData) {
            const transformedData = dailyReportData.items
                .map((applicants: any) => {
                    return applicants.visa_applicants.map((item: any) => {
                        const { visa_applicants, id, ...rest } = applicants;
                        return { ...item, ...rest, group_id: applicants.id };
                    });
                })
                .flat();
            setFilterItem(transformedData);
        }
    }, [dailyReportData]);

    useEffect(() => {
        if (outScanReportData) {
            const transformedData = outScanReportData.items
                .map((applicants: any) => {
                    return applicants.visa_applicants.map((item: any) => {
                        const { visa_applicants, id, ...rest } = applicants;
                        return { ...item, ...rest, group_id: applicants.id };
                    });
                })
                .flat();
            setFilterItem(transformedData);
        }
    }, [outScanReportData]);

    useEffect(() => {
        if (inScanReportData) {
            const transformedData = inScanReportData.items
                .map((applicants: any) => {
                    return applicants.visa_applicants.map((item: any) => {
                        const { visa_applicants, id, ...rest } = applicants;
                        return { ...item, ...rest, group_id: applicants.id };
                    });
                })
                .flat();
            setFilterItem(transformedData);
        }
    }, [inScanReportData]);

    const tableColumnss = [
        { accessor: 'referenceno', textAlign: 'left', title: 'ReferenceNo' },
        { accessor: 'customertype', textAlign: 'left', title: 'CustomerType' },
        { accessor: 'applydate', textAlign: 'left', title: 'ApplyDate' },
        { accessor: 'nationality', textAlign: 'left', title: 'Nationality' },
        { accessor: 'applicationname', textAlign: 'left', title: 'ApplicationName' },
        { accessor: 'gender', textAlign: 'left', title: 'Gender' },
        { accessor: 'mobileno', textAlign: 'left', title: 'MobileNo' },
        { accessor: 'emailid', textAlign: 'left', title: 'EmailId' },
        // { accessor: 'lastfollowup', textAlign: 'left', title: 'Last Follow Up' },
        { accessor: 'passportno', textAlign: 'left', title: 'PassportNo' },
    ];

    // Function to set table data and open modal
    const ReuseActionModalShow = (object: any) => {
        setIsOpenAction(true);
        const newData = [
            { name: 'Bangladesh', value: 1 },
            { name: 'India', value: 2 },
            { name: 'Iran', value: 1 },
            { name: 'Bangladesh', value: 1 },
            { name: 'India', value: 2 },
            { name: 'Iran', value: 1 },
            { name: 'Bangladesh', value: 1 },
            { name: 'Bangladesh', value: 1 },
            { name: 'India', value: 2 },
            { name: 'Iran', value: 1 },
            { name: 'Bangladesh', value: 1 },
            { name: 'India', value: 2 },
            { name: 'Iran', value: 1 },
            { name: 'Bangladesh', value: 1 },
            { name: 'India', value: 2 },
            { name: 'Iran', value: 1 },
            { name: 'Bangladesh', value: 1 },
            { name: 'Bangladesh', value: 1 },
            { name: 'India', value: 2 },
            { name: 'Iran', value: 1 },
        ];
        const secondTableData = [
            {
                referenceno: '12345',
                customertype: 'Type A',
                applydate: '2024-06-24',
                nationality: 'Country X',
                applicationname: 'App Name 1',
                gender: 'Male',
                mobileno: '1234567890',
                emailid: 'email@example.com',
                passportno: 'A1234567',
            },
            {
                referenceno: '12345',
                customertype: 'Type A',
                applydate: '2024-06-24',
                nationality: 'Country X',
                applicationname: 'App Name 1',
                gender: 'Male',
                mobileno: '1234567890',
                emailid: 'email@example.com',
                passportno: 'A1234567',
            },
        ];
        setTableData(newData);
        setTableDataRight(secondTableData);
    };

    const handleEdit = (object: any) => {
        setIsEdit(true);
        setIsOpen(true);
        setAddData(object);
    };

    const handleInputChange = (e: any) => {
        const { value, id } = e.target;

        setAddData({ ...addData, [id]: value });
        console.log(value);
        console.log(addData);
    };

    const handleExport = () => {
        // const columns = ['id', 'firstname', 'lastname', 'email'];
        const fileName = `${title}.xlsx`;
        exportToExcel(data, exportColumns, fileName);
    };

    const handleSave = () => {
        if (handleSubmit(addData)) {
            setIsOpen(false);
            setAddData({});
        }
    };

    const handleFilter = () => {
        setShowCustomizer(true);
    };
    console.log('filter item', filterItem, addData);
    const handleSubmitReport = async () => {
        let requiredFields: string[] = [];
        let dataFilter = data;

        if (title == 'Daily Report') {
            requiredFields = ['assigned_to'];
        }
        if (title == 'Finance Report' || title == 'Payment Report') {
            requiredFields = ['center'];
        }
        if (title == 'Status Wise Report') {
            requiredFields = ['assigned_to', 'center', 'Select_Employee'];
        }
        if (title == 'Out Scan' || title == 'In Scan') {
            requiredFields = [];
        }
        let missingFields: any = [];
        requiredFields.forEach((field) => {
            if (!addData[field]) {
                missingFields.push(field);
            }
        });

        // Validate if required fields or dateFilter is missing
        if (missingFields.length > 0 && !dateFilter) {
            setFilterItem(null);
            const missingFieldsString = missingFields.join(', ');
            showMessage(`Please select the following fields: ${missingFieldsString}`, 'error');
        } else if (!dateFilter && missingFields.length === 0 && !addData) {
            showMessage('Please select a date', 'error');
        } else {
            const queryParams: any = {};

            if (addData?.center) {
                queryParams.filterByCenter = addData.center;
            }
            if (!addData?.center) {
                queryParams.filterByCenter = currentUser?.center?.id;
            }
            if (addData?.assigned_to) {
                queryParams.filterByUser = addData.assigned_to;
            }
            if (dateFilter) {
                if (typeof dateFilter === 'string' && dateFilter.includes(' to ')) {
                    const [startDateStr, endDateStr] = dateFilter.split(' to ');
                    queryParams.fromDate = startDateStr;
                    queryParams.toDate = endDateStr;
                } else {
                    queryParams.date = dateFilter;
                }
            }

            if (title == 'Daily Report') {
                await triggerGetDailyReport(queryParams);
            }

            if (title === 'Out Scan') {
                await triggerGetOutScanReport(queryParams);
            }

            if (title === 'In Scan') {
                await triggerGetInScanReport(queryParams);
            }

            console.log('queryparams', queryParams);

            // if (dateFilter) {
            //     if (typeof dateFilter === 'string' && dateFilter.includes(' to ')) {
            //         const [startDateStr, endDateStr] = dateFilter.split(' to ');
            //         const startDate = new Date(startDateStr);
            //         const endDate = new Date(endDateStr);

            //         dataFilter = dataFilter.filter((item: any) => {
            //             const itemDate = new Date(item.applydate);
            //             return itemDate >= startDate && itemDate <= endDate;
            //         });
            //     } else {
            //         const selectedDate = new Date(dateFilter);
            //         dataFilter = dataFilter.filter((item: any) => {
            //             const itemDate = new Date(item.applydate);
            //             return itemDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
            //         });
            //     }
            // }

            //console.log("dataFiler", dataFilter)

            // Proceed with form submission or other logic
            //console.log('Form data is valid:', addData);
        }
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">{title}</h2>
                <div className="flex w-full  flex-col gap-4  sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    {/* <div className="flex gap-3">
                        {title !== 'Country Visa Types' && (
                            <div>
                                <button type="button" className="btn btn-primary" onClick={() => setIsOpen(true)}>
                                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                    Add {title}
                                </button>
                            </div>
                        )}
                        <div>
                            <button type="button" className="btn btn-outline-primary" onClick={handleExport}>
                                Export to Excel
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input type="text" placeholder={`Search ${title}`} className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                    {title === 'Lead List' && (
                        <div>
                            <button type="button" className="btn btn-primary" onClick={handleFilter}>
                                <IconFile className="ltr:mr-2 rtl:ml-2" />
                                Filter
                            </button>
                        </div>
                    )} */}
                </div>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
                <div className="mt-5 ">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                        {title !== 'Finance Report' && title !== 'Payment Report' && title !== 'Out Scan' && title !== 'In Scan' && title !== 'Status Wise Report' && (
                            <div className="dropdown mb-5">
                                <label htmlFor="source">Assigned to</label>
                                <select
                                    className="form-input"
                                    defaultValue=""
                                    id="assigned_to"
                                    value={addData?.assigned_to?.id}
                                    onChange={(e) => {
                                        // console.log('e.target', e.target.options[e.target.selectedIndex].innerText);
                                        handleInputChange(e);
                                        // setAddData((prev: any) => ({ ...prev, assigned_to: { id: e.target.value, username: e.target.options[e.target.selectedIndex].innerText } }));
                                    }}
                                >
                                    <option value="" disabled={true}>
                                        Assign to
                                    </option>
                                    <option value="all" >
                                        All
                                    </option>

                                    {assigneeList?.items?.map((item: any) => (
                                        <option value={item.id}>{item.username}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {title !== 'Out Scan' && title !== 'In Scan' && title !== 'Status Wise Report' && (
                            <div className="dropdown">
                                <label htmlFor="center">Center</label>
                                <select
                                    className="form-input"
                                    defaultValue=""
                                    id="center"
                                    disabled={currentUser.role !== 'super_admin'}
                                    onChange={(e) => handleInputChange(e)}
                                    value={currentUser.role !== 'super_admin' ? currentUser?.center?.id : addData?.center?.id}
                                >
                                    <option value="" disabled={true}>
                                        Select Center
                                    </option>
                                    {centers &&
                                        centers?.map((center: Center) => (
                                            <option key={center.id} value={center.id}>
                                                {center.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <>
                            <div className="mb-5">
                                <ComponentsFormDatePickerRange setDateFilter={setDateFilter} />
                            </div>

                            <div className="flex items-center">
                                <div>
                                    <button type="button" className="btn btn-primary mr-5" onClick={handleSubmitReport}>
                                        Submit
                                    </button>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-outline-primary mr-5" onClick={handleExport}>
                                        Export to Excel
                                    </button>
                                </div>
                            </div>
                        </>
                    </div>
                </div>

                {filterItem && filterItem.length > 0 && (
                    <div className="panel mt-5 overflow-hidden border-0 p-0">
                        <div className="table-responsive">
                            <PaginationTable
                                title={title}
                                data={filterItem}
                                tableColumns={tableColumns}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                ReuseActionModalShow={ReuseActionModalShow}
                                actionhide={true}
                            />
                        </div>
                    </div>
                )}
            </div>

            {title == 'Lead List' && <Filtersetting showCustomizer={showCustomizer} setShowCustomizer={setShowCustomizer} />}

            <ReuseActionModal
                isOpen={isOpenAction}
                //setAddData={setAddData}
                //handleInputChange={handleInputChange}
                setIsOpen={setIsOpenAction}
                //handleSave={handleSave}
                width=""

                //addData={addData}
                //isEdit={isEdit}
                //setIsEdit={setIsEdit}
            >
                <CountView isOpen={isOpenAction} setIsOpen={setIsOpenAction} headding="Count View" tableData={tableData} tableColumns={tableColumnss} secondTableData={tableDataRight} />
            </ReuseActionModal>
        </>
    );
};

export default ReportTableLayout;
