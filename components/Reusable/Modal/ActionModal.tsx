import IconFacebook from '@/components/icon/icon-facebook';
import IconInstagram from '@/components/icon/icon-instagram';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconLinkedin from '@/components/icon/icon-linkedin';
import IconListCheck from '@/components/icon/icon-list-check';
import IconSearch from '@/components/icon/icon-search';
import IconTwitter from '@/components/icon/icon-twitter';
import IconUser from '@/components/icon/icon-user';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconX from '@/components/icon/icon-x';
import { Transition, Dialog } from '@headlessui/react';
import React, { Children, Fragment, useEffect, useMemo, useState } from 'react';
// import Swal from 'sweetalert2';
// import Dropdown from '../dropdown';
// import ElementsDropdownsBasic from '../Reusable/elements-dropdowns-basic';
// import ComponentsFormsSelectBasic from '../Reusable/select/components-forms-select-basic';
// import AddUserForm from '../user-management/AddUserForm';
// import { isValidEmail, isValidName, isValidPassword, isValidPhoneNumber } from '@/utils/validator';
// import IconLockDots from '../icon/icon-lock-dots';

// import './pagination.css';
// import PaginationTable from './PaginationTable';
// import ComponentsModalOptionalSizes from '../Reusable/Modal/components-modal-optional-sizes';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import ComponentsFormsFileUploadSingle from '../file-upload/components-forms-file-upload-single';
import ComponentsFormsFileUploadMulti from '../file-upload/components-forms-file-upload-multi';
import CountryActionModal from '../../CMS/countries/CountryActionModal';
// import { exportToExcel } from '../Reusable/ExportExcel/exportToExcel';

interface ActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    editData?: any;
    children: any;
    width: string;
    height?: string;
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, setIsOpen, handleSave, editData, children, width, height }) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 " />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={`panel ${width} ${height} my-8 w-full overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark`}>{children}</Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ActionModal;
