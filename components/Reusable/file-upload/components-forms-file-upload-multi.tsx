'use client';
import IconX from '@/components/icon/icon-x';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

const ComponentsFormsFileUploadMulti = () => {
    const [images2, setImages2] = useState<any[]>([]);
    const maxNumber = 69;

    const onChange2 = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages2(imageList);
    };

    return (
        <div className="mb-5">
            <div className="custom-file-container" data-upload-id="mySecondImage">
                <div className="label-container flex items-center justify-between">
                    <label>Image </label>
                    <button
                        type="button"
                        className="custom-file-container__image-clear text-2xl"
                        title="Clear Images"
                        onClick={() => {
                            setImages2([]);
                        }}
                    >
                        ×
                    </button>
                </div>
                <ImageUploading multiple value={images2} onChange={onChange2} maxNumber={maxNumber} dataURLKey="data_url">
                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                        <div className="upload__image-wrapper">
                            <button className="custom-file-container__custom-file__custom-file-control mb-2 rounded bg-primary p-1 text-white" onClick={onImageUpload} {...dragProps}>
                                Uploaded
                            </button>
                            &nbsp;
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {imageList.map((image, index) => (
                                    <div key={index} className="custom-file-container__image-preview relative">
                                        <button
                                            type="button"
                                            className="custom-file-container__image-clear absolute left-0 top-0 block w-fit rounded-full bg-dark-light p-0.5 dark:bg-dark dark:text-white-dark"
                                            title="Remove Image"
                                            onClick={() => onImageRemove(index)}
                                        >
                                            <IconX className="h-3 w-3" />
                                        </button>
                                        <img src={image.data_url} alt="img" className="w-50 !max-h-20 rounded object-cover shadow" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </ImageUploading>
                {images2.length === 0 && <img src="/assets/images/file-preview.svg" className="m-auto w-full max-w-md" alt="" />}
            </div>
        </div>
    );
};

export default ComponentsFormsFileUploadMulti;
