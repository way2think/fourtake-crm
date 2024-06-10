import IconX from '@/components/icon/icon-x';
import ComponentsFormsFileUploadMulti from '../../Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '../../Reusable/file-upload/components-forms-file-upload-single';
import ActionModal from '@/components/Reusable/Modal/ActionModal';

interface EmbassyActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    editData?: any;
}
const EmbassyActionModal: React.FC<EmbassyActionModalProps> = ({ isOpen, setIsOpen, handleSave, editData }) => {
    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Add Embassy</h5>
                    <button onClick={() => setIsOpen(false)} type="button" className="text-white-dark hover:text-dark">
                        <IconX />
                    </button>
                </div>

                <div className="p-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                        <div className="dropdown">
                            <label htmlFor="role">Embassy / VFS</label>
                            <select className="form-input" defaultValue="" id="role">
                                <option value="" disabled={true}>
                                    Embassy / VFS
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
                            <label htmlFor="visacountry">Visa Country</label>
                            <select className="form-input" defaultValue="" id="visacountry">
                                <option value="" disabled={true}>
                                    Visa Country
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
                            <label htmlFor="jurisdiction">Jurisdiction</label>
                            <select className="form-input" defaultValue="" id="jurisdiction">
                                <option value="" disabled={true}>
                                    Jurisdiction
                                </option>
                                <option value="Chennai">Chennai</option>
                                <option value="Vellore">Vellore</option>
                                <option value="Bengaluru">Bengaluru</option>
                                <option value="New Delhi">New Delhi</option>
                                <option value="Mangalore">Mangalore</option>
                                <option value="Mumbai">Mumbai</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5 mt-4">
                            <label htmlFor="name">Name</label>
                            <input id="name" type="tel" placeholder="Enter Name" className="form-input" />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5">
                            <label htmlFor="address">Address</label>
                            <textarea id="address" rows={3} placeholder="Enter Address Details" className="form-textarea min-h-[80px] resize-none"></textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown">
                            <label htmlFor="city">City</label>
                            <select className="form-input" defaultValue="" id="city">
                                <option value="" disabled={true}>
                                    City
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
                            <label htmlFor="state">State</label>
                            <select className="form-input" defaultValue="" id="state">
                                <option value="" disabled={true}>
                                    State
                                </option>
                                <option value="Chennai">Chennai</option>
                                <option value="Vellore">Vellore</option>
                                <option value="Bengaluru">Bengaluru</option>
                                <option value="New Delhi">New Delhi</option>
                                <option value="Mangalore">Mangalore</option>
                                <option value="Mumbai">Mumbai</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5 mt-5">
                            <label htmlFor="telephone">Telephone</label>
                            <input id="telephone" type="tel" placeholder="Enter Telephone" className="form-input" />
                        </div>
                        <div className="mb-5 mt-5">
                            <label htmlFor="fax">Fax</label>
                            <input id="fax" type="tel" placeholder="Enter Fax" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="mail">Email</label>
                            <input id="mail" type="tel" placeholder="Enter Email" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="submissiondetails">Submission Details</label>
                            <input id="submissiondetails" type="text" placeholder="Enter Submission Details" className="form-input" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="collectiondetails">Collection Details</label>
                            <input id="collectiondetails" type="tel" placeholder="Enter Collection Details" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="processingtime">Processing Time</label>
                            <input id="processingtime" type="text" placeholder="Enter Processing Time" className="form-input" />
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end">
                        <button onClick={() => setIsOpen(false)} type="button" className="btn btn-outline-danger">
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

export default EmbassyActionModal;