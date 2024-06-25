'use client';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import IconX from '../icon/icon-x';
import ReuseActionModal from '../Reusable/Modal/ActionModal';
import PaginationTable from '../Reusable/Table/PaginationTable';

interface CountViewProps {
    isOpen: any;
    setIsOpen: any;
    headding: string;
    tableData: { name: string; value: number }[];
    secondTableData: any;
    tableColumns: any;
}


const CountView: React.FC<CountViewProps> = ({ isOpen, setIsOpen, headding, tableData, tableColumns, secondTableData }) => {

    console.log(secondTableData);
    const [visibleCountryIndex, setVisibleCountryIndex] = useState<number | null>(null);

    const handleRowClick = (index: number) => {
        setVisibleCountryIndex(visibleCountryIndex === index ? null : index);
    };
    return (
        <>

            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">{headding}</h5>
                <button
                    onClick={() => {
                        setIsOpen(false);
                    }}
                    type="button"
                    className="text-white-dark hover:text-dark"
                >
                    <IconX />
                </button>
            </div>

            <div className="flex px-5 py-3">
                {/* Left Table (30% Width) */}
                <div className="w-1/5 pr-5" style={{ maxHeight: '613px', overflowY: 'auto' }}>
                    <table className="min-w-full bg-white dark:bg-[#121c2c]">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b-2 border-gray-300">Country Names</th>
                                <th className="py-2 px-4 border-b-2 border-gray-300">Count</th>
                                {/* <th className="py-2 px-4 border-b-2 border-gray-300 text-right">Toggle</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item, index) => (
                                <tr key={index} className={visibleCountryIndex === index ? 'bg-gray-200' : ''}>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        <div className="flex justify-between items-center">
                                            <span>{item.value}</span>
                                            <button onClick={() => handleRowClick(index)}>
                                                {visibleCountryIndex === index ? '-' : '>'}
                                            </button>
                                        </div>
                                    </td>
                                    {/* <td className="py-2 px-4 border-b border-gray-300 text-right">
                                        <button onClick={() => handleRowClick(index)}>
                                            {visibleCountryIndex === index ? '-' : '>'}
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Right Table (70% Width) */}
                {/* <table className="min-w-full bg-white dark:bg-[#121c2c]">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b-2 border-gray-300">Reference No</th>
                                <th className="py-2 px-4 border-b-2 border-gray-300">Customer Type</th>
                                <th className="py-2 px-4 border-b-2 border-gray-300">Apply Date</th>
                                <th className="py-2 px-4 border-b-2 border-gray-300">Nationality</th>
                                <th className="py-2 px-4 border-b-2 border-gray-300">Application Name</th>
                                <th className="py-2 px-4 border-b-2 border-gray-300">Gender</th>
                                <th className="py-2 px-4 border-b-2 border-gray-300">Mobile No</th>
                                <th className="py-2 px-4 border-b-2 border-gray-300">Email Id</th>
                                <th className="py-2 px-4 border-b-2 border-gray-300">Passport No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {secondTableData.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.ReferenceNo}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.CustomerType}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.ApplyDate}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.Nationality}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.ApplicationName}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.Gender}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.MobileNo}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.EmailId}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{item.PassportNo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}


                <div className="w-4/5 px-5 py-3">
                    {visibleCountryIndex !== null && (
                        <div className="mb-5">
                            <h5 className="text-lg font-bold mb-2">{tableData[visibleCountryIndex].name}</h5>
                            <PaginationTable
                                data={secondTableData}
                                tableColumns={tableColumns}
                                showActions={true}
                            />
                        </div>
                    )}
                </div>


            </div>



        </>
    );
};

export default CountView;
