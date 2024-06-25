import React from 'react';
import ActionModal from '../Reusable/Modal/ActionModal';
import IconX from '../icon/icon-x';

interface UserManagementActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
    isEdit?: any;
    setIsEdit?: any;
}

const UserManagementActionModal: React.FC<UserManagementActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData, isEdit, setIsEdit }) => {
    const handleCheckBoxChange = (e: any) => {
        const { id, checked } = e.target;
        setAddData((prev: any) => ({ ...prev, [id]: checked }));
    };
    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Add User</h5>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setAddData({});
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
                            <input id="firstname" type="text" placeholder="Enter First Name" className="form-input" value={addData?.firstname} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastname">Last Name </label>
                            <input id="lastname" type="text" onChange={(e) => handleInputChange(e)} value={addData?.lastname} placeholder="Enter Last Name" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        {
                            <div className="mb-5">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    disabled={isEdit ? true : false}
                                    value={addData?.email}
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
                            <input id="phone" value={addData?.phone} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Phone" className="form-input" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="password">Password</label>
                            <input id="password" value={addData?.password} onChange={(e) => handleInputChange(e)} type="password" placeholder="Enter Password" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="confirmpassword">Confirm Password</label>
                            <input
                                id="confirmpassword"
                                value={addData?.confirmpassword}
                                onChange={(e) => handleInputChange(e)}
                                type="password"
                                placeholder="Enter Confirm Password"
                                className="form-input"
                            />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown">
                            <label htmlFor="center">Center</label>
                            <select className="form-input" defaultValue="" id="center" onChange={(e) => handleInputChange(e)} value={addData?.center}>
                                <option value="" disabled={true}>
                                    Select Center
                                </option>
                                <option value="Chennai">Chennai</option>
                                <option value="Vellore">Vellore</option>
                                <option value="Bengaluru">Bengaluru</option>
                                <option value="New Delhi">New Delhi</option>
                                <option value="Mangalore">Mangalore</option>
                                <option value="Mumbai">Mumbai</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="role">Role</label>
                            <select className="form-input" defaultValue="" id="role" onChange={(e) => handleInputChange(e)} value={addData?.role}>
                                <option value="" disabled={true}>
                                    Select Role
                                </option>
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                                <option value="accountant">Accountant</option>
                                <option value="agent">Agent</option>
                                <option value="corporate">Corporate</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5 mt-8">
                            <label className="flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    id="status"
                                    // value={addData?.ispopular}
                                    onChange={(e) => handleCheckBoxChange(e)}
                                    checked={addData?.status || false}
                                    className="form-checkbox  bg-white dark:bg-black"
                                />
                                <span className="text-white-dark">IsActive </span>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5">
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                rows={3}
                                value={addData?.address}
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Enter Address "
                                className="form-textarea min-h-[80px] resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end">
                        <button onClick={handleSave} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4 ">
                            Save
                        </button>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setAddData({});
                                setIsEdit(false);
                            }}
                            type="button"
                            className="btn btn-outline-danger ml-3"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </ActionModal>
        </>
    );
};

export default UserManagementActionModal;
