'use client';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import IconX from '../icon/icon-x';
import ReuseActionModal from '../Reusable/Modal/ActionModal';
import PaginationTable from '../Reusable/Table/PaginationTable';
import IconCaretDown from '@/components/icon/icon-caret-down';


interface AddNoteProps {
    isOpen: any;
    setIsOpen: any;
}




const AddNote: React.FC<AddNoteProps> = ({ isOpen, setIsOpen }) => {

    
   

    
    return (
        <>

            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                {/* <h5 className="text-lg font-bold">{headding}</h5> */}
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
                    
                </div>
                


               


            </div>



        </>
    );
};

export default AddNote;