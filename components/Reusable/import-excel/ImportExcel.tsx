import { ChangeEvent } from 'react';
import ActionModal from '../Modal/ActionModal';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import IconX from '@/components/icon/icon-x';

interface ImportExcelProps {
    isOpen?: boolean;
    setIsOpen?: any;
}

const ImportExcel: React.FC<ImportExcelProps> = ({ isOpen, setIsOpen }) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [data, setData] = useState<any>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
          console.error('No file selected');
          return;
        }
      
        const file = files[0]; // Get the first file from the FileList
        const reader = new FileReader();
      
        reader.onload = (event) => {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          const workbook = XLSX.read(arrayBuffer, { type: 'array' }); // Use type 'array' for ArrayBuffer
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setData(json);
        };
      
        reader.readAsArrayBuffer(file); // Use readAsArrayBuffer instead of readAsBinaryString
      };
      

    console.log('import data', data);
    //   const validateData = () => {
    //     const newErrors = [];
    //     data.forEach((item, index) => {
    //       if (!item.name || !item.email) {
    //         newErrors.push(`Row ${index + 1}: Name and Email are required fields`);
    //       }
    //       // Add more validation rules as needed
    //     });
    //     setErrors(newErrors);
    //     return newErrors.length === 0;
    //   };

    //   const handleSubmit = async () => {
    //     if (validateData()) {
    //       try {
    //         await axios.post('http://localhost:3000/api/upload', { data });
    //         alert('Data uploaded successfully!');
    //       } catch (error) {
    //         console.error('Error uploading data:', error);
    //         alert('Error uploading data. Please try again.');
    //       }
    //     }
    //   };

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setFile(e.target.files[0]);
    //         setError(null);
    //     }
    // };
    // const handleFileUpload = async () => {
    //     if (!file) {
    //         setError('Please select a file first');
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('file', file);

    //     console.log('formDagta', formData);

    //     // try {
    //     //     const response = await axios.post('http://localhost:3000/api/upload', formData, {
    //     //         headers: {
    //     //             'Content-Type': 'multipart/form-data',
    //     //         },
    //     //     });
    //     //     console.log('Data uploaded successfully', response.data);
    //     // } catch (error) {
    //     //     console.error('Error uploading data', error);
    //     // }
    // };
    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} width="max-w-xl">
                {/* <div className='p-10'>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                    <button onClick={handleFileUpload} className="btn btn-primary float-right">Upload</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div> */}
                <button
                        onClick={() => {
                            setIsOpen(false);
                            setData([]);
                            // setIsEdit(false);
                        }}
                        type="button"
                        className="text-white-dark hover:text-dark float-right m-2"
                    >
                        <IconX />
                    </button>

                <div className="p-10">
                
                    <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index} style={{ color: 'red' }}>
                                    {error}
                                </li>
                            ))}
                        </ul>
                    )}
                    <button
                        //   onClick={handleSubmit}
                        className="btn btn-primary float-right"
                        disabled={data.length === 0 || errors.length > 0}
                    >
                        Upload Data
                    </button>
                </div>
            </ActionModal>
        </>
    );
};

export default ImportExcel;
