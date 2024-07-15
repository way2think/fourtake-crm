import MarkdownEditor from '@/components/Reusable/Markdown-Editor/MarkDownEditor';
import VisafeeEditor from '@/components/Reusable/Markdown-Editor/VisafeeEditor';
import VisafeeEditorJodit from '@/components/Reusable/Markdown-Editor/VisafeeEditorJodit';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import NewComponentsFormsFileUploadMultiple from '@/components/Reusable/file-upload/NewComponentsFormsFileUploadSingle';
import ComponentsFormsFileUploadSingle from '@/components/Reusable/file-upload/components-forms-file-upload-single';
import IconX from '@/components/icon/icon-x';

interface ListVisaApplicationListLineProps {
    isOpen: any;
    setIsOpen: any;
}

const ListVisaApplicationListLine: React.FC<ListVisaApplicationListLineProps> = ({ isOpen, setIsOpen }) => {
    return (
        <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} width="max-w-4xl">
            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Add Visa Checklist</h5>
                <button
                    onClick={() => {
                        setIsOpen(false);
                        
                    }}
                    type="button"
                    className="text-white-dark hover:text-dark"
                >
                    <IconX />
                </button>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="mb-5">
                            <label htmlFor="firstname">Reference No</label>
                            <input id="firstname" type="text" placeholder="Enter First Name" className="form-input" disabled value={'12345678'} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastname">Passport No</label>
                            <input id="lastname" type="text" placeholder="Enter Last Name" className="form-input" disabled value={'PS12L458'}/>
                        </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="mb-5">
                            <label htmlFor="firstname">Passport 1</label>
                            <input id="firstname" type="text" placeholder="Enter First Name" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastname">Passport 2</label>
                            <input id="lastname" type="text" placeholder="Enter Last Name" className="form-input" />
                        </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="mb-5">
                            <label htmlFor="firstname">Passport 3</label>
                            <input id="firstname" type="text" placeholder="Enter First Name" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastname">Passport 4</label>
                            <input id="lastname" type="text" placeholder="Enter Last Name" className="form-input" />
                        </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="mb-5">
                            <label htmlFor="firstname">Passport 5</label>
                            <input id="firstname" type="text" placeholder="Enter First Name" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastname">Passport 6</label>
                            <input id="lastname" type="text" placeholder="Enter Last Name" className="form-input" />
                        </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="mb-5">
                            <label htmlFor="firstname">Passport 7</label>
                            <input id="firstname" type="text" placeholder="Enter First Name" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastname">Passport 8</label>
                            <input id="lastname" type="text" placeholder="Enter Last Name" className="form-input" />
                        </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="mb-5">
                            <label htmlFor="firstname">Embassy Ref</label>
                            <input id="firstname" type="text" placeholder="Enter First Name" className="form-input" />
                        </div>
                </div>
                
                <div className="mt-4 flex items-center justify-end">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            
                        }}
                        type="button"
                        className="btn btn-outline-danger"
                    >
                        Cancel
                    </button>
                    <button  type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                        Save
                    </button>
                </div>
            </div>
        </ActionModal>
    );
};

export default ListVisaApplicationListLine;
