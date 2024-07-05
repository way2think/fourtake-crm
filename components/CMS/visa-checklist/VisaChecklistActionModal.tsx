import MarkdownEditor from '@/components/Reusable/Markdown-Editor/MarkDownEditor';
import VisafeeEditor from '@/components/Reusable/Markdown-Editor/VisafeeEditor';
import VisafeeEditorJodit from '@/components/Reusable/Markdown-Editor/VisafeeEditorJodit';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import ComponentsFormsFileUploadSingle from '@/components/Reusable/file-upload/components-forms-file-upload-single';
import IconX from '@/components/icon/icon-x';

interface VisaChecklistActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}

const VisaChecklistActionModal: React.FC<VisaChecklistActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    
    return (
        <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-4xl">
            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Add Visa Checklist</h5>
                <button onClick={() => setIsOpen(false)} type="button" className="text-white-dark hover:text-dark">
                    <IconX />
                </button>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="dropdown">
                        <label htmlFor="role">Countries*</label>
                        <select className="form-input" defaultValue="" id="country" value={addData?.country} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Countries
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
                        <label htmlFor="role">Visa Category*</label>
                        <select className="form-input" defaultValue="" id="visatype" value={addData?.visatype} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled={true}>
                                Visa Type
                            </option>
                            <option value="Chennai">Business Visa</option>
                            <option value="Vellore">Visitor Visa</option>
                        </select>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        <label htmlFor="embassy">Embassy*</label>
                        <textarea
                            id="embassy"
                            rows={3}
                            placeholder="Enter Embassy"
                            className="form-textarea min-h-[80px] resize-none"
                            value={addData?.embassy}
                            onChange={(e) => handleInputChange(e)}
                        ></textarea>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        {/* <MarkdownEditor handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} /> */}
                        <label htmlFor="Checklist">Checklist*</label>
                        <VisafeeEditorJodit  handleInputChange={handleInputChange} setAddData={setAddData} addData={addData}/>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        {/* <VisafeeEditor handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} /> */}
                        <label htmlFor="Checklist">Visa Fee information*</label>
                        <VisafeeEditorJodit  handleInputChange={handleInputChange} setAddData={setAddData} addData={addData}/>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        <ComponentsFormsFileUploadSingle setAddData={setAddData} addData={addData} />
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <button onClick={() => setIsOpen(false)} type="button" className="btn btn-outline-danger">
                        Cancel
                    </button>
                    <button onClick={handleSave} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                        Save
                    </button>
                </div>
            </div>
        </ActionModal>
    );
};

export default VisaChecklistActionModal;
