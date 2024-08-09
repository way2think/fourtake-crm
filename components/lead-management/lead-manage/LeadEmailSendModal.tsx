import IconX from '@/components/icon/icon-x';
import ComponentsFormsFileUploadMulti from '../../Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '../../Reusable/file-upload/components-forms-file-upload-single';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import VisafeeEditorJodit from '@/components/Reusable/Markdown-Editor/VisafeeEditorJodit';
import MarkdownEditor from '@/components/Reusable/Markdown-Editor/MarkDownEditor';

interface LeadEmailSendModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}
const LeadEmailSendModal: React.FC<LeadEmailSendModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    // console.log('CountryActionModal: ', addData);

    const handleCheckBoxChange = (e: any) => {
        const { id, checked } = e.target;
        setAddData((prev: any) => ({ ...prev, [id]: checked }));
    };

    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Share Information Via Email</h5>
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
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="countrysname">Recipient Name</label>
                            <input id="name" type="text" placeholder="Enter Recipient Name" className="form-input" value={addData?.name} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="mail">Recipient Email Address: </label>
                            <input id="mail" type="mail" onChange={(e) => handleInputChange(e)} value={addData?.languages} placeholder="Enter Recipient Email Address" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="dialing_code">Contact No</label>
                            <input id="dialing_code" value={addData?.dialing_code} onChange={(e) => handleInputChange(e)} type="tel" placeholder="Enter Contact No" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="capital">Service Charege(*GST will be dditional ) </label>
                            <input id="capital" value={addData?.capital} onChange={(e) => handleInputChange(e)} type="tel" placeholder="Enter Service Charege" className="form-input" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-2">
                            <MarkdownEditor handleInputChange={handleInputChange} addData={addData} setAddData={setAddData} />
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                        <div className="mb-2">
                            {/* <MarkdownEditor handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} /> */}
                            <label htmlFor="Checklist">Checklist*</label>
                            <VisafeeEditorJodit title={''} handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} />
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
                            Close
                        </button>
                        <button onClick={handleSave} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                            Send Mail
                        </button>
                    </div>
                </div>
            </ActionModal>
        </>
    );
};

export default LeadEmailSendModal;
