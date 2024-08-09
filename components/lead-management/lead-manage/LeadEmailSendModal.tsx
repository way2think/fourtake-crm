import IconX from '@/components/icon/icon-x';

import ActionModal from '@/components/Reusable/Modal/ActionModal';
import VisafeeEditorJodit from '@/components/Reusable/Markdown-Editor/VisafeeEditorJodit';
import MarkdownEditor from '@/components/Reusable/Markdown-Editor/MarkDownEditor';
import { ChangeEvent, useEffect, useState } from 'react';
import { useGetVisaChecklistQuery } from '@/services/api/cms/visaChecklistSlice';

interface LeadEmailSendModalProps {
    isOpen: any;
    setIsOpen: any;

    addData: any;

    setAddData: any;
}
const LeadEmailSendModal: React.FC<LeadEmailSendModalProps> = ({ isOpen, setAddData, setIsOpen, addData }) => {
    // console.log('CountryActionModal: ', addData);
    const [serviceCharge, setServiceCharge] = useState();

    const { data: visachecklist } = useGetVisaChecklistQuery({ page: 0, limit: 0 });

    // console.log('visaChecklist data', visachecklist?.items);

    useEffect(() => {
        if (visachecklist?.items && addData) {
            const data = visachecklist?.items.filter((item: any) => item.country.id == addData.country.id);
            // console.log('data', data);
        }
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAddData((prevData: any) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // console.log('addData', addData);

    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Share Information Via Email</h5>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            // setAddData({});
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
                            <label htmlFor="name">Recipient Name</label>
                            <input id="name" type="text" placeholder="Enter Recipient Name" className="form-input" value={addData?.name || ''} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="mail">Recipient Email Address: </label>
                            <input id="mail" type="email" onChange={(e) => handleInputChange(e)} value={addData?.email || ''} placeholder="Enter Recipient Email Address" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="phone">Contact No</label>
                            <input id="phone" value={addData?.phone || ''} onChange={(e) => handleInputChange(e)} type="tel" placeholder="Enter Contact No" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="service_charges">Service Charges(*GST will be dditional ) </label>
                            <input
                                id="service_charges"
                                value={serviceCharge}
                                onChange={(e: any) => setServiceCharge(e.target.value)}
                                type="tel"
                                placeholder="Enter Service Charege"
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                        <div className="mb-2">
                            {/* <MarkdownEditor handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} /> */}
                            <label htmlFor="Checklist">Checklist*</label>
                            <VisafeeEditorJodit title={''} handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-2">
                            <MarkdownEditor handleInputChange={handleInputChange} addData={addData} setAddData={setAddData} />
                        </div>

                        {/* start */}
                        <div className="mb-2">
                            <label htmlFor="fileUpload">Upload Documents</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="fileUpload"
                                    // ref={fileInputRef}
                                    // accept=".pdf,.doc,.docx"
                                    multiple
                                    // onChange={handleFileChange}
                                    className="absolute cursor-pointer opacity-0"
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <button
                                    type="button"
                                    // ref={buttonRef}
                                    // onClick={triggerFileInput}
                                    className="btn btn-primary"
                                    style={{
                                        // backgroundColor: selectedFiles.length ? 'blue' : '',
                                        // color: selectedFiles.length ? 'white' : '',
                                    }}
                                >
                                    Choose Files
                                </button>
                            </div>
                            {/* <div className="mt-2">
                                {selectedFiles.length > 0 && <h2>Selected Files</h2>}
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="mt-2 flex items-center justify-between rounded border p-2">
                                        <span>{file.name}</span>
                                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleFileDelete(file)}>
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div> */}

                            
                        </div>
                    </div>
                    <div className="mt-8 flex items-center justify-end">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                // setAddData({});
                            }}
                            type="button"
                            className="btn btn-outline-danger"
                        >
                            Close
                        </button>
                        <button
                            //  onClick={handleSave}
                            type="button"
                            className="btn btn-primary ltr:ml-4 rtl:mr-4"
                        >
                            Send Mail
                        </button>
                    </div>
                </div>
            </ActionModal>
        </>
    );
};

export default LeadEmailSendModal;
