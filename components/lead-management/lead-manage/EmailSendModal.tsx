import IconX from '@/components/icon/icon-x';

import ActionModal from '@/components/Reusable/Modal/ActionModal';
import VisafeeEditorJodit from '@/components/Reusable/Markdown-Editor/VisafeeEditorJodit';
import MarkdownEditor from '@/components/Reusable/Markdown-Editor/MarkDownEditor';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useGetVisaChecklistQuery } from '@/services/api/cms/visaChecklistSlice';
import { mailSlice, useCreateMailMutation } from '@/services/api/mailSlice';
import { handleCreate } from '@/utils/rtk-http';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { useGetVisaRequirementsQuery } from '@/services/api/dashboardSlice';
import LoadingSpinner from '@/components/Reusable/LoadingSpinner/LoadingSpinner';

interface LeadEmailSendModalProps {
    isOpen: any;
    setIsOpen: any;
    addData: any;
    setAddData: any;
    visaChecklistData?: any;
    visaChecklistItems?: any;
}
const EmailSendModal: React.FC<LeadEmailSendModalProps> = ({ isOpen, visaChecklistItems, setAddData, setIsOpen, addData, visaChecklistData }) => {
    const [serviceCharge, setServiceCharge] = useState();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const buttonRef = useRef<HTMLButtonElement>(null); // Define buttonRef here
    // const { data: visaChecklistData } = useGetVisaChecklistQuery({ page: 0, limit: 0 });
    const [handleLocalRTKUpdate] = useRTKLocalUpdate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: visaRequirements } = useGetVisaRequirementsQuery({
        countryId: String(addData?.destination_country?.id) || String(addData?.destination_country),
        visaTypeId: String(addData?.visa_type?.id) || String(addData?.visaTypeId),
        stateOfResidence: addData?.state_of_residence || String(addData?.stateOfResidence),
    });

    const [createMail, { isLoading }] = useCreateMailMutation();

    useEffect(() => {
        if (visaChecklistData) {
            const visaChecklist =
                visaChecklistData && visaChecklistData.length > 0 ? `${visaChecklistData[0]?.checklist || ''} ${visaChecklistData[0]?.fee == null || '' ? '' : visaChecklistData[0]?.fee}` : '';
            setAddData({ ...addData, visa_checklist: visaChecklist });
        }
    }, [visaChecklistData]);

    useEffect(() => {
        if (visaRequirements) {
            const visaChecklist =
                visaRequirements && visaRequirements.length > 0 ? `${visaRequirements[0]?.checklist || ''} ${visaRequirements[0]?.fee == null || '' ? '' : visaRequirements[0]?.fee}` : '';
            setAddData({ ...addData, visa_checklist: visaChecklist });
        }
    }, [visaRequirements]);

    // useEffect(() => {
    //     if (visaChecklistData?.items && addData) {
    //         let data = visaChecklistData?.items
    //             .filter((item: any, index: any) => {
    //                 return item.country.id == addData.country.id;
    //             })
    //             .filter((item: any, index: any) => {
    //                 return item.visa_type.id == addData.visa_type.id;
    //             });

    //         if (data.length > 1) {
    //             data = data
    //                 .map((item: any) => {
    //                     if (Array.isArray(item.embassy_vfs)) {
    //                         const jurisdiction = item.embassy_vfs.map((vfs: any) => (vfs.jurisdiction ? vfs.jurisdiction.split(',') : null)).filter((j: any) => j && j.length > 0); // Filter non-empty arrays

    //                         console.log('jurisdiction', jurisdiction);

    //                         // Check if any jurisdiction matches the residence_state
    //                         const hasMatchingJurisdiction = jurisdiction.some((content: string[]) => content.includes(addData?.residence_state));
    //                         if (hasMatchingJurisdiction) {
    //                             return item;
    //                         }
    //                     }
    //                     return null;
    //                 })
    //                 .filter((item: any) => item !== null); // Remove null values from the array

    //             console.log('filtered data', data);
    //         }
    //         const visaChecklist = data && data.length > 0 ? `${data[0]?.checklist || ''} ${data[0]?.fee == null || 'null' ? '' : data[0]?.fee}` : '';
    //         setAddData({ ...addData, visa_checklist: visaChecklist });

    //         console.log('data', data, visaChecklist);
    //     }
    // }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAddData((prevData: any) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSend = async () => {
        let combination;
        if (addData?.name && addData?.country?.name && addData?.visa_type?.name) {
            combination = `<p>Hello ${addData.name}</p>
            <p>Country: ${addData.country.name}
            <br />
            Visa Type: ${addData.visa_type.name} </p>`;
        } else {
            combination = `<p>Hello ${addData.name}</p>
            <p>Country:  ${visaChecklistData?.[0]?.country?.name}
            <br />
            Visa Type:${visaChecklistData?.[0]?.visa_type?.name} </p>`;
        }

        const value = {
            to: addData?.email,
            subject: 'Visa Checklist',
            from: 'info@fourtakevisas.com',
            visa_checklist: `${combination}  ${addData?.visa_checklist}  ${addData?.additional_info}`,
            // additional_info: addData?.additional_info,
            attachments: addData?.attachments,
            cc: addData?.cc,
        };
        setIsOpen(false);
        return handleCreate({
            createMutation: createMail,
            value,
            items: [],
            meta: {},
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: mailSlice,
            endpoint: '',
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        setAddData((prevData: any) => ({
            ...prevData,
            attachments: [...(prevData.attachments || []), ...files],
        }));

        // console.log('files', files);

        // Clear the input value to allow re-uploading the same file after deletion
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileDelete = (fileToDelete: File) => {
        const updatedFiles = selectedFiles.filter((file) => file !== fileToDelete);
        setSelectedFiles(updatedFiles);
        setAddData((prevData: any) => ({
            ...prevData,
            attachments: updatedFiles,
        }));
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Adjust input width to match button width dynamically
    const adjustInputWidth = () => {
        if (buttonRef.current && fileInputRef.current) {
            fileInputRef.current.style.width = `${buttonRef.current.offsetWidth}px`;
        }
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Share Information Via Email</h5>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setAddData((prevData: any) => {
                                const { cc, additional_info, visa_checklist, attachments, ...rest } = prevData;
                                return { ...rest, visa_checklist: visaChecklistItems };
                            });
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
                            <input id="email" type="email" onChange={(e) => handleInputChange(e)} value={addData?.email} placeholder="Enter Recipient Email Address" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="phone">Mail CC</label>
                            <input id="cc" value={addData?.cc || ''} onChange={(e) => handleInputChange(e)} type="tel" placeholder="Enter CC" className="form-input" />
                        </div>
                        {/* <div className="mb-5">
                            <label htmlFor="service_charges">Service Charges(*GST will be dditional ) </label>
                            <input
                                id="service_charges"
                                value={serviceCharge}
                                onChange={(e: any) => setServiceCharge(e.target.value)}
                                type="tel"
                                placeholder="Enter Service Charege"
                                className="form-input"
                            />
                        </div> */}
                    </div>

                    <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                        <div className="mb-2">
                            {/* <MarkdownEditor handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} /> */}
                            <label htmlFor="Checklist">Checklist*</label>
                            <VisafeeEditorJodit title={'visa_checklist'} handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
                        <div className="mb-2">
                            {/* <MarkdownEditor handleInputChange={handleInputChange} addData={addData} setAddData={setAddData} /> */}
                            <label htmlFor="Checklist">Additional Information</label>
                            <VisafeeEditorJodit title={'additional_info'} handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} />
                        </div>

                        {/* start */}
                        <div className="mb-2">
                            <label htmlFor="fileUpload">Upload Documents</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    id="attachments"
                                    ref={fileInputRef}
                                    // accept=".pdf,.doc,.docx"
                                    multiple
                                    onChange={handleFileChange}
                                    className="absolute cursor-pointer opacity-0"
                                    style={{ width: '100%', height: '100%' }}
                                />
                                <button
                                    type="button"
                                    ref={buttonRef}
                                    onClick={triggerFileInput}
                                    className="btn btn-primary"
                                    style={{
                                        backgroundColor: selectedFiles.length ? 'blue' : '',
                                        color: selectedFiles.length ? 'white' : '',
                                    }}
                                >
                                    Choose Files
                                </button>
                            </div>
                            <div className="mt-2">
                                {selectedFiles.length > 0 && <h2>Selected Files</h2>}
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="mt-2 flex items-center justify-between rounded border p-2">
                                        <span>{file.name}</span>
                                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleFileDelete(file)}>
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex items-center justify-end">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setAddData((prevData: any) => {
                                    const { visa_checklist, cc, additional_info, attachments, ...rest } = prevData;
                                    return { ...rest, visa_checklist: visaChecklistItems };
                                });
                            }}
                            type="button"
                            className="btn btn-outline-danger"
                        >
                            Close
                        </button>
                        <button onClick={handleSend} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                            Send Mail
                        </button>
                    </div>
                </div>
            </ActionModal>
        </>
    );
};

export default EmailSendModal;
