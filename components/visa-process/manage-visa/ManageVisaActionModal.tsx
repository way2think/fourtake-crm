import ActionModal from '@/components/Reusable/Modal/ActionModal';
import PaginationTable from '@/components/Reusable/Table/PaginationTable';
import IconX from '@/components/icon/icon-x';
import ComponentsFormDatePickerBasic from '@/components/lead-management/lead-manage/components-form-date-picker-basic';
import { useGetVisaStatusesQuery } from '@/services/api/cms/visaStatusSlice';
import { useEffect, useState, ChangeEvent } from 'react';

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
}) => {
    const [isOpenAddNote, setIsOpenAddNote] = useState(false);
    const [userNote, setUserNote] = useState<string>(''); // Add state for the textarea
    const [userNotes, setUserNotes] = useState<any[]>(addUser.notes || []); // State for storing
    const [modalTitle, setModalTitle] = useState<string>('Add Note');
    const [actionButtonText, setActionButtonText] = useState<string>('Add Note');
    const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Track index for editing

    const { data: visaStatuses } = useGetVisaStatusesQuery({ page: 0, limit: 0 });
    // console.log('userNotes', userNotes);

    useEffect(() => {
        setUserNotes(addUser.notes || []);
    }, [addUser?.notes]);

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
                note:userNote,
                created_time: updatedNotes[currentIndex].created_time, // Retain the original created_time during edit
            };
            // updatedNotes[currentIndex] = userNote;
            setUserNotes(updatedNotes);
            setAddUser({ ...addUser, notes: updatedNotes });
        } else {
            const newNote = {
                note:userNote,
                created_time: currentTimeInSeconds, // Set created_time in seconds when creating a new note
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
                    <h5 className="text-lg font-bold">Add User</h5>
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
                                    Select Gender
                                </option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="visa_status">Visa Status</label>
                            <select className="form-input" defaultValue="" id="visa_status" onChange={(e) => handleInputChange(e)} value={addUser?.visa_status}>
                                <option value="" disabled={true}>
                                    Select Status
                                </option>

                                {visaStatuses?.items?.map((status: any) => (
                                    <option value={status.id}>{status.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        {addUser?.visa_status === 'Ready for Submission' && (
                            <div className="mb-5">
                                <ComponentsFormDatePickerBasic label="Out Scan to Embassy Date" id={'outscantoembassy'} isEdit={isEdit} setAddData={setAddUser} addData={addUser} />
                            </div>
                        )}

                        {addUser?.visa_status === 'Out Scan to Embassy' && (
                            <div className="dropdown">
                                <label htmlFor="wheresubmitted">Where Submitted?</label>
                                <select className="form-input" defaultValue="" id="wheresubmitted" onChange={(e) => handleInputChange(e)} value={addUser?.wheresubmitted}>
                                    <option value="" disabled={true}>
                                        WhereSubmitted?
                                    </option>
                                    <option value="VFS Bangalore">VFS Bangalore</option>
                                    <option value="VFS Chennai">VFS Chennai</option>
                                    <option value="Travel1">Travel1</option>
                                </select>
                            </div>
                        )}
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
                                {userNotes?.map((notes: any, index: number) => (
                                    <div key={index} className="mt-2 flex items-center justify-between rounded border p-2">
                                        <div>{notes.note}</div>
                                        <div className="flex items-center">
                                            <button className="btn btn-outline-primary btn-sm mr-2" onClick={() => handleEditNoteClick(index)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteNote(index)}>
                                                Delete
                                            </button>
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
                                        value={userNote}
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
