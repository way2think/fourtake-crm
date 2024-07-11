import React, { ChangeEvent, useState, useRef, useEffect } from 'react';

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
            files: [...(prevData.files || []), ...files],
        }));

        // Clear the input value to allow re-uploading the same file after deletion
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
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
                    className="absolute opacity-0 cursor-pointer"
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
                    <div key={index} className="flex items-center justify-between mt-2 p-2 border rounded">
                        <span>{file.name}</span>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleFileDelete(file)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewComponentsFormsFileUploadMultiple;
