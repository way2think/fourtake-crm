import IconX from '@/components/icon/icon-x';
import ComponentsFormsFileUploadMulti from '../../Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '../../Reusable/file-upload/components-forms-file-upload-single';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import { useGetCountriesQuery } from '@/services/api/cms/countrySlice';

interface CountryVisaURlActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}
const CountryVisaURlActionModal: React.FC<CountryVisaURlActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {


    const { data: countries, isFetching, isLoading } = useGetCountriesQuery(undefined);
    const { items = [], meta = {} } = countries || {};
    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Add Country Visa Urls</h5>
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
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="dropdown mb-5">
                            <label htmlFor="country">Country</label>
                            <select className="form-input" defaultValue="" id="country" value={addData?.country?.id} onChange={(e) => handleInputChange(e)}>
                                <option value="" disabled={true}>
                                    Country
                                </option>
                                {items.map((country: any) => (
                                    <option value={country.id} key={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5 ">
                            <label htmlFor="url">Url</label>
                            <input id="url" type="text" onChange={(e) => handleInputChange(e)} value={addData?.url} placeholder="Enter Url" className="form-input" />
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

export default CountryVisaURlActionModal;
