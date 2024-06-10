'use client';
import React, { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

const ComponentsFormsFileUploadSingle: React.FC<{ setAddData: any; addData: any }> = ({ setAddData, addData }) => {
    const [images, setImages] = useState<ImageListType>([]);
    const [imageURL, setImageURL] = useState<string>('');
    const maxNumber = 69;

    useEffect(() => {
        if (addData?.flag) {
            const existingImage = [{ data_url: addData.flag }];
            setImages(existingImage);
            setImageURL(addData.flag);
        }
    }, [addData]);

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList);
        if (imageList.length > 0) {
            setImageURL(imageList[0].data_url);
            setAddData((prev: any) => ({ ...prev, ['flag']: imageList[0].data_url }));
        } else {
            setImageURL('');
            setAddData((prev: any) => ({ ...prev, ['flag']: '' }));
        }
    };

    const clearImages = () => {
        setImages([]);
        setImageURL('');
    };

    return (
        <div className="mb-5">
            <div className="custom-file-container" data-upload-id="myFirstImage">
                <div className="label-container flex items-center justify-between">
                    <label>Flag </label>
                    <button type="button" className="custom-file-container__image-clear text-2xl" title="Clear Image" onClick={clearImages}>
                        ×
                    </button>
                </div>
                <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
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
                                        onClick={() => onImageRemove(index)}
                                        className="custom-file-container__image-clear absolute left-0 top-0 block w-fit rounded-full bg-dark-light p-0.5 dark:bg-dark dark:text-white-dark"
                                        title="Remove Image"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
                {images.length === 0 && <img src="/assets/images/file-preview.svg" className="m-auto w-full max-w-md" alt="" />}
            </div>
        </div>
    );
};

export default ComponentsFormsFileUploadSingle;
