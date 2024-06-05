'use client';
import React, { useState, useMemo } from 'react';
import Pagination from '../../components/CMS/pagination';
import data from './data.json';
import './paginationtable.css';
import Tippy from '@tippyjs/react';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import 'tippy.js/dist/tippy.css';

let PageSize = 10;

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        action: (
            <div>
                <Tippy content="Edit">
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>
                </Tippy>
                <Tippy content="Delete">
                    <button type="button">
                        <IconTrashLines />
                    </button>
                </Tippy>
            </div>
        ),
    },
    {
        id: 2,
        firstName: 'Celeste',
        action: (
            <div>
                <Tippy content="Edit">
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>
                </Tippy>
                <Tippy content="Delete">
                    <button type="button">
                        <IconTrashLines />
                    </button>
                </Tippy>
            </div>
        ),
    },
    {
        id: 3,
        firstName: 'Tillman',
        action: (
            <div>
                <Tippy content="Edit">
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>
                </Tippy>
                <Tippy content="Delete">
                    <button type="button">
                        <IconTrashLines />
                    </button>
                </Tippy>
            </div>
        ),
    },
    {
        id: 4,
        firstName: 'Daisy',
        action: (
            <div>
                <Tippy content="Edit">
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>
                </Tippy>
                <Tippy content="Delete">
                    <button type="button">
                        <IconTrashLines />
                    </button>
                </Tippy>
            </div>
        ),
    },
    {
        id: 5,
        firstName: 'Weber',
        action: (
            <div>
                <Tippy content="Edit">
                    <button type="button">
                        <IconPencil className="ltr:mr-2 rtl:ml-2" />
                    </button>
                </Tippy>
                <Tippy content="Delete">
                    <button type="button">
                        <IconTrashLines />
                    </button>
                </Tippy>
            </div>
        ),
    },
];

export default function PaginationTable() {
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return rowData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>SNo</th>
                        <th>Country Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTableData.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.action}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination className="pagination-bar" currentPage={currentPage} totalCount={rowData.length} pageSize={PageSize} onPageChange={(page) => setCurrentPage(page)} />
        </>
    );
}
