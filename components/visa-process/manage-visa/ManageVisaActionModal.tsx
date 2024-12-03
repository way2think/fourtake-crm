import ActionModal from '@/components/Reusable/Modal/ActionModal';
import PaginationTable from '@/components/Reusable/Table/PaginationTable';
import IconX from '@/components/icon/icon-x';
import ComponentsFormDatePickerBasic from '@/components/lead-management/lead-manage/components-form-date-picker-basic';
import ComponentsFormDateAndTimePicker from '@/components/lead-management/lead-manage/components-from-date-and-time-picker';
import { User } from '@/entities/user.entity';
import { useGetVisaStatusesQuery } from '@/services/api/cms/visaStatusSlice';
import { selectUser } from '@/store/user.store';
import { timeStampFormat } from '@/utils/constant';
import { useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

interface ManageVisaActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addUser?: any;
    handleInputChange: any;
    setAddUser: any;
    isEdit?: any;
    setIsEdit?: any;
    applicantDetails?: any;
    setApplicantDetails?: any;
    addData: any;
    paramId: any;
}

const ManageVisaActionModal: React.FC<ManageVisaActionModalProps> = ({
    isOpen,
    setAddUser,
    handleInputChange,
    setIsOpen,
    handleSave,
    addUser,
    isEdit,
    setIsEdit,
    applicantDetails,
    setApplicantDetails,
    addData,
    paramId,
}) => {
    const [isOpenAddNote, setIsOpenAddNote] = useState(false);
    const [userNote, setUserNote] = useState<any>(''); // Add state for the textarea
    const [userNotes, setUserNotes] = useState<any[]>(addUser.notes || []); // State for storing
    const [modalTitle, setModalTitle] = useState<string>('Add Note');
    const [actionButtonText, setActionButtonText] = useState<string>('Add Note');
    const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Track index for editing
    const [isDocPickUp, setIsDocPickUp] = useState(false);
    const [isOutScan, setIsOutScan] = useState(false);
    const [isCourier, setIsCourier] = useState(false);
    const [isInScan, setIsInScan] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    console.log('addUser', addUser);

    const user = useSelector(selectUser) as User;

    const role = user?.role || 'guest';

    const { data: visaStatuses } = useGetVisaStatusesQuery({ page: 0, limit: 0, filter: 'is_active' });

    useEffect(() => {
        if ((addData?.visa_applicants == null || addData?.visa_applicants.length > 0) && addData?.visa_status) {
            setAddUser({ ...addUser, visa_status: addData.visa_status || addData.visa_status.id });
        }
    }, [addData?.visa_status]);

    useEffect(() => {
        setUserNotes(addUser.notes || []);
    }, [addUser?.notes]);

    useEffect(() => {
        if (addUser?.visa_status == '54' || addUser?.visa_status?.name == 'Document PickUp') {
            setIsDocPickUp(true);
        }
        if (addUser?.visa_status == '52' || addUser?.visa_status?.name == 'OutScan to Embassy') {
            setIsOutScan(true);
            setIsInScan(true);
        }

        if (addData?.visa_status == '5' || addData?.visa_status?.name == 'submitted') {
            setIsSubmit(true);
        }

        if (
            addUser?.visa_status == '56' ||
            addUser?.visa_status == '57' ||
            addUser?.visa_status == '58' ||
            addUser?.visa_status?.id == '56' ||
            addUser?.visa_status?.id == '57' ||
            addUser?.visa_status?.id == '58'
        ) {
            setIsCourier(true);
        }
    }, [addUser?.visa_status]);

    const handleCheckBoxChange = (e: any) => {
        //Change it 13-07-2024
        // const { id, checked } = e.target;
        // setAddUser((prev: any) => ({ ...prev, [id]: checked ? "Yes" : "No"}));

        const { id, checked } = e.target;

        if (checked && applicantDetails.some((applicant: { is_primary: boolean }) => applicant.is_primary === true)) {
            if (confirm('You already selected a Primary. Do you want to change it?')) {
                setApplicantDetails((prevState: any[]) => prevState.map((applicant: { is_primary: boolean }) => (applicant.is_primary === true ? { ...applicant, is_primary: false } : applicant)));
            } else {
                return;
            }
        }

        setAddUser((prevState: any) => ({
            ...prevState,
            [id]: checked ? true : false,
        }));
    };

    const handleLeadNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setUserNote(event.target.value);
    };

    const handleButtonClickShowAddNote = () => {
        setIsOpenAddNote(true);
        setModalTitle('Add Note');
        setActionButtonText('Add Note');
        setUserNote('');

        setCurrentIndex(null); // Reset index when adding a new note
    };

    const handleEditNoteClick = (index: number) => {
        setIsOpenAddNote(true);
        setModalTitle('Edit Note');
        setActionButtonText('Save');
        setUserNote(userNotes[index]);
        setCurrentIndex(index); // Set index for editing
    };

    const handleDeleteNote = (index: number) => {
        const updatedNotes = [...userNotes];
        updatedNotes.splice(index, 1);
        setUserNotes(updatedNotes);
        setAddUser({ ...addUser, notes: updatedNotes });
    };

    const handleCloseModal = () => {
        setIsOpenAddNote(false);
        setModalTitle('Add Note');
        setActionButtonText('Add Note');
        setUserNote('');
        setCurrentIndex(null); // Reset index when closing modal
    };

    const handleNoteAction = () => {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
        if (modalTitle === 'Edit Note' && currentIndex !== null) {
            const updatedNotes = [...userNotes];
            updatedNotes[currentIndex] = {
                note: userNote,
                created_time: updatedNotes[currentIndex].created_time, // Retain the original created_time during edit
            };
            // updatedNotes[currentIndex] = userNote;
            setUserNotes(updatedNotes);
            setAddUser({ ...addUser, notes: updatedNotes });
        } else {
            const newNote = {
                note: userNote,
                created_time: currentTimeInSeconds, // Set created_time in seconds when creating a new note
                created_by: user.username,
            };
            const updatedNotes = [...userNotes, newNote];
            setUserNotes(updatedNotes);
            setAddUser({ ...addUser, notes: updatedNotes });
        }
        handleCloseModal();
    };

    // Add Applicant modal

    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Add Applicant</h5>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setAddUser({});
                            setIsEdit(false);
                        }}
                        type="button"
                        className="text-white-dark hover:text-dark"
                    >
                        <IconX />
                    </button>
                </div>

                <div className="p-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="first_name">First Name</label>
                            <input id="first_name" type="text" placeholder="Enter First Name" className="form-input" value={addUser?.first_name} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="last_name">Last Name </label>
                            <input id="last_name" type="text" onChange={(e) => handleInputChange(e)} value={addUser?.last_name} placeholder="Enter Last Name" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        {
                            <div className="mb-5">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    // disabled={isEdit ? true : false}
                                    value={addUser?.email}
                                    onChange={(e) => handleInputChange(e)}
                                    type="tel"
                                    placeholder="Enter Email"
                                    className="form-input"
                                    // style={isEdit ?{background:"grey",opacity:0.5}:{}}
                                />
                            </div>
                        }
                        <div className="mb-5">
                            <label htmlFor="passport_number">Passport No</label>
                            <input id="passport_number" value={addUser?.passport_number} onChange={(e) => handleInputChange(e)} placeholder="Enter Passport No" className="form-input" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="phone">Phone</label>
                            <input id="phone" value={addUser?.phone} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Phone" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="other_phone">Other Phone(Foreign)</label>
                            <input id="other_phone" value={addUser?.other_phone} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Phone" className="form-input" />
                        </div>
                    </div>
                    <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown">
                            <label htmlFor="gender">Gender</label>
                            <select className="form-input" defaultValue="" id="gender" onChange={(e) => handleInputChange(e)} value={addUser?.gender}>
                                <option value="" disabled={true}>
                                    --- Select Gender ---
                                </option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>
                        {paramId && (
                            <div className="dropdown">
                                <label htmlFor="visa_status">Visa Status</label>
                                <select className="form-input" defaultValue="" id="visa_status" onChange={(e) => handleInputChange(e)} value={addUser?.visa_status?.id || addUser?.visa_status}>
                                    <option value="" disabled={true}>
                                        Select Status
                                    </option>

                                    {visaStatuses?.items?.map((status: any) => (
                                        <option value={status.id}>{status.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        {isCourier && (
                            <div className="mb-5">
                                <label htmlFor="courier_tracking_no">Courier Tracking No.</label>
                                <input
                                    id="courier_tracking_no"
                                    value={addUser?.courier_tracking_no}
                                    onChange={(e) => handleInputChange(e)}
                                    placeholder="Enter Courier Tracking No"
                                    className="form-input"
                                />
                            </div>
                        )}
                    </div>
                    {(addUser?.visa_status == '54' || isDocPickUp) && (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                            <div className="mb-5">
                                <ComponentsFormDateAndTimePicker label="Document pickup Date" id={'doc_pickup_date'} isEdit={isEdit} setAddData={setAddUser} addData={addUser} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="doc_pickup_remark">Document PickUp Remarks</label>
                                <textarea
                                    id="doc_pickup_remark"
                                    rows={1}
                                    value={addUser?.doc_pickup_remark}
                                    onChange={(e) => handleInputChange(e)}
                                    placeholder="Enter Remarks"
                                    className="form-textarea min-h-[10px] resize-none"
                                ></textarea>
                            </div>
                        </div>
                    )}

                    {isEdit && paramId && (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                            <>
                                <div className="mb-5">
                                    <ComponentsFormDateAndTimePicker
                                        label="OutScan to Embassy"
                                        id={'outscan_to_embassy_date'}
                                        isEdit={isEdit}
                                        setAddData={setAddUser}
                                        addData={addUser}
                                        updateUser={true}
                                    />
                                </div>

                                <div className="mb-5">
                                    <ComponentsFormDateAndTimePicker
                                        label="In Scan from Embassy"
                                        id={'inscan_from_embassy_date'}
                                        isEdit={isEdit}
                                        setAddData={setAddUser}
                                        addData={addUser}
                                        updateUser={true}
                                    />
                                </div>
                            </>
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <>
                            {isSubmit && (
                                <div className="dropdown">
                                    <label htmlFor="where_submitted">Where Submitted</label>
                                    <select className="form-input" defaultValue="" id="where_submitted" onChange={(e) => handleInputChange(e)} value={addUser?.where_submitted}>
                                        <option value="" disabled={true}>
                                            Select Option
                                        </option>
                                        <option value="vfs bangalore">VFS Bangalore</option>;<option value="vfs mumbai">VFS Mumbai</option>;<option value="vfs kolkata">VFS Kolkata</option>;
                                        <option value="vfs Hyderabad">VFS Hyderabad</option>;<option value="vfs dehli">VFS Dehli</option>;<option value="online">Online </option>;
                                        <option value="vendor">Vendor</option>;
                                    </select>
                                </div>
                            )}
                        </>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <ComponentsFormDatePickerBasic label="DOB" id={'dob'} isEdit={isEdit} setAddData={setAddUser} addData={addUser} />
                        </div>
                        <div className="mt-7">
                            <label className="flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    id="is_primary"
                                    onChange={(e) => handleCheckBoxChange(e)}
                                    className="form-checkbox bg-white dark:bg-black"
                                    checked={addUser.is_primary === true || applicantDetails.length == 0}
                                />
                                <span className="text-black">Is Primary?</span>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
                        <div className="mb-5 mt-7">
                            <label htmlFor="notes" style={{ display: 'inline-block' }}>
                                Note
                            </label>
                            <button className="btn btn-primary ml-5" style={{ marginLeft: '20px', display: 'inline-block' }} onClick={handleButtonClickShowAddNote}>
                                Add Note
                            </button>

                            <div className="mt-3">
                                {userNotes?.map((item: any, index: number) => (
                                    <div key={index} className="mt-2 flex flex-col rounded border p-2">
                                        <div className="flex items-center justify-between">
                                            <div>{item?.note}</div>
                                            {(role === 'super_admin' || role === 'admin') && (
                                                <div className="flex items-center">
                                                    <button className="btn btn-outline-primary btn-sm mr-2" onClick={() => handleEditNoteClick(index)}>
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteNote(index)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-2 text-right font-mono text-sm text-blue-500">
                                            Created By: {item.created_by} - Created Date: {timeStampFormat(item.created_time)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <ActionModal isOpen={isOpenAddNote} setIsOpen={setIsOpenAddNote} handleSave={handleNoteAction} width="max-w-2xl">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h5 className="text-lg font-bold">{modalTitle}</h5>
                                    <button onClick={handleCloseModal} type="button" className="text-white-dark hover:text-dark">
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <textarea
                                        id="userNote"
                                        onChange={handleLeadNoteChange}
                                        value={userNote?.note}
                                        placeholder="Enter your note here"
                                        className="min-h-[150px] w-full rounded-lg border p-2 outline-none"
                                    />
                                    <div className="mt-3">
                                        <button onClick={handleNoteAction} className="btn btn-primary">
                                            {actionButtonText}
                                        </button>
                                    </div>
                                </div>
                            </ActionModal>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setAddUser({});
                                setIsEdit(false);
                            }}
                            type="button"
                            className="btn btn-outline-danger"
                        >
                            Cancel
                        </button>
                        <button onClick={handleSave} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                            Save
                        </button>
                    </div>
                </div>
            </ActionModal>
        </>
    );
};

export default ManageVisaActionModal;
