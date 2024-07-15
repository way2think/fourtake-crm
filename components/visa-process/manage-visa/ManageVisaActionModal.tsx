import ActionModal from '@/components/Reusable/Modal/ActionModal';
import PaginationTable from '@/components/Reusable/Table/PaginationTable';
import IconX from '@/components/icon/icon-x';
import ComponentsFormDatePickerBasic from '@/components/lead-management/lead-manage/components-form-date-picker-basic';
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
    const [leadNote, setLeadNote] = useState<string>(''); // Add state for the textarea
    const [leadNotes, setLeadNotes] = useState<string[]>(addUser.leadnote || []); // State for storing
    const [modalTitle, setModalTitle] = useState<string>('Add Note');
    const [actionButtonText, setActionButtonText] = useState<string>('Add Note');
    const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Track index for editing

    useEffect(() => {
        setLeadNotes(addUser.leadnote || []);
    }, [addUser?.leadnote]);


    const handleCheckBoxChange = (e: any) => {
        //Change it 13-07-2024
        // const { id, checked } = e.target;
        // setAddUser((prev: any) => ({ ...prev, [id]: checked ? "Yes" : "No"}));

        const { id, checked } = e.target;

        if (checked && applicantDetails.some((applicant: { isprimary: string }) => applicant.isprimary === 'Yes')) {
            if (confirm('You already selected a Primary. Do you want to change it?')) {
                setApplicantDetails((prevState: any[]) => prevState.map((applicant: { isprimary: string }) => (applicant.isprimary === 'Yes' ? { ...applicant, isprimary: 'No' } : applicant)));
            } else {
                return;
            }
        }

        setAddUser((prevState: any) => ({
            ...prevState,
            [id]: checked ? 'Yes' : 'No',
        }));
    };

    const handleLeadNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setLeadNote(event.target.value);
    };

    const handleButtonClickShowAddNote = () => {
        setIsOpenAddNote(true);
        setModalTitle('Add Note');
        setActionButtonText('Add Note');
        setLeadNote('');

        setCurrentIndex(null); // Reset index when adding a new note
    };

    const handleEditNoteClick = (index: number) => {
        setIsOpenAddNote(true);
        setModalTitle('Edit Note');
        setActionButtonText('Save');
        setLeadNote(leadNotes[index]);
        setCurrentIndex(index); // Set index for editing
    };

    const handleDeleteNote = (index: number) => {
        const updatedNotes = [...leadNotes];
        updatedNotes.splice(index, 1);
        setLeadNotes(updatedNotes);
    };

    const handleCloseModal = () => {
        setIsOpenAddNote(false);
        setModalTitle('Add Note');
        setActionButtonText('Add Note');
        setLeadNote('');
        setCurrentIndex(null); // Reset index when closing modal
    };

    const handleNoteAction = () => {
        if (modalTitle === 'Edit Note' && currentIndex !== null) {
            const updatedNotes = [...leadNotes];
            updatedNotes[currentIndex] = leadNote;
            setLeadNotes(updatedNotes);
            setAddUser({ ...addUser, leadnote: updatedNotes });
        } else {
            const updatedNotes = [...leadNotes, leadNote];
            setLeadNotes(updatedNotes);
            setAddUser({ ...addUser, leadnote: updatedNotes });
        }
        handleCloseModal();
    };

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
                            <label htmlFor="firstname">First Name</label>
                            <input id="firstname" type="text" placeholder="Enter First Name" className="form-input" value={addUser?.firstname} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastname">Last Name </label>
                            <input id="lastname" type="text" onChange={(e) => handleInputChange(e)} value={addUser?.lastname} placeholder="Enter Last Name" className="form-input" />
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
                            <label htmlFor="phone">Phone</label>
                            <input id="phone" value={addUser?.phone} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Phone" className="form-input" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="passportno">Passport No</label>
                            <input id="passportno" value={addUser?.passportno} onChange={(e) => handleInputChange(e)} type="passportno" placeholder="Enter Passport No" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <ComponentsFormDatePickerBasic label="DOB" id={'dob'} isEdit={isEdit} setAddData={setAddUser} addData={addUser} />
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
                            <label htmlFor="status">Status</label>
                            <select className="form-input" defaultValue="" id="status" onChange={(e) => handleInputChange(e)} value={addUser?.status}>
                                <option value="" disabled={true}>
                                    Select Status
                                </option>
                                <option value="Received">Received</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Ready for verification">Ready for verification</option>
                                <option value="Ready for Submission">Ready for Submission</option>
                                <option value="Out Scan to Embassy">Out Scan to Embassy</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        {addUser?.status === 'Ready for Submission' && (
                            <div className="mb-5">
                                <ComponentsFormDatePickerBasic label="Out Scan to Embassy Date" id={'outscantoembassy'} isEdit={isEdit} setAddData={setAddUser} addData={addUser} />
                            </div>
                        )}

                        {addUser?.status === 'Out Scan to Embassy' && (
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
                        <div className="mt-7">
                            <label className="flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    id="isprimary"
                                    onChange={(e) => handleCheckBoxChange(e)}
                                    className="form-checkbox bg-white dark:bg-black"
                                    checked={addUser.isprimary === 'Yes' || applicantDetails.length == 0}
                                />
                                <span className="text-black">Is Primary?</span>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-5 mt-7">
                                    <label htmlFor="leadnote" style={{ display: 'inline-block' }}>
                                        Note
                                    </label>
                                    <button className="btn btn-primary ml-5" style={{ marginLeft: '20px', display: 'inline-block' }} onClick={handleButtonClickShowAddNote}>
                                        Add Note
                                    </button>

                                    <div className="mt-3">
                                        {leadNotes?.map((note: string, index: number) => (
                                            <div key={index} className="mt-2 flex items-center justify-between rounded border p-2">
                                                <div>{note}</div>
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
                                                id="leadNote"
                                                onChange={handleLeadNoteChange}
                                                value={leadNote}
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
