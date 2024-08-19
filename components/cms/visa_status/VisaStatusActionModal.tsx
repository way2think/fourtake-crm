import IconX from '@/components/icon/icon-x';
import ComponentsFormsFileUploadMulti from '../../Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '../../Reusable/file-upload/components-forms-file-upload-single';
import ActionModal from '@/components/Reusable/Modal/ActionModal';

interface VisaStatusActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}
const VisaStatusActionModal: React.FC<VisaStatusActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    const handleCheckBoxChange = (e: any) => {
        const { id, checked } = e.target;

        setAddData((prev: any) => ({ ...prev, [id]: checked }));
    };
    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Add Visa Status</h5>
                    <button onClick={() => setIsOpen(false)} type="button" className="text-white-dark hover:text-dark">
                        <IconX />
                    </button>
                </div>

                <div className="p-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5">
                            <label htmlFor="name">Visa Status</label>
                            <input id="name" type="text" placeholder="Enter Visa Status" className="form-input" value={addData?.name} onChange={(e) => handleInputChange(e)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown">
                            <label htmlFor="type">Status Type</label>
                            <select className="form-input" defaultValue="" id="type" value={addData?.type} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Status Type
                                </option>
                                <option value="Accounts">Accounts</option>
                                <option value="Operation">Operation</option>
                                <option value="News">News</option>
                            </select>
                        </div>
                        <div className="mt-7">
                            <label className="flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    id="isprimary"
                                    onChange={(e) => handleCheckBoxChange(e)}
                                    className="form-checkbox bg-white dark:bg-black"
                                    checked={addData.is_active === true ? true : false}
                                />
                                <span className="text-black">Is Active?</span>
                            </label>
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

export default VisaStatusActionModal;
