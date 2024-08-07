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
                    image: file, // Store base64 data URL
                    //   fileDetails:result, // Store file details if needed
                }));
            };

            if (file) {
                reader.readAsDataURL(file); // Read the file as a data URL
            }
        } else {
            setAddData((prev: any) => ({
                ...prev,
                image: null,
                // fileDetails: null,
            }));
        }
    };

    const clearImages = () => {
        setImages([]);
        setAddData((prev: any) => ({
            ...prev,
            image: null,
            //   fileDetails: null,
        }));
    };

    return (
        <div className="mb-5">
            <div className="custom-file-container" data-upload-id="myFirstImage">
                <div className="label-container flex items-center justify-between">
                    <label>Image</label>
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
                                                image: null,
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
                            {addData?.image && !imageList.length && (
                                <div className="custom-file-container__image-preview relative">
                                    <img src={addData?.image} alt="img" className="w-50 !max-h-20 rounded object-cover shadow" />
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

// 'use client';
// import IconX from '@/components/icon/icon-x';
// import React, { useEffect, useState } from 'react';
// import ImageUploading, { ImageListType } from 'react-images-uploading';

// const ComponentsFormsFileUploadMulti: React.FC<{ setAddData: any; addData: any }> = ({ setAddData, addData }) => {
//     const [images2, setImages2] = useState<ImageListType>([]);
//     const [imageURLs, setImageURLs] = useState<string[]>([]);
//     const maxNumber = 69;

//     useEffect(() => {
//         if (addData?.image) {
//             const existingImages = addData.image.map((url: string) => ({ data_url: url }));
//             setImages2(existingImages);
//             setImageURLs(addData.image);
//         }
//     }, [addData]);

//     const onChange2 = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
//         setImages2(imageList);
//         const urls = imageList.map((image) => image.data_url);
//         setImageURLs(urls);
//         setAddData((prev: any) => ({ ...prev, ['image']: urls }));
//     };

//     const clearImages = () => {
//         setImages2([]);
//         setImageURLs([]);
//     };

//     return (
//         <div className="mb-5">
//             <div className="custom-file-container" data-upload-id="mySecondImage">
//                 <div className="label-container flex items-center justify-between">
//                     <label>Image </label>
//                     <button type="button" className="custom-file-container__image-clear text-2xl" title="Clear Images" onClick={clearImages}>
//                         ×
//                     </button>
//                 </div>
//                 <ImageUploading multiple value={images2} onChange={onChange2} maxNumber={maxNumber} dataURLKey="data_url">
//                     {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
//                         <div className="upload__image-wrapper">
//                             <button className="custom-file-container__custom-file__custom-file-control mb-2 rounded bg-primary p-1 text-white" onClick={onImageUpload} {...dragProps}>
//                                 Upload
//                             </button>
//                             &nbsp;
//                             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                                 {imageList.map((image, index) => (
//                                     <div key={index} className="custom-file-container__image-preview relative">
//                                         <button
//                                             type="button"
//                                             className="custom-file-container__image-clear absolute left-0 top-0 block w-fit rounded-full bg-dark-light p-0.5 dark:bg-dark dark:text-white-dark"
//                                             title="Remove Image"
//                                             onClick={() => onImageRemove(index)}
//                                         >
//                                             <IconX className="h-3 w-3" />
//                                         </button>
//                                         <img src={image.data_url} alt="img" className="w-50 !max-h-20 rounded object-cover shadow" />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </ImageUploading>
//                 {images2.length === 0 && <img src="/assets/images/file-preview.svg" className="m-auto w-full max-w-md" alt="" />}
//             </div>
//         </div>
//     );
// };

// export default ComponentsFormsFileUploadMulti;
