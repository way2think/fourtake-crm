import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
interface ComponentsFormsFileUploadSingleProps {
    setAddData: React.Dispatch<React.SetStateAction<any>>;
    addData: any;
}
const ComponentsFormsFileUploadSingle: React.FC<ComponentsFormsFileUploadSingleProps> = ({ setAddData, addData }) => {
    const [images, setImages] = useState<ImageListType>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType) => {
        setImages(imageList);

        if (imageList.length > 0) {
            const file = imageList[0].file;
            const reader = new FileReader();

            reader.onload = () => {
                const result = reader.result as string;
                setAddData((prev: any) => ({
                    ...prev,
                    flag: file, // Store base64 data URL
                    //   fileDetails:result, // Store file details if needed
                }));
            };

            if (file) {
                reader.readAsDataURL(file); // Read the file as a data URL
            }
        } else {
            setAddData((prev: any) => ({
                ...prev,
                flag: null,
                // fileDetails: null,
            }));
        }
    };

    const clearImages = () => {
        setImages([]);
        setAddData((prev: any) => ({
            ...prev,
            flag: null,
            //   fileDetails: null,
        }));
    };

    return (
        <div className="mb-5">
            <div className="custom-file-container" data-upload-id="myFirstImage">
                <div className="label-container flex items-center justify-between">
                    <label>Flag</label>
                    <button type="button" className="custom-file-container__image-clear text-2xl" title="Clear Image" onClick={clearImages}>
                        ×
                    </button>
                </div>
                <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                    {({ imageList, onImageUpload, dragProps }) => (
                        <div className="upload__image-wrapper">
                            <button className="custom-file-container__custom-file__custom-file-control mb-2 rounded bg-primary p-1 text-white" onClick={onImageUpload} {...dragProps}>
                                Upload
                            </button>
                            &nbsp;
                            {imageList.map((image, index) => (
                                <div key={index} className="custom-file-container__image-preview relative">
                                    <img src={image.data_url} alt="img" className="w-50 !max-h-20 rounded object-cover shadow" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImages(images.filter((_, i) => i !== index));
                                            setAddData((prev: any) => ({
                                                ...prev,
                                                flag: null,
                                                // fileDetails: null,
                                            }));
                                        }}
                                        className="custom-file-container__image-clear absolute left-0 top-0 block w-fit rounded-full bg-dark-light p-0.5 dark:bg-dark dark:text-white-dark"
                                        title="Remove Image"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            {addData.flag && !imageList.length && (
                                <div className="custom-file-container__image-preview relative">
                                    <img src={addData?.flag} alt="img" className="w-50 !max-h-20 rounded object-cover shadow" />
                                    <button
                                        type="button"
                                        onClick={clearImages}
                                        className="custom-file-container__image-clear absolute left-0 top-0 block w-fit rounded-full bg-dark-light p-0.5 dark:bg-dark dark:text-white-dark"
                                        title="Remove Image"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </ImageUploading>
            </div>
        </div>
    );
};

export default ComponentsFormsFileUploadSingle;

// import React, { useEffect, useState } from 'react';
// import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';

// interface ComponentsFormsFileUploadSingleProps {
//     setAddData: React.Dispatch<React.SetStateAction<any>>;
//     addData: any;
// }

// const ComponentsFormsFileUploadSingle: React.FC<ComponentsFormsFileUploadSingleProps> = ({ setAddData, addData }) => {
//     const [images, setImages] = useState<ImageListType>([]);
//     const [fileDetails, setFileDetails] = useState<File | null>(null); // New state for file details
//     const maxNumber = 69;

//     useEffect(() => {
//         if (addData?.flag) {
//             const existingImage = [{ data_url: addData.flag }];
//             setImages(existingImage);
//             // If addData contains file details, set them here as well
//             setFileDetails(addData.fileDetails);
//         }
//     }, [addData]);

//     const onChange = (imageList: ImageListType) => {
//         setImages(imageList);

//         if (imageList.length > 0) {
//             const file = imageList[0].file as File;
//             setFileDetails(file);

//             setAddData((prev: any) => ({
//                 ...prev,
//                 flag: file, // Optionally keep the data URL
//                 // fileDetails: file, // Store the file details
//             }));
//         } else {
//             setFileDetails(null);
//             setAddData((prev: any) => ({
//                 ...prev,
//                 flag: null,
//                 // fileDetails: null,
//             }));
//         }
//     };

//     const clearImages = () => {
//         setImages([]);
//         setFileDetails(null);
//         setAddData((prev: any) => ({
//             ...prev,
//             flag: null,
//             // fileDetails: null
//         }));
//     };

//     console.log('image', images);

//     return (
//         <div className="mb-5">
//             <div className="custom-file-container" data-upload-id="myFirstImage">
//                 <div className="label-container flex items-center justify-between">
//                     <label>Flag </label>
//                     <button type="button" className="custom-file-container__image-clear text-2xl" title="Clear Image" onClick={clearImages}>
//                         ×
//                     </button>
//                 </div>
//                 <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
//                     {({ imageList, onImageUpload, dragProps }) => (
//                         <div className="upload__image-wrapper">
//                             <button className="custom-file-container__custom-file__custom-file-control mb-2 rounded bg-primary p-1 text-white" onClick={onImageUpload} {...dragProps}>
//                                 Upload
//                             </button>
//                             &nbsp;
//                             {images.map((image, index) => (
//                                 <div key={index} className="custom-file-container__image-preview relative">
//                                     <img src={image.data_url} alt="img" className="w-50 !max-h-20 rounded object-cover shadow" />
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             setImages(images.filter((_, i) => i !== index));
//                                             setFileDetails(null);
//                                             setAddData((prev: any) => ({
//                                                 ...prev,
//                                                 flag: null,
//                                                 // fileDetails: null,
//                                             }));
//                                         }}
//                                         className="custom-file-container__image-clear absolute left-0 top-0 block w-fit rounded-full bg-dark-light p-0.5 dark:bg-dark dark:text-white-dark"
//                                         title="Remove Image"
//                                     >
//                                         ×
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </ImageUploading>
//                 {/* {images.length === 0 && (
//           <img
//             src="/assets/images/file-preview.svg"
//             className="m-auto w-full max-w-md"
//             alt="No preview available"
//           />
//         )} */}
//             </div>
//         </div>
//     );
// };

// export default ComponentsFormsFileUploadSingle;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import ImageUploading, { ImageListType } from 'react-images-uploading';

// const ComponentsFormsFileUploadSingle: React.FC<{ setAddData: any; addData: any }> = ({ setAddData, addData }) => {
//     const [images, setImages] = useState<ImageListType>([]);
//     const [imageURL, setImageURL] = useState<string>('');
//     const maxNumber = 69;

//     useEffect(() => {
//         if (addData?.flag) {
//             const existingImage = [{ data_url: addData.flag }];
//             setImages(existingImage);
//             setImageURL(addData.flag);
//         }
//     }, [addData]);

//     const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
//         setImages(imageList);
//         if (imageList.length > 0) {
//             setImageURL(imageList[0].data_url);
//             setAddData((prev: any) => ({ ...prev, ['flag']: imageList[0].data_url }));
//         } else {
//             setImageURL('');
//             setAddData((prev: any) => ({ ...prev, ['flag']: '' }));
//         }
//     };

//     const clearImages = () => {
//         setImages([]);
//         setImageURL('');
//     };

//     return (
//         <div className="mb-5">
//             <div className="custom-file-container" data-upload-id="myFirstImage">
//                 <div className="label-container flex items-center justify-between">
//                     <label>Flag </label>
//                     <button type="button" className="custom-file-container__image-clear text-2xl" title="Clear Image" onClick={clearImages}>
//                         ×
//                     </button>
//                 </div>
//                 <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
//                     {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
//                         <div className="upload__image-wrapper">
//                             <button className="custom-file-container__custom-file__custom-file-control mb-2 rounded bg-primary p-1 text-white" onClick={onImageUpload} {...dragProps}>
//                                 Upload
//                             </button>
//                             &nbsp;
//                             {imageList.map((image, index) => (
//                                 <div key={index} className="custom-file-container__image-preview relative">
//                                     <img src={image.data_url} alt="img" className="w-50 !max-h-20 rounded object-cover shadow" />
//                                     <button
//                                         type="button"
//                                         onClick={() => onImageRemove(index)}
//                                         className="custom-file-container__image-clear absolute left-0 top-0 block w-fit rounded-full bg-dark-light p-0.5 dark:bg-dark dark:text-white-dark"
//                                         title="Remove Image"
//                                     >
//                                         ×
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </ImageUploading>
//                 {images.length === 0 && <img src="/assets/images/file-preview.svg" className="m-auto w-full max-w-md" alt="" />}
//             </div>
//         </div>
//     );
// };

// export default ComponentsFormsFileUploadSingle;
