import ActionModal from '@/components/Reusable/Modal/ActionModal';
import PaginationTable from '@/components/Reusable/Table/PaginationTable';
import IconX from '@/components/icon/icon-x';
import ComponentsFormDatePickerBasic from '@/components/lead-management/lead-manage/components-form-date-picker-basic';

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
    const handleCheckBoxChange = (e: any) => {
        const { id, checked } = e.target;
        setAddUser((prev: any) => ({ ...prev, [id]: checked }));
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
                                    disabled={isEdit ? true : false}
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
                            <input type="checkbox" id="isgroup"  onChange={(e) => handleCheckBoxChange(e)} className="form-checkbox bg-white dark:bg-black" />
                            <span className="text-black">Is Primary?</span>
                        </label>
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
