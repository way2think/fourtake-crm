'use client';
import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import PanelCodeHighlight from '@/components/panel-code-highlight';

const ComponentsFormsFileUploadSingle = () => {
    const [images, setImages] = useState<any>([]);
    const maxNumber = 69;

    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages(imageList);
    };

    return (
        <div className="mb-5">
            <div className="custom-file-container" data-upload-id="myFirstImage">
                <div className="label-container flex items-center justify-between">
                    <label>Flag </label>
                    <button
                        type="button"
                        className="custom-file-container__image-clear text-2xl"
                        title="Clear Image"
                        onClick={() => {
                            setImages([]);
                        }}
                    >
                        ×
                    </button>
                </div>
                <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                        <div className="upload__image-wrapper">
                            <button className="custom-file-container__custom-file__custom-file-control mb-2 rounded bg-primary text-white p-1" onClick={onImageUpload} {...dragProps}>
                                Uploaded
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
