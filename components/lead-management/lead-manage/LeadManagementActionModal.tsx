import IconX from '@/components/icon/icon-x';
import ComponentsFormsFileUploadMulti from '../../Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '../../Reusable/file-upload/components-forms-file-upload-single';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import ComponentsFormDatePickerBasic from './components-form-date-picker-basic';
import ComponentsFormDatePickerTime from './components-form-date-picker-time';
import TableLayout from '@/components/layouts/table-layout';
import { useEffect, useState } from 'react';
import AddNote from '@/components/popup/LeadListAddNote';

interface LeadManagementActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
    isEdit?: any;
    setIsEdit?: any;
}
const LeadManagementActionModal: React.FC<LeadManagementActionModalProps> = ({ isEdit, setIsEdit, isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {

    const [isOpenAddNote, setIsOpenAddNote] = useState(false);
    const [leadNote, setLeadNote] = useState<string>(''); // Add state for the textarea


    const [setMail, setSetEmail] = useState<string>();
    const [docPickup, setDocPickup] = useState(false);
    console.log(docPickup)
    debugger;
    const initialFollowUps = [
        {
            interactionType: 'Call',
            status: 'Open',
            nextFollowUp: '2024-07-01',
            remarks: 'First follow-up call',
            createdDate: '2024-06-01'
        },
        {
            interactionType: 'Email',
            status: 'In-progress',
            nextFollowUp: '2024-07-05',
            remarks: 'Sent email for document submission',
            createdDate: '2024-06-05'
        }
    ];
    const [followUps, setFollowUps] = useState(initialFollowUps);
    useEffect(() => {
        if (addData.email) {
            setSetEmail(addData.email);
        }
        if (addData.docpickupdate) {
            //setDocPickup(true)
        }
    }, [addData]);
    const handleCheckBoxChange = (e: any) => {
        const { id, checked } = e.target;
        setAddData((prev: any) => ({ ...prev, [id]: checked }));
    };

    const handleButtonClickShowAddNote = () => {
        // Your button click logic here
        setIsOpenAddNote(true)
        // You can perform additional actions here
    };
    const handleLeadNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLeadNote(e.target.value);
    };

    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Add Lead</h5>
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
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5">
                            <ComponentsFormDatePickerBasic label="Create Date" id={'createdate'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="name">Applicant Name </label>
                            <input id="name" type="text" onChange={(e) => handleInputChange(e)} value={addData?.name} placeholder="Enter Applicant Name" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone">Mobile Number </label>
                            <input id="phone" value={addData?.phone} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Mobile Number" className="form-input" />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="email">Email </label>
                            <input id="email" value={addData?.email} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Email" className="form-input" />
                        </div>
                        <div className="dropdown mb-5">
                            <label htmlFor="country">Country</label>
                            <select className="form-input" defaultValue="" id="country" value={addData?.country} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Country
                                </option>
                                <option value="Canada">Canada</option>
                                <option value="India">India</option>
                                <option value="Usa">Usa</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown mb-5">
                            <label htmlFor="stateofresidence">State of Residence</label>
                            <select className="form-input" defaultValue="" id="stateofresidence" value={addData?.stateofresidence} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Select State
                                </option>
                                <option value="Canada">Tamil Nadu</option>
                                <option value="India">Kernataka</option>
                                <option value="Usa">AP</option>
                            </select>
                        </div>
                        <div className="dropdown mb-5">
                            <label htmlFor="visatype">Visa Type</label>
                            <select className="form-input" defaultValue="" id="visatype" value={addData?.visatype} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Visa Type
                                </option>
                                <option value="Business Type">Business Visa</option>
                                <option value="Vistor Visa">Vistor Visa</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="numberofapplicants">No of Applicants </label>
                            <input
                                id="numberofapplicants"
                                value={addData?.numberofapplicants}
                                onChange={(e) => handleInputChange(e)}
                                type="text"
                                placeholder="Enter No of Applicants "
                                className="form-input"
                            />
                        </div>
                        <div className="mb-5">
                            <ComponentsFormDatePickerBasic label="Travel Date" id={'traveldate'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown mb-5">
                            <label htmlFor="leadtype">Lead Type</label>
                            <select className="form-input" defaultValue="" id="leadtype" value={addData?.leadtype} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Lead Type
                                </option>
                                <option value="cold">Cold</option>
                                <option value="warm">Warm</option>
                                <option value="hot">Hot</option>
                            </select>
                        </div>

                        <div className="dropdown mb-5">
                            <label htmlFor="source">Source</label>
                            <select className="form-input" defaultValue="" id="source" value={addData?.source} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Source
                                </option>
                                <option value="Google">Google</option>
                                <option value="Website">Website</option>
                                <option value="Previous customer">Previous Customer</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div className="dropdown mb-5">
                            <label htmlFor="source">Assignee</label>
                            <select className="form-input" defaultValue="" id="assignee" value={addData?.assignee} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Assignee
                                </option>
                                <option value="Sanjay">Sanjay</option>
                                <option value="Bujji">Bujji</option>
                                <option value="raji">raji</option>
                                <option value="santhosh">Santhosh</option>
                            </select>
                        </div>


                    </div>

                    {isEdit && (
                        <>
                            {' '}
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="dropdown mb-5">
                                    <label htmlFor="stage">Stage</label>
                                    <select
                                        className="form-input"
                                        defaultValue=""
                                        id="stage"
                                        value={addData?.stage}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            if (e.target.value == 'Doc pick up') {
                                                setDocPickup(true);
                                            }
                                        }}
                                    >
                                        <option value="" disabled={true}>
                                            Stage
                                        </option>
                                        <option value="Fresh">Fresh</option>
                                        <option value="Attempted">Attempted</option>
                                        <option value="Interested">Interested</option>
                                        <option value="Not interested">Not interested</option>
                                        <option value="Doc pick up">Doc pick up</option>
                                        <option value="Doc picked up">Doc picked up</option>
                                    </select>
                                </div>
                                <div className="dropdown mb-5">
                                    <label htmlFor="status">Status</label>
                                    <select className="form-input" defaultValue="" id="status" value={addData?.status} onChange={(e) => handleInputChange(e)}>
                                        <option value="Status" disabled={true}>
                                            Status
                                        </option>
                                        <option value="open">Open</option>
                                        <option value="In-progress">In-progress</option>
                                        <option value="Closed">Closed</option>
                                        <option value="Done ">Done </option>
                                    </select>
                                </div>
                            </div>
                            {docPickup && (
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                    <div className="mb-5">
                                        <ComponentsFormDatePickerBasic label="Document pickup Date" id={'docpickupdate'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="docpickupremarks">Remarks</label>
                                        <textarea
                                            id="docpickupremarks"
                                            rows={1}
                                            value={addData?.docpickupremarks}
                                            onChange={(e) => handleInputChange(e)}
                                            placeholder="Enter Remarks"
                                            className="form-textarea min-h-[10px] resize-none"
                                        ></textarea>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                                <div className="mb-5">
                                    <label htmlFor="mail">Email</label>
                                    <div className="flex">
                                        <input
                                            id="mail"
                                            type="text"
                                            placeholder="Enter Email"
                                            value={setMail}
                                            onChange={(e) => setSetEmail(e.target.value)}
                                            className="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                        />
                                        <button type="button" className="btn btn-primary ltr:rounded-l-none rtl:rounded-r-none">
                                            Send
                                        </button>
                                    </div>
                                </div>
                                {/* <div className="dropdown mb-5">
                                    <label htmlFor="leadmanage">Lead Managed by</label>
                                    <select className="form-input" defaultValue="" id="assignee" value={addData?.assignee} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Select Assignee
                                        </option>
                                        <option value="Sanjay">Sanjay</option>
                                        <option value="Bujji">Bujji</option>
                                        <option value="raji">raji</option>
                                        <option value="santhosh">Santhosh</option>
                                    </select>
                                </div> */}
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2  ">
                                <div className="mb-5">
                                    <ComponentsFormDatePickerBasic label="Next Follow-up Date " id={'nextfollowupdate'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
                                </div>
                                <div className="mb-5">
                                    <ComponentsFormDatePickerTime id={'followuptime'} isEdit={isEdit} setAddData={setAddData} addData={addData} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div className="dropdown mb-5">
                                    <label htmlFor="interaction">Type of Interaction*</label>
                                    <select className="form-input" defaultValue="" id="interaction" value={addData?.interaction} onChange={(e) => handleInputChange(e)}>
                                        <option value="" disabled={true}>
                                            Type of Interaction
                                        </option>
                                        <option value="SMS">SMS</option>
                                        <option value="Call">Call</option>
                                        <option value="Email">Email</option>
                                        <option value="Whatapp">Whatapp</option>
                                    </select>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="follupremark">Followup Remarks</label>
                                    <textarea
                                        id="follupremark"
                                        rows={1}
                                        value={addData?.follupremark}
                                        onChange={(e) => handleInputChange(e)}
                                        placeholder="Enter FollowUp Remarks"
                                        className="form-textarea
                                min-h-[10px] resize-none"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
                                <div className="mb-5">
                                    <label htmlFor="leadnote" style={{ display: 'inline-block' }}>Lead Note</label>
                                    <button className="btn btn-primary ml-5" style={{ marginLeft: '20px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', display: 'inline-block' }}
                                        onClick={handleButtonClickShowAddNote}
                                    >
                                        Add Note
                                    </button>

                                    <textarea
                                        id="leadnote"
                                        rows={3}
                                        value={addData?.leadnote}
                                        onChange={(e) => handleInputChange(e)}
                                        placeholder="Enter Lead Note"
                                        className="form-textarea
                                min-h-[80px] resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            {/* Add the table here */}
                            <div className="mt-8">
                                <h5 className="text-lg font-bold mb-4">Follow Up History</h5>
                                <table className="min-w-full bg-white border">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">Follow Up No</th>
                                            <th className="py-2 px-4 border-b">Interaction Type</th>
                                            <th className="py-2 px-4 border-b">Status</th>
                                            <th className="py-2 px-4 border-b">Next Follow Up</th>
                                            <th className="py-2 px-4 border-b">Remarks</th>
                                            <th className="py-2 px-4 border-b">Created Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Render follow-up details here */}
                                        {followUps.map((followUp, index) => (
                                            <tr key={index}>
                                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                                <td className="py-2 px-4 border-b">{followUp.interactionType}</td>
                                                <td className="py-2 px-4 border-b">{followUp.status}</td>
                                                <td className="py-2 px-4 border-b">{followUp.nextFollowUp}</td>
                                                <td className="py-2 px-4 border-b">{followUp.remarks}</td>
                                                <td className="py-2 px-4 border-b">{followUp.createdDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                    {/* <TableLayout
                        title="Lead List"
                        setData={setData}
                        filterby="country"
                        handleDelete={handleDelete}
                        data={data}
                        totalPages={data?.length || 0}
                        tableColumns={tableColumns}
                        exportColumns={exportColumns}
                        ActionModal={LeadManagementActionModal}
                        Filtersetting={Filtersetting}
                        handleSubmit={handleSubmit}
                    /> */}

                    <div className="mt-8 flex items-center justify-end">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setAddData({});
                                setIsEdit(false);
                            }}
                            type="button"
                            className="btn btn-outline-danger"
                        >
                            Cancel
                        </button>
                        <button onClick={handleSave} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                            Create
                        </button>
                    </div>



                </div>
            </ActionModal>

            <ActionModal isOpen={isOpenAddNote} setIsOpen={setIsOpenAddNote} handleSave={handleSave} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Lead Note</h5>
                    <button
                        onClick={() => {
                            setIsOpenAddNote(false);
                            setAddData({});
                            setIsEdit(true);
                        }}
                        type="button"
                        className="text-white-dark hover:text-dark"
                    >
                        <IconX />
                    </button>
                </div>
                <div className="p-5">
                    <textarea
                        id="leadnote"
                        rows={3}
                        value={leadNote} // Bind the textarea value to the state
                        onChange={handleLeadNoteChange} // Add onChange handler to update the state
                        placeholder="Enter Lead Note"
                        className="form-textarea min-h-[150px] resize-none"
                    ></textarea>
                    <textarea
                        id="leadnote"
                        rows={3}
                        value={addData?.leadnote}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Enter Lead Note"
                        className="form-textarea
                                min-h-[80px] resize-none"
                    ></textarea>
                    <input
                                            id="mail"
                                            type="text"
                                            placeholder="Enter Email"
                                            value={setMail}
                                            onChange={(e) => setSetEmail(e.target.value)}
                                            className="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                        />
                    
                    <div className="mt-8 flex items-center justify-end">
                        <button
                            onClick={() => {
                                setIsOpenAddNote(false);
                                setAddData({});
                                setIsEdit(true);
                            }}
                            type="button"
                            className="btn btn-outline-danger"
                        >
                            Cancel
                        </button>
                        <button onClick={handleSave} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                            Create
                        </button>
                    </div>
                </div>
            </ActionModal>
        </>
    );
};

export default LeadManagementActionModal;
