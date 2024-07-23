import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import PaginationTable from '../Table/PaginationTable';
import { render } from '@headlessui/react/dist/utils/render';
import './NewComponentsFormsFileUploadSingle.css';

interface NewComponentsFormsFileUploadMultipleProps {
    setAddData: React.Dispatch<React.SetStateAction<any>>;
    addData: any;
}

const NewComponentsFormsFileUploadMultiple: React.FC<NewComponentsFormsFileUploadMultipleProps> = ({ setAddData, addData }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null); // Define buttonRef here

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        setAddData((prevData: any) => ({
            ...prevData,
            forms: [...(prevData.files || []), ...files],
        }));

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

    console.log('selected files', selectedFiles);

    return (
        <div className="mb-2">
            <label htmlFor="fileUpload">Upload Documents</label>
            <div className="relative">
                <input
                    type="file"
                    id="fileUpload"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
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
                {selectedFiles.map((file, index) => (
                    <>
                        {' '}
                        <h2>Selected Files</h2>
                        <div key={index} className="mt-2 flex items-center justify-between rounded border p-2">
                            <span>{file.name}</span>
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleFileDelete(file)}>
                                Delete
                            </button>
                        </div>
                    </>
                ))}
            </div>

            {addData?.id && (
                <div className="mt-2">
                    <div className="form-table">
                        <div className="table-header">
                            <div>Form</div>
                            <div>Tag</div>
                            <div>Action</div>
                        </div>
                        {addData?.forms?.map((form: any, index: any) => (
                            <div key={index} className="table-row">
                                <div className="form-name">{form?.name || ''}</div>
                                <div className="form-tag">{form?.id || ''}</div>
                                <div>
                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleFileDelete(form)}>
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
