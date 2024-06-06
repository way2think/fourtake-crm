import React from 'react';

const Table: React.FC<any> = ({ data, editUser, setIsEdit }) => {
    return (
        <table className="table-striped table-hover">
            <thead>
                <tr>
                    <th>SNo</th>
                    <th>Frist Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Center </th>
                    <th>Status</th>
                    <th>Phone</th>
                    <th className="!text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((contact: any, index: number) => {
                    return (
                        <tr key={contact.id}>
                            <td>
                                <div className="flex w-max items-center">
                                    <div>{contact.id}</div>
                                </div>
                            </td>
                            <td>
                                <div className="flex w-max items-center">
                                    <div>{contact.firstname}</div>
                                </div>
                            </td>
                            <td>
                                <div className="flex w-max items-center">
                                    <div>{contact.lastname}</div>
                                </div>
                            </td>
                            <td>{contact.email}</td>
                            <td className="whitespace-nowrap">{contact.role}</td>
                            <td className="whitespace-nowrap">{contact.center}</td>
                            <td className="whitespace-nowrap">{contact.status ? 'Active' : 'Inactive'}</td>
                            <td className="whitespace-nowrap">{contact.phone}</td>
                            <td>
                                <div className="flex items-center justify-center gap-4">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => {
                                            editUser(contact);
                                            setIsEdit(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    {/* <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(contact)}>
                                    Delete
                                </button> */}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
