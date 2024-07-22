import { useState } from 'react';
import ActionModal from '../Modal/ActionModal';

interface ImportExcelProps {
    isOpen?: boolean;
    setIsOpen?: any;
}

const ImportExcel: React.FC<ImportExcelProps> = ({ isOpen, setIsOpen }) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };
    const handleFileUpload = async () => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        console.log('formDagta', formData);

        // try {
        //     const response = await axios.post('http://localhost:3000/api/upload', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     console.log('Data uploaded successfully', response.data);
        // } catch (error) {
        //     console.error('Error uploading data', error);
        // }
    };
    return (
        <>
            <ActionModal isOpen={true} setIsOpen={true} width='w-xl'>
                <div className='p-10'>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                    <button onClick={handleFileUpload}>Upload</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </ActionModal>
        </>
    );
};

export default ImportExcel;
