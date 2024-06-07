import MarkdownEditor from '@/components/Reusable/Markdown-Editor/MarkDownEditor';
import VisafeeEditor from '@/components/Reusable/Markdown-Editor/VisafeeEditor';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import ComponentsFormsFileUploadSingle from '@/components/Reusable/file-upload/components-forms-file-upload-single';
import IconX from '@/components/icon/icon-x';

interface VisaChecklistActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    editData?: any;
}

const VisaChecklistActionModal: React.FC<VisaChecklistActionModalProps> = ({ isOpen, setIsOpen, handleSave, editData }) => {
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
                        <select className="form-input" defaultValue="" id="role">
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
                        <select className="form-input" defaultValue="" id="role">
                            <option value="" disabled={true}>
                                Visa Category
                            </option>
                            <option value="Chennai">Business Visa</option>
                            <option value="Vellore">Visitor Visa</option>
                        </select>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        <label htmlFor="embassy">Embassy*</label>
                        <textarea id="embassy" rows={3} placeholder="Enter Embassy" className="form-textarea min-h-[80px] resize-none"></textarea>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        <MarkdownEditor />
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        <VisafeeEditor />
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        <ComponentsFormsFileUploadSingle />
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
