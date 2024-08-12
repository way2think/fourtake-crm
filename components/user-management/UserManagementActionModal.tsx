import React from 'react';
import ActionModal from '../Reusable/Modal/ActionModal';
import IconX from '../icon/icon-x';
import { roles } from '@/entities/role.entity';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/user.store';
import { useGetCentersQuery } from '@/services/api/centerSlice';
import { Center } from '@/entities/center.entity';

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
    const { data: centers, isLoading, isError, error } = useGetCentersQuery(undefined);

    const currentUser = useSelector(selectUser);

    // console.log('currentUser', currentUser);

    const handleCheckBoxChange = (e: any) => {
        const { id, checked } = e.target;
        setAddData((prev: any) => ({ ...prev, [id]: checked }));
    };

    // console.log('centers', centers);

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
                    <div className="grid">
                        <div className="mb-5">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                disabled={isEdit ? true : false}
                                placeholder="Enter Username"
                                className="form-input"
                                value={addData?.username}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="firstname">First Name</label>
                            <input id="first_name" type="text" placeholder="Enter First Name" className="form-input" value={addData?.first_name} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastname">Last Name </label>
                            <input id="last_name" type="text" onChange={(e) => handleInputChange(e)} value={addData?.last_name} placeholder="Enter Last Name" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        {
                            <div className="mb-5">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
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
                    {!isEdit && (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                            <div className="mb-5">
                                <label htmlFor="password">Password</label>
                                <input id="password" value={addData?.password} onChange={(e) => handleInputChange(e)} type="password" placeholder="Enter Password" className="form-input" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <input
                                    id="confirm_password"
                                    value={addData?.confirm_password}
                                    onChange={(e) => handleInputChange(e)}
                                    type="password"
                                    placeholder="Enter Confirm Password"
                                    className="form-input"
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown">
                            <label htmlFor="center">Center</label>
                            <select
                                className="form-input"
                                defaultValue=""
                                id="center"
                                disabled={currentUser.role !== 'super_admin'}
                                onChange={(e) => handleInputChange(e)}
                                value={currentUser.role !== 'super_admin' ? currentUser?.center?.id : addData?.center?.id}
                            >
                                <option value="" disabled={true}>
                                    Select Center
                                </option>
                                {centers &&
                                    centers?.map((center: Center) => (
                                        <option key={center.id} value={center.id}>
                                            {center.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="role">Role</label>
                            <select className="form-input" defaultValue="" id="role" onChange={(e) => handleInputChange(e)} value={addData?.role}>
                                <option value="" disabled={true}>
                                    Select Role
                                </option>
                                {roles
                                    .filter((role) => currentUser.role === 'super_admin' || role.value !== 'super_admin')
                                    .map((role) => (
                                        <option key={role.name} value={role.value}>
                                            {role.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5 mt-8">
                            <label className="flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    onChange={(e) => handleCheckBoxChange(e)}
                                    checked={addData?.is_active || false}
                                    className="form-checkbox  bg-white dark:bg-black"
                                />
                                <span className="text-white-dark">Active</span>
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
