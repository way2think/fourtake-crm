import ActionModal from '@/components/Reusable/Modal/ActionModal';
import IconX from '@/components/icon/icon-x';

interface EntryTypesActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    editData?: any;
}

const EntryTypesActionModal: React.FC<EntryTypesActionModalProps> = ({ isOpen, setIsOpen, handleSave, editData }) => {
    return (
        <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-xl">
            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Add Country</h5>
                <button onClick={() => setIsOpen(false)} type="button" className="text-white-dark hover:text-dark">
                    <IconX />
                </button>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                    <div className="mb-5">
                        <label htmlFor="visatype">Entry Type*</label>
                        <input id="countrysname" type="text" placeholder="Enter Country Name" className="form-input" />
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

export default EntryTypesActionModal;
