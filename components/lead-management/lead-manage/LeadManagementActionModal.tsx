import IconX from '@/components/icon/icon-x';
import ComponentsFormsFileUploadMulti from '../../Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '../../Reusable/file-upload/components-forms-file-upload-single';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import ComponentsFormDatePickerBasic from './components-form-date-picker-basic';

interface LeadManagementActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}
const LeadManagementActionModal: React.FC<LeadManagementActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    const handleCheckBoxChange = (e: any) => {
        const { id, checked } = e.target;
        setAddData((prev: any) => ({ ...prev, [id]: checked }));
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
                            <ComponentsFormDatePickerBasic label="Date" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="name">Applicant Name </label>
                            <input id="name" type="text" onChange={(e) => handleInputChange(e)} value={addData?.language} placeholder="Enter Applicant Name" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phone">Mobile Number </label>
                            <input id="phone" value={addData?.capital} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Mobile Number" className="form-input" />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="email">Email </label>
                            <input id="email" value={addData?.cities} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Email" className="form-input" />
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
                            <label htmlFor="visatype">Visa Type</label>
                            <select className="form-input" defaultValue="" id="visatype" value={addData?.country} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Visa Type
                                </option>
                                <option value="Business Type">Business Visa</option>
                                <option value="Vistor Visa">Vistor Visa</option>
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="applicants">No of Applicants </label>
                            <input id="applicants" value={addData?.cities} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter No of Applicants " className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <ComponentsFormDatePickerBasic label="Travel Date" />
                        </div>
                        <div className="dropdown mb-5">
                            <label htmlFor="leadtype">Lead Type</label>
                            <select className="form-input" defaultValue="" id="leadtype" value={addData?.country} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Lead Type
                                </option>
                                <option value="cold">Cold</option>
                                <option value="warn">Warn</option>
                                <option value="hot">Hot</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown mb-5">
                            <label htmlFor="leadmanage">Lead Manage</label>
                            <select className="form-input" defaultValue="" id="leadmanage" value={addData?.country} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Lead Manage
                                </option>
                                <option value="Sanjay">Sanjay</option>
                                <option value="Bujji">Bujji</option>
                                <option value="raji">raji</option>
                                <option value="raji">Santhosh</option>
                            </select>
                        </div>
                        <div className="dropdown mb-5">
                            <label htmlFor="source">Source</label>
                            <select className="form-input" defaultValue="" id="source" value={addData?.country} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Source
                                </option>
                                <option value="Google">Google</option>
                                <option value="Website">Website</option>
                                <option value="Previous customer">Previous Customer</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown mb-5">
                            <label htmlFor="stage">Stage</label>
                            <select className="form-input" defaultValue="" id="stage" value={addData?.country} onChange={(e) => handleInputChange(e)}>
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
                            <select className="form-input" defaultValue="" id="status" value={addData?.country} onChange={(e) => handleInputChange(e)}>
                                <option value="Status" disabled={true}>
                                    Status
                                </option>
                                <option value="Open">Open</option>
                                <option value="In-progress">In-progress</option>
                                <option value="Closed">Closed</option>
                                <option value="Done ">Done </option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown mb-5">
                            <label htmlFor="interaction">Type of Interaction*</label>
                            <select className="form-input" defaultValue="" id="interaction" value={addData?.country} onChange={(e) => handleInputChange(e)}>
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
                            <label htmlFor="mail">Email</label>
                            <div className="flex">
                                <input id="mail" type="text" placeholder="Enter Email" className="form-input ltr:rounded-r-none rtl:rounded-l-none" />
                                <button type="button" className="btn btn-secondary ltr:rounded-l-none rtl:rounded-r-none">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setAddData({});
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
