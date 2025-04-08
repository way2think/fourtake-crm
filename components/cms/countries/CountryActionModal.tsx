import IconX from '@/components/icon/icon-x';
import ComponentsFormsFileUploadMulti from '../../Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '../../Reusable/file-upload/components-forms-file-upload-single';
import ActionModal from '@/components/Reusable/Modal/ActionModal';

interface CountryActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}
const CountryActionModal: React.FC<CountryActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    // console.log('CountryActionModal: ', addData);

    const handleCheckBoxChange = (e: any) => {
        const { id, checked } = e.target;
        setAddData((prev: any) => ({ ...prev, [id]: checked }));
    };

    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">{addData.id ? 'Edit' : 'Add'} Country</h5>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setAddData({});
                        }}
                        type="button"
                        className="text-white-dark hover:text-dark"
                    >
                        <IconX />
                    </button>
                </div>

                <div className="p-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="countrysname">Country Name</label>
                            <input id="name" type="text" placeholder="Enter Country Name" className="form-input" value={addData?.name} onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="languages">Languages </label>
                            <input id="languages" type="text" onChange={(e) => handleInputChange(e)} value={addData?.languages} placeholder="Enter Languages" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="dialing_code">Dailing Code</label>
                            <input id="dialing_code" value={addData?.dialing_code} onChange={(e) => handleInputChange(e)} type="tel" placeholder="Enter dailing Code" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="capital">Capital </label>
                            <input id="capital" value={addData?.capital} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Capital" className="form-input" />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5">
                            <label htmlFor="cities">Cities</label>
                            <input id="cities" value={addData?.cities} onChange={(e) => handleInputChange(e)} type="text" placeholder="Enter Cities" className="form-input" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="country_detail">Country Details</label>
                            <textarea
                                id="country_detail"
                                rows={3}
                                value={addData?.country_detail}
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Enter Country Details"
                                className="form-textarea min-h-[80px] resize-none"
                            ></textarea>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="climate">Climate</label>
                            <textarea
                                id="climate"
                                rows={3}
                                placeholder="Enter Climate"
                                value={addData?.climate}
                                onChange={(e) => handleInputChange(e)}
                                className="form-textarea min-h-[80px] resize-none"
                            ></textarea>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="currency">Currency</label>
                            <input id="currency" type="tel" value={addData?.currency} onChange={(e) => handleInputChange(e)} placeholder="Enter Currency" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="timezone">Time Zone</label>
                            <input id="timezone" type="text" placeholder="Enter Time Zone" value={addData?.timezone} onChange={(e) => handleInputChange(e)} className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5">
                            <label htmlFor="additional_info">Additional Info</label>
                            <textarea
                                id="additional_info"
                                rows={3}
                                value={addData?.additional_info}
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Enter Additional Info"
                                className="form-textarea min-h-[80px] resize-none"
                            ></textarea>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5">
                            <label htmlFor="website">Website</label>
                            <input id="website" type="text" value={addData?.website} onChange={(e) => handleInputChange(e)} placeholder="Enter Website" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                        <div className="mb-5">
                            <label className="flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    id="is_popular"
                                    // value={addData?.ispopular}
                                    onChange={(e) => handleCheckBoxChange(e)}
                                    checked={addData?.is_popular || false}
                                    className="form-checkbox  bg-white dark:bg-black"
                                />
                                <span>Is popular Country </span>
                            </label>
                        </div>
                        <div className="mb-5">
                            <label className="flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    id="is_outsource_application_center"
                                    checked={addData?.is_outsource_application_center || false}
                                    // value={addData?.isoutsource}
                                    onChange={(e) => handleCheckBoxChange(e)}
                                    className="form-checkbox bg-white dark:bg-black"
                                />
                                <span >Enable outsource application center</span>
                            </label>
                        </div>
                        <div className="mb-5">
                            <label className="flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    id="is_jurisdiction"
                                    checked={addData?.is_jurisdiction || false}
                                    // value={addData?.isjurisdiction}
                                    onChange={(e) => handleCheckBoxChange(e)}
                                    className="form-checkbox bg-white dark:bg-black"
                                />
                                <span >Enable Jurisdiction</span>
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                        <div className="mb-5">
                            <ComponentsFormsFileUploadSingle setAddData={setAddData} addData={addData} />
                        </div>
                        <div className="mb-5">

                              
                            <ComponentsFormsFileUploadMulti setAddData={setAddData} addData={addData} />
                        </div>
                    </div>
                    <div className="mt-8 flex items-center justify-end">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setAddData({});
                            }}
                            type="button"
                            className="btn btn-outline-danger"
                        >
                            Cancel
                        </button>
                        <button onClick={handleSave} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                            Save
                        </button>
                    </div>
                </div>
            </ActionModal>
        </>
    );
};

export default CountryActionModal;
