import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import './NewComponentsFormsFileUploadSingle.css';
import { Form } from '@/entities/form.entity';
import { handleDelete } from '@/utils/rtk-http';
import { formSlice, useDeleteFormMutation } from '@/services/api/formSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';

interface NewComponentsFormsFileUploadMultipleProps {
    setAddData: React.Dispatch<React.SetStateAction<any>>;
    addData: any;
}

const NewComponentsFormsFileUploadMultiple: React.FC<NewComponentsFormsFileUploadMultipleProps> = ({ setAddData, addData }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null); // Define buttonRef here
    const [deleteForm, {}] = useDeleteFormMutation();
    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        setAddData((prevData: any) => ({
            ...prevData,
            files: [...(prevData.files || []), ...files],
        }));

        console.log('files', files);

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
            files: updatedFiles,
        }));
    };

    const handleFormDelete = async (id: Number | string) => {
        const item = { id }; // Assuming the item is represented by an object with an id
        //   const items = []; // Replace with actual items if available
        const meta = {}; // Replace with actual meta if available

        await handleDelete({
            deleteMutation: deleteForm,
            item,
            items: [],
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: formSlice,
            endpoint: 'getForm',
        });
        const updatedForm = addData?.forms?.filter((item: any) => item.id !== id);
        setAddData({ ...addData, forms: updatedForm });
        // handleDelete({
        //     deleteMutation: deleteForm,
        //     item: id,
        //     items:[],
        //     meta,
        //     handleLocalUpdate: handleLocalRTKUpdate,
        //     apiObjectRef: formSlice,
        //     endpoint: 'getForm',
        // });
        // const res = await deleteForm(id);
        // console.log('res', res);
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

    // Call adjustInputWidth on component mount and when selectedFiles change
    useEffect(() => {
        adjustInputWidth();
    }, [selectedFiles]);

    // console.log('selected files', selectedFiles);

    const openForm = (form: Form) => {
        window.open(form.url, '_blank');
    };

    return (
        <div className="mb-2">
            <label htmlFor="fileUpload">Upload Documents</label>
            <div className="relative">
                <input
                    type="file"
                    id="fileUpload"
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

            {addData?.id && addData?.forms?.length > 0 && (
                <div className="mt-2">
                    <div className="form-table">
                        <div className="table-header">
                            <div>Form</div>
                            <div>Tag</div>
                            <div>Action</div>
                        </div>

                        {addData?.forms?.map((form: any, index: any) => (
                            <div key={index} className="table-row">
                                <div className="form-name" onClick={() => openForm(form)}>
                                    {form?.name || ''}
                                </div>
                                <div className="form-tag">form_{form?.id || ''}</div>
                                <div>
                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleFormDelete(form.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewComponentsFormsFileUploadMultiple;
