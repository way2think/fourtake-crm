import VisafeeEditorJodit from '@/components/Reusable/Markdown-Editor/VisafeeEditorJodit';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import NewComponentsFormsFileUploadMultiple from '@/components/Reusable/file-upload/NewComponentsFormsFileUploadSingle';
import IconX from '@/components/icon/icon-x';
import { useGetCountriesQuery } from '@/services/api/cms/countrySlice';
import { useGetEmbassyVfsQuery } from '@/services/api/cms/embassyVfsSlice';
import { useGetVisaTypesQuery } from '@/services/api/cms/visaTypeSlice';
import { useEffect, useMemo, useState } from 'react';
import SearchableDropdown from '../../Reusable/country-selector/CountrySearchDropdown';
import { useGetCountryVisaTypesQuery } from '@/services/api/cms/countryVisaTypeSlice';

interface VisaChecklistActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}

const VisaChecklistActionModal: React.FC<VisaChecklistActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    const [embassyFilter, setEmbassyFilter] = useState<any>([]);
    const { data: countries, isLoading, isFetching } = useGetCountriesQuery({ page: 0, limit: 0 });
    const { items = [], meta = {} } = countries || {};
    const [visaTypes, setVisaTypes] = useState([]);
    // const { page, limit, sortField, sortOrder, search, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 0 });
    const { data: embassy } = useGetEmbassyVfsQuery({ page: 0, limit: 0 });

    const { data: countryVisaTypes } = useGetCountryVisaTypesQuery({ page: 0, limit: 0 });

    const embassyData = useMemo(() => {
        return embassy?.items?.map((item: any) => item.type === 'embassy' && item);
    }, [embassy]);

    useEffect(() => {
        if (addData?.country?.id) {
            const filteredEmbassies = embassyData.filter((item: any) => item?.country?.id === +addData.country.id);
            setEmbassyFilter(filteredEmbassies);
        }
    }, [addData, embassyData]);

    // useEffect(() => {
    //     if (addData.country) {
    //         const filteredEmbassies = embassyData.filter((item: any) => {
    //             return item?.country?.id === +addData.country.id;
    //         });
    //         setEmbassyFilter(filteredEmbassies);
    //     }
    // }, [ addData.country,addData]);

    const handleEmbassyChange = (option: any) => {
        const filteredEmbassies = embassyData.filter((item: any) => {
            return item?.country?.id == option.id;
        });
        setEmbassyFilter(filteredEmbassies);
    };

    const handleSelectChange = (e: any) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option: any) => ({
            id: parseInt(option.value), // Parse the id to an integer
            name: option.text, // Store the name if necessary
        }));

        setAddData((prevData: any) => ({
            ...prevData,
            embassy_vfs: selectedOptions,
        }));
    };

    return (
        <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-4xl">
            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Add Visa Checklist</h5>
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
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <SearchableDropdown addData={addData} setAddData={setAddData} handleEmbassyChange={handleEmbassyChange} items={countryVisaTypes?.items} setVisaTypes={setVisaTypes} />
                    {/* <div className="dropdown">
                        <label htmlFor="country">Countries*</label>
                        <select
                            className="form-input"
                            id="country"
                            value={addData?.country?.id}
                            onChange={(e) => {
                                handleInputChange(e);
                                handleEmbassyChange(e);
                            }}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select Countries
                            </option>
                            {items?.map((country: any) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div> */}
                    <div className="dropdown ">
                        <label htmlFor=" visa_type">Visa Type*</label>
                        <select className="form-input p-3" defaultValue="" id="visa_type" value={addData?.visa_type?.id} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled>
                                Select Visa Type
                            </option>
                            {visaTypes?.map((type: any) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        {/* <label htmlFor="embassy">Embassy*</label>
                        <textarea
                            id="embassy"
                            rows={3}
                            placeholder="Enter Embassy"
                            className="form-textarea min-h-[80px] resize-none"
                            value={addData?.embassy}
                            onChange={(e) => handleInputChange(e)}
                        ></textarea> */}
                        <label htmlFor="embassy">Embassy*</label>
                        <select
                            id="embassy_vfs"
                            multiple
                            className="form-select"
                            // value={addData?.embassy_vfs ? addData?.embassy_vfs?.split(', ') : []} // assuming addData.embassy is an array
                            value={addData?.embassy_vfs?.map((item: any) => item.id) || []}
                            onChange={(e) => handleSelectChange(e)}
                        >
                            {embassyFilter?.map((data: any) => (
                                <option key={data.id} value={data.id}>
                                    {data.name} -{data.city}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        {/* <MarkdownEditor handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} /> */}
                        <label htmlFor="Checklist">Checklist*</label>
                        <VisafeeEditorJodit title={'checklist'} handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} />
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        {/* <VisafeeEditor handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} /> */}
                        <label htmlFor="Checklist">Visa Fee information*</label>

                        <VisafeeEditorJodit title={'fee'} handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} />
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        <NewComponentsFormsFileUploadMultiple setAddData={setAddData} addData={addData} />
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
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
    );
};

export default VisaChecklistActionModal;
