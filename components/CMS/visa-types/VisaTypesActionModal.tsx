import ActionModal from '@/components/Reusable/Modal/ActionModal';
import IconX from '@/components/icon/icon-x';

interface VisaTypesActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}
const VisaTypesActionModal: React.FC<VisaTypesActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    return (
        <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-xl">
            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Add Visa</h5>
                <button onClick={() => setIsOpen(false)} type="button" className="text-white-dark hover:text-dark">
                    <IconX />
                </button>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                    <div className="mb-5">
                        <label htmlFor="visatype">Visa Type*</label>
                        <input id="visatype" type="text" onChange={(e) => handleInputChange(e)} value={addData?.visatype} placeholder="Enter Visa Type" className="form-input" />
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
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
    );
};

export default VisaTypesActionModal;
