import IconX from '@/components/icon/icon-x';
import ComponentsFormsFileUploadMulti from '../../Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '../../Reusable/file-upload/components-forms-file-upload-single';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import ComponentsFormsSelectMultiselect from '@/components/Reusable/select/components-forms-select-multiselect';

interface EmbassyActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}
interface OptionType {
    value: string;
    label: string;
}
const EmbassyActionModal: React.FC<EmbassyActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    const options: OptionType[] = [
        { value: 'Chennai', label: 'Chennai' },
        { value: 'Vellore', label: 'Vellore' },
        { value: 'Bengaluru', label: 'Bengaluru' },
        { value: 'New Delhi', label: 'New Delhi' },
        { value: 'Mangalore', label: 'Work Visa' },
        { value: 'Mumbai', label: 'Mumbai' },
    ];
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
                            <label htmlFor="embassy/vfs">Embassy / VFS</label>
                            <select className="form-input" defaultValue="" id="embassy" onChange={(e) => handleInputChange(e)} value={addData?.embassy}>
                                <option value="" disabled={true}>
                                    Embassy / VFS
                                </option>
                                <option value="embassy">Embassy</option>
                                <option value="vfs">VFS</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="visacountry">Visa Country</label>
                            <select className="form-input" defaultValue="" id="country" onChange={(e) => handleInputChange(e)} value={addData?.country}>
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
                            {/* <select className="form-input" defaultValue="" id="jurisdiction" onChange={(e) => handleInputChange(e)} value={addData?.jurisdiction}>
                                <option value="" disabled={true}>
                                    Jurisdiction
                                </option>
                                <option value="Chennai">Chennai</option>
                                <option value="Vellore">Vellore</option>
                                <option value="Bengaluru">Bengaluru</option>
                                <option value="New Delhi">New Delhi</option>
                                <option value="Mangalore">Mangalore</option>
                                <option value="Mumbai">Mumbai</option>
                            </select> */}
                            <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                <ComponentsFormsSelectMultiselect addData={addData} options={options} setAddData={setAddData} id={'jurisdiction'} />
                            </div>
                        </div>

                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5 mt-4">
                            <label htmlFor="name">Name</label>
                            <input id="name" type="tel" placeholder="Enter Name" className="form-input" onChange={(e) => handleInputChange(e)} value={addData?.name} />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5">
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                onChange={(e) => handleInputChange(e)}
                                value={addData?.address}
                                rows={3}
                                placeholder="Enter Address Details"
                                className="form-textarea min-h-[80px] resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown">
                            <label htmlFor="state">State</label>
                            <select className="form-input" defaultValue="" id="state" onChange={(e) => handleInputChange(e)} value={addData?.state}>
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
                        <div className="dropdown">
                            <label htmlFor="city">City</label>
                            <select className="form-input" defaultValue="" id="city" onChange={(e) => handleInputChange(e)} value={addData?.city}>
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
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5 mt-5">
                            <label htmlFor="telephone">Telephone</label>
                            <input id="phone" onChange={(e) => handleInputChange(e)} value={addData?.phone} type="tel" placeholder="Enter Telephone" className="form-input" />
                        </div>
                        <div className="mb-5 mt-5">
                            <label htmlFor="fax">Fax</label>
                            <input id="fax" onChange={(e) => handleInputChange(e)} value={addData?.fax} type="text" placeholder="Enter Fax" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="mail">Email</label>
                            <input id="mail" onChange={(e) => handleInputChange(e)} value={addData?.mail} type="email" placeholder="Enter Email" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="submissiondetails">Submission Details</label>
                            <input
                                id="submissiondetails"
                                onChange={(e) => handleInputChange(e)}
                                value={addData?.submissiondetails}
                                type="text"
                                placeholder="Enter Submission Details"
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="collectiondetails">Collection Details</label>
                            <input
                                id="collectiondetails"
                                onChange={(e) => handleInputChange(e)}
                                value={addData?.collectiondetails}
                                type="text"
                                placeholder="Enter Collection Details"
                                className="form-input"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="processingtime">Processing Time</label>
                            <input id="processingtime" onChange={(e) => handleInputChange(e)} value={addData?.processingtime} type="text" placeholder="Enter Processing Time" className="form-input" />
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
                            Save
                        </button>
                    </div>
                </div>
            </ActionModal>
        </>
    );
};

export default EmbassyActionModal;
