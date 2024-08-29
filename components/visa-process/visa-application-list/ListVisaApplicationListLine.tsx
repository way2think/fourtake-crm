import MarkdownEditor from '@/components/Reusable/Markdown-Editor/MarkDownEditor';
import VisafeeEditor from '@/components/Reusable/Markdown-Editor/VisafeeEditor';
import VisafeeEditorJodit from '@/components/Reusable/Markdown-Editor/VisafeeEditorJodit';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import NewComponentsFormsFileUploadMultiple from '@/components/Reusable/file-upload/NewComponentsFormsFileUploadSingle';
import ComponentsFormsFileUploadSingle from '@/components/Reusable/file-upload/components-forms-file-upload-single';
import IconX from '@/components/icon/icon-x';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { useGetOneVisaApplicantGroupQuery, useGetVisaApplicantsQuery, useUpdateVisaApplicantGroupMutation, visaProcessSlice } from '@/services/api/visaProcessSlice';
import { handleUpdate } from '@/utils/rtk-http';
import { useEffect, useState } from 'react';

interface ListVisaApplicationListLineProps {
    isOpen: any;
    setIsOpen: any;
    addData?: any;
    setAddData?: any;
}

const ListVisaApplicationListLine: React.FC<ListVisaApplicationListLineProps> = ({ isOpen, setIsOpen, addData, setAddData }) => {
    const [passports, setPassports] = useState<string[]>([]);

    const { data: oneVisaApplicantsGroup } = useGetOneVisaApplicantGroupQuery(addData?.group_id);

    // console.log('addData in list application', addData, oneVisaApplicantsGroup);

    const [updateVisaApplicant, {}] = useUpdateVisaApplicantGroupMutation();
    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    useEffect(() => {
        if (addData?.multiple_passports) {
            setPassports(addData.multiple_passports);
        }
    }, [addData?.multiple_passports]);

    const handleMultiplePassportSave = () => {
        if (oneVisaApplicantsGroup) {
            const updatedData = {
                ...oneVisaApplicantsGroup,
                updated_time: new Date(),
                visa_applicants: oneVisaApplicantsGroup?.visa_applicants.map((applicant: any) => (applicant.id === addData?.id ? { ...applicant, multiple_passports: passports } : applicant)),
            };
            setIsOpen(false);
            return handleUpdate({
                updateMutation: updateVisaApplicant,
                value: updatedData,
                items: oneVisaApplicantsGroup,
                meta: {},
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: visaProcessSlice,
                endpoint: 'getVisaApplicants',
            });

            
        }
    };

    const handleInputChangeMultiple = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        setPassports((prevPassports) => {
            const newPassports = [...prevPassports];
            newPassports[index] = value;
            return newPassports;
        });
    };

    return (
        <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} width="max-w-4xl">
            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Multiple Passport</h5>
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
                        <label htmlFor="refno">Reference No</label>
                        <input id="refno" type="text" placeholder="Enter Reference No" className="form-input" disabled value={'12345678'} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="passport_number">Passport No</label>
                        <input id="passport_number" type="text" placeholder="Enter Passport No" className="form-input" disabled value={'PS12L458'} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="mb-5">
                            <label htmlFor={`passport_${index + 1}`}>Passport {index + 1}</label>
                            <input
                                id={`passport_${index + 1}`}
                                type="text"
                                value={passports[index] || ''}
                                placeholder={`Enter Passport ${index + 1}`}
                                className="form-input"
                                onChange={(e) => handleInputChangeMultiple(e, index)}
                            />
                        </div>
                    ))}
                </div>
                {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="mb-5">
                        <label htmlFor="embassy_ref">Embassy Ref</label>
                        <input
                            id="embassy_ref"
                            type="text"
                            placeholder="Enter Embassy Ref"
                            className="form-input"
                            onChange={(e) => handleInputChangeMultiple(e, 8)} // Assuming this is also stored in passports array
                        />
                    </div>
                </div> */}

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
                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleMultiplePassportSave}>
                        Save
                    </button>
                </div>
            </div>
        </ActionModal>
    );
};

export default ListVisaApplicationListLine;
