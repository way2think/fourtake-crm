'use client';
import React, { useEffect, useState } from 'react';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './paginationtable.css';

import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { ActionIcon, Box, Group, Table } from '@mantine/core';
import IconEye from '../../icon/icon-eye';
import IconEdit from '../../icon/icon-edit';
import IconTrash from '../../icon/icon-trash';
import IconCaretsDown from '../../icon/icon-carets-down';
import IconCaretDown from '../../icon/icon-caret-down';
import IconArrowBackward from '@/components/icon/icon-arrow-backward';
import IconArrowForward from '@/components/icon/icon-arrow-forward';
import { useRouter } from 'next/navigation';
import IconVerify from '@/components/icon/menu/icon-verify';
import IconTxtFile from '@/components/icon/icon-txt-file';
import IconUnVerified from '@/components/icon/icon-unverified';
import IconList from '@/components/icon/icon-list';
import IconTrendingUp from '@/components/icon/icon-trending-up';
import IconRestore from '@/components/icon/icon-restore';
import ListVisaApplicationListLine from '@/components/visa-process/visa-application-list/ListVisaApplicationListLine';
import ActionModal from '../Modal/ActionModal';
import IconX from '@/components/icon/icon-x';
import { useGetOneVisaApplicantGroupQuery, useUpdateVisaApplicantGroupMutation, visaProcessSlice } from '@/services/api/visaProcessSlice';
import { handleUpdate } from '@/utils/rtk-http';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';

interface PaginationExpandProps {
    data: any;
    tableColumns: any;
    handleEdit?: (row: any) => void;
    handleDeleteApplicant?: (row: any) => void;
    handleDeleteGroup?: (row: any) => void;
    title?: string;
    getSubData?: any; // Function to fetch sub-table data
    handleRestoreGroup?: any;
    handleDelete?:any;
}

const PaginationExpand: React.FC<PaginationExpandProps> = ({ data, tableColumns, handleEdit, handleDeleteApplicant, handleDeleteGroup, title, getSubData, handleRestoreGroup }) => {
    const PAGE_SIZES = [10, 15, 20];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
    const [page, setPage] = useState(1);
    const recordsPerPage = pageSize;
    const router = useRouter();
    const [track, setTrack] = useState({
        url: '',
        other: '',
    });

    console.log('data: ', data);

    // console.log('subData', data, getSubData, getSubData?.visa_applicants);
    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedData = data?.slice(startIndex, endIndex);

    const [expandedRows, setExpandedRows] = useState<any>([]);
    const [isOpenlistLine, setIsOpenListLine] = useState(false);
    const [isOpenTrack, setIsOpenTrack] = useState(false);
    const [addData, setAddData] = useState<any>();

    const { data: oneVisaApplicantsGroup } = useGetOneVisaApplicantGroupQuery(encodeURIComponent(addData?.group_id), {
        skip: !addData?.group_id,
    });

    const [updateVisaApplicant, {}] = useUpdateVisaApplicantGroupMutation();

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    // console.log('expandedRows', expandedRows);
    useEffect(() => {
        if (addData?.tracking_detail && addData?.id) {
            setTrack(addData.tracking_detail);
        }
    }, [addData?.tracking_detail]);

    const toggleRow = (id: number) => {
        setExpandedRows((prevExpandedRows: any) => (prevExpandedRows.includes(id) ? prevExpandedRows.filter((rowId: any) => rowId !== id) : [...prevExpandedRows, id]));
    };

    const tableGroupColumn: any = [
        {
            accessor: 'id',
            textAlign: 'left',
            title: 'Group Id',
            render: (row: any) => {
                console.log('group data', row);
                return `${row.id} (${row?.visa_applicants?.length})`;
            },
        },
        // { accessor: 'applydate', textAlign: 'left', title: 'Apply Date' },
        { accessor: 'customer_type', textAlign: 'left', title: 'App Type' },
        {
            accessor: 'assigned_to',
            textAlign: 'left',
            title: 'Assigned',
            render: (row: any) => {
                return row.assigned_to.username;
            },
        },
        {
            accessor: 'destination_country',
            textAlign: 'left',
            title: 'Destination',
            render: (row: any) => {
                return row.destination_country.name;
            },
        },
        {
            accessor: 'visa_type',
            textAlign: 'left',
            title: 'Type',
            render: (row: any) => {
                return row.visa_type.name;
            },
        },
        { accessor: 'visa_duration', textAlign: 'left', title: 'Duration' },
        {
            accessor: 'entry',
            textAlign: 'left',
            title: 'Entry',
            render: (row: any) => {
                return row.entry_type.name;
            },
        },
    ];

    const tableApplicantColumns: any = [
        { accessor: 'id', textAlign: 'left', title: 'Ref No' },
        {
            accessor: 'is_primary',
            textAlign: 'left',
            title: 'Is Primary',
            render: (row: any) => {
                return row.is_primary ? 'Yes' : 'No';
            },
        },
        {
            accessor: 'first_name',
            textAlign: 'left',
            title: 'Applicant Name',
            render: (row: any) => {
                return `${row.first_name} ${row.last_name}`;
            },
        },
        { accessor: 'email', textAlign: 'left', title: 'Email' },
        {
            accessor: 'phone',
            textAlign: 'left',
            title: 'Phone no',
            render: (row: any) => {
                if (row.phone && row.other_phone) {
                    return `+91 ${row.phone}, ${row.other_phone}`;
                } else if (row.phone && !row.other_phone) {
                    return `+91 ${row.phone}`;
                } else if (row.other_phone && !row.phone) {
                    return `${row.other_phone}`;
                }
            },
        },
        {
            accessor: 'passport_number',
            textAlign: 'left',
            title: 'Passport Number',
        },
        { accessor: 'dob', textAlign: 'left', title: 'DOB' },
        { accessor: 'gender', textAlign: 'left', title: 'Gender' },
        {
            accessor: 'visa_status',
            textAlign: 'left',
            title: 'status',
            render: (row: any) => {
                return row.visa_status.name;
            },
        },
        // {
        //     accessor: 'action',
        //     textAlign: 'left',
        //     title: 'Actions',
        // },
    ];

    const handleListLine = (object: any, group: any) => {
        console.log('Deleting row:', object, group);
        setIsOpenListLine(true);
        setAddData({ ...object, group_id: group.id });
    };

    const handleTracking = (object: any, group: any) => {
        setAddData({ ...object, group_id: group.id });
        setIsOpenTrack(true);
    };

    const handleTrackInputChange = (e: any) => {
        const { value, id } = e.target;

        setTrack({ ...track, [id]: value });
    };

    const handleTrackSave = () => {
        setAddData({ ...addData, ...track });
        setIsOpenTrack(false);
        setTrack({ url: '', other: '' });

        if (oneVisaApplicantsGroup) {
            const updatedData = {
                ...oneVisaApplicantsGroup,
                updated_time: new Date(),
                visa_applicants: oneVisaApplicantsGroup?.visa_applicants.map((applicant: any) => (applicant.id === addData?.id ? { ...applicant, tracking_detail: track } : applicant)),
            };

            return handleUpdate({
                updateMutation: updateVisaApplicant,
                value: updatedData,
                items: oneVisaApplicantsGroup,
                meta: {},
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaProcessSlice,
                endpoint: 'getVisaApplicants',
            });
        }
    };

    const handleDocChecklist = (row: any) => {
        console.log('row', row);
        router.push(`/check-requirements?countryId=${row.destination_country.id}&visaTypeId=${row.visa_type.id}&stateOfResidence=${row.state_of_residence}`);
    };

    return (
        <>
            <div className="datatables bg-[#]">
                <DataTable
                    backgroundColor="#fff"
                    shadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    withTableBorder
                    borderRadius="sm"
                    withColumnBorders
                    striped
                    className="table-hover whitespace-nowrap"
                    highlightOnHover
                    records={data}
                    columns={[
                        // ...tableGroupColumn,
                        ...tableGroupColumn.map((column: any) => ({
                            ...column,
                            render: (row: any) => (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }} // Only trigger expansion when clicking on tableGroupColumn
                                    style={{ cursor: 'pointer' }} // Indicate that this column is clickable
                                >
                                    {column.render ? column.render(row) : row[column.accessor]}
                                </div>
                            ),
                        })),
                        {
                            accessor: 'actions',
                            title: <Box mr={6}>Actions</Box>,
                            textAlign: 'right',
                            render: (row: any) => (
                                <Group gap={4} justify="right" wrap="nowrap">
                                    {' '}
                                    <ActionIcon
                                        size="sm"
                                        onClick={(e) => {
                                            toggleRow(row?.id);
                                        }}
                                    >
                                        {expandedRows.includes(row?.id) ? <IconCaretDown className="-rotate-0" size={16} /> : <IconCaretDown className="-rotate-90" size={16} />}
                                    </ActionIcon>
                                    {title !== 'Deleted Visa Application' && (
                                        <ActionIcon
                                            size="sm"
                                            variant="subtle"
                                            color="blue"
                                            onClick={(e) => {
                                                router.push(`/manage-visa/${row?.id}`);
                                            }}
                                        >
                                            <IconEdit size={16} />
                                        </ActionIcon>
                                    )}
                                    {title !== 'dashboard' && title !== 'Deleted Visa Application' && (
                                        <ActionIcon
                                            size="sm"
                                            variant="subtle"
                                            color="red"
                                            onClick={(e) => {
                                                handleDeleteGroup && handleDeleteGroup(row);
                                            }}
                                        >
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    )}
                                    {title === 'Deleted Visa Application' && (
                                        <ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleRestoreGroup?.(row)}>
                                            <IconRestore size={16} />
                                        </ActionIcon>
                                    )}
                                </Group>
                            ),
                        },
                    ]}
                    totalRecords={data?.length}
                    paginationActiveBackgroundColor="grape"
                    recordsPerPage={pageSize}
                    recordsPerPageOptions={[10, 20, 30]}
                    onRecordsPerPageChange={setPageSize}
                    page={page}
                    onPageChange={setPage}
                    rowExpansion={{
                        // isExpanded: (row: any) => expandedRows.includes(row.id),
                        content: ({ record }: { record: any }) => (
                            <div>
                                <Table>
                                    <thead>
                                        <tr>
                                            {tableApplicantColumns.map((column: any, colIndex: number) => (
                                                <th key={colIndex} style={{ textAlign: column.textAlign }} className="p-2">
                                                    {column.title}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record?.visa_applicants?.map((subRow: any, index: number) => (
                                            <tr key={index}>
                                                {tableApplicantColumns.map((column: any, colIndex: number) => (
                                                    <td key={colIndex} className="p-2" style={{ textAlign: column.textAlign }}>
                                                        {column.render ? column.render(subRow) : subRow[column.accessor]}
                                                    </td>
                                                ))}
                                                <Group gap={1} className="mt-2 flex items-center justify-center">
                                                    <ActionIcon
                                                        size="sm"
                                                        variant="subtle"
                                                        color="blue"
                                                        onClick={(e) => {
                                                            router.push(`/manage-visa/${record?.id}`);
                                                        }}
                                                    >
                                                        <IconEdit size={16} />
                                                    </ActionIcon>
                                                    <>
                                                        <ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleDocChecklist?.(record)}>
                                                            <IconTxtFile className={`size:"16"`} />
                                                        </ActionIcon>

                                                        {subRow.visa_status === 'verified' && (
                                                            <ActionIcon
                                                                size="sm"
                                                                variant="subtle"
                                                                color="red"
                                                                //  onClick={() => handleDelete?.(row)}
                                                            >
                                                                <IconVerify />
                                                            </ActionIcon>
                                                        )}
                                                        {subRow.visa_status === 'unverified' && (
                                                            <ActionIcon
                                                                size="sm"
                                                                variant="subtle"
                                                                color="red"
                                                                //  onClick={() => handleDelete?.(row)}
                                                            >
                                                                <IconUnVerified />
                                                            </ActionIcon>
                                                        )}
                                                        <ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleListLine?.(subRow, record)}>
                                                            <IconList title="Multiple Passport" />
                                                        </ActionIcon>
                                                        <ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleTracking?.(subRow, record)}>
                                                            <IconTrendingUp title="Application Tracking" />
                                                        </ActionIcon>
                                                    </>
                                                    {title !== 'dashboard' && (
                                                        <ActionIcon
                                                            size="sm"
                                                            variant="subtle"
                                                            color="red"
                                                            onClick={(e) => {
                                                                handleDeleteApplicant && handleDeleteApplicant(subRow);
                                                            }}
                                                        >
                                                            <IconTrash size={16} />
                                                        </ActionIcon>
                                                    )}
                                                </Group>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        ),
                    }}
                />
            </div>

            <ListVisaApplicationListLine isOpen={isOpenlistLine} setIsOpen={setIsOpenListLine} addData={addData} setAddData={setAddData} />

            {/* Modal for tracking Url */}
            <ActionModal isOpen={isOpenTrack} setIsOpen={setIsOpenTrack} handleSave={handleTrackSave} width="max-w-2xl">
                <div className="flex  items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Tracking Details</h5>
                    <button
                        onClick={() => {
                            setIsOpenTrack(false);
                            setTrack({ url: '', other: '' });
                            // setIsEdit(false);
                        }}
                        type="button"
                        className="text-white-dark hover:text-dark"
                    >
                        <IconX />
                    </button>
                </div>

                <div className="m-5 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="refno">Ref No</label>
                            <input id="refno" type="text" disabled={true} value={addData?.id} placeholder="Ref No" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="url">Tracking URL </label>
                            <input id="url" value={track?.url} onChange={(e) => handleTrackInputChange(e)} type="text" placeholder="Enter Tracking URL" className="form-input" />
                        </div>
                    </div>
                </div>
                <div className="m-5 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="other">Others</label>
                            <input id="other" type="text" onChange={(e) => handleTrackInputChange(e)} value={track?.other} placeholder="Other Details" className="form-input" />
                        </div>
                    </div>
                </div>
                <div className=" float-end m-3 flex items-center justify-end">
                    <button
                        onClick={() => {
                            setIsOpenTrack(false);
                            setTrack({ url: '', other: '' });
                            // setIsEdit(false);
                        }}
                        type="button"
                        className="btn btn-outline-danger"
                    >
                        Cancel
                    </button>
                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleTrackSave}>
                        Save
                    </button>
                </div>
            </ActionModal>
        </>
    );
};

export default PaginationExpand;
