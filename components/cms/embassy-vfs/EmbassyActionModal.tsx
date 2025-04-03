import IconX from '@/components/icon/icon-x';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import ComponentsFormsSelectMultiselect from '@/components/Reusable/select/components-forms-select-multiselect';
import { useGetCountriesQuery } from '@/services/api/cms/countrySlice';
import { stateCityData } from '@/utils/constant';
import React, { useState, useEffect } from 'react';
import SearchableDropdown from '@/components/Reusable/country-selector/CountrySearchDropdown';

interface StateCities {
    [key: string]: string[];
}

interface EmbassyActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}
interface OptionType {
    value: string;
    label: string;
}
const EmbassyActionModal: React.FC<EmbassyActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    // const [states] = useState(Object.keys(stateCityData));
    const [states] = useState(Object.keys(stateCityData).sort());
    const [cities, setCities] = useState<string[]>([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const { data: countries, isLoading, isFetching } = useGetCountriesQuery({ page: 0, limit: 0 });
    const { items = [], meta = {} } = countries || {};

    const options: OptionType[] = [
        { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
        { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
        { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
        { value: 'Assam', label: 'Assam' },
        { value: 'Bihar', label: 'Bihar' },
        { value: 'Chandigarh', label: 'Chandigarh' },
        { value: 'Chhattisgarh', label: 'Chhattisgarh' },
        { value: 'Dadra and Nagar Haveli', label: 'Dadra and Nagar Haveli' },
        { value: 'Daman and Diu', label: 'Daman and Diu' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Goa', label: 'Goa' },
        { value: 'Gujarat', label: 'Gujarat' },
        { value: 'Haryana', label: 'Haryana' },
        { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
        { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
        { value: 'Jharkhand', label: 'Jharkhand' },
        { value: 'Karnataka', label: 'Karnataka' },
        { value: 'Kerala', label: 'Kerala' },
        { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
        { value: 'Maharashtra', label: 'Maharashtra' },
        { value: 'Meghalaya', label: 'Meghalaya' },
        { value: 'Mizoram', label: 'Mizoram' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Nagaland', label: 'Nagaland' },
        { value: 'Orissa', label: 'Orissa' },
        { value: 'Puducherry', label: 'Puducherry' },
        { value: 'Punjab', label: 'Punjab' },
        { value: 'Rajasthan', label: 'Rajasthan' },
        { value: 'Sikkim', label: 'Sikkim' },
        { value: 'Tamil Nadu', label: 'Tamil Nadu' },
        { value: 'Telangana', label: 'Telangana' },
        { value: 'Tripura', label: 'Tripura' },
        { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
        { value: 'Uttarakhand', label: 'Uttarakhand' },
        { value: 'Uttaranchal', label: 'Uttaranchal' },
        { value: 'West Bengal', label: 'West Bengal' },
    ];

    useEffect(() => {
        if (addData?.state) {
            // setCities(stateCityData[addData.state] || []);
            setCities((stateCityData[addData.state] || []).sort());
            setSelectedCity(''); // Reset city when state changes
        }
    }, [addData?.state]);
    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const state = e.target.value;
        setAddData({ ...addData, state });

        setSelectedState(state);
        setCities((stateCityData[state] || []).sort());
        // setCities(stateCityData[state] || []);
        setSelectedCity(''); // Reset city when state changes
    };
    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
        const city = e.target.value;
        setAddData({ ...addData, city });
    };

    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-5xl">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">{addData.id ? 'Edit' : 'Add'} Embassy</h5>
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
                        <div className="dropdown">
                            <label htmlFor="type">Embassy / VFS</label>
                            <select className="form-input" defaultValue="" id="type" onChange={(e) => handleInputChange(e)} value={addData?.type}>
                                <option value="" disabled={true}>
                                    Select Embassy / VFS
                                </option>
                                <option value="embassy">Embassy</option>
                                <option value="vfs">VFS</option>
                            </select>
                        </div>
                        <SearchableDropdown addData={addData} setAddData={setAddData} items={items} heading="Country" />
                        {/* <div className="dropdown">
                            <label htmlFor="visacountry"> Country</label>
                            <select className="form-input" defaultValue="" id="country" onChange={(e) => handleInputChange(e)} value={addData?.country?.id}>
                                <option value="" disabled={true}>
                                    Countries
                                </option>
                                {items.map((country: any) => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="dropdown">
                            <label htmlFor="jurisdiction">Jurisdiction</label>
                            <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                                <ComponentsFormsSelectMultiselect addData={addData} options={options} setAddData={setAddData} id={'jurisdiction'} />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5 mt-4">
                            <label htmlFor="name">Name</label>
                            <input id="name" type="tel" placeholder="Enter Name" className="form-input" onChange={(e) => handleInputChange(e)} value={addData?.name} />
                        </div>
                    </div>
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <div className="mb-5">
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                onChange={(e) => handleInputChange(e)}
                                value={addData?.address}
                                rows={3}
                                placeholder="Enter Address Details"
                                className="form-textarea min-h-[80px] resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="dropdown">
                            <label htmlFor="state">State</label>
                            <select className="form-input" defaultValue="" id="state" onChange={handleStateChange} value={addData?.state}>
                                <option value="">State</option>
                                {states.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="city">City</label>
                            <select className="form-input" defaultValue="" id="city" onChange={handleCityChange} value={addData?.city}>
                                <option value="">City</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5 mt-5">
                            <label htmlFor="telephone">Telephone</label>
                            <input id="phone" onChange={(e) => handleInputChange(e)} value={addData?.phone} type="tel" placeholder="Enter Telephone" className="form-input" />
                        </div>
                        <div className="mb-5 mt-5">
                            <label htmlFor="fax">Fax</label>
                            <input id="fax" onChange={(e) => handleInputChange(e)} value={addData?.fax} type="text" placeholder="Enter Fax" className="form-input" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="email">Email</label>
                            <input id="email" onChange={(e) => handleInputChange(e)} value={addData?.email} type="email" placeholder="Enter Email" className="form-input" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="submission_details">Submission Details</label>
                            <input
                                id="submission_details"
                                onChange={(e) => handleInputChange(e)}
                                value={addData?.submission_details}
                                type="text"
                                placeholder="Enter Submission Details"
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                        <div className="mb-5">
                            <label htmlFor="collection_details">Collection Details</label>
                            <input
                                id="collection_details"
                                onChange={(e) => handleInputChange(e)}
                                value={addData?.collection_details}
                                type="text"
                                placeholder="Enter Collection Details"
                                className="form-input"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="processing_time">Processing Time</label>
                            <input
                                id="processing_time"
                                onChange={(e) => handleInputChange(e)}
                                value={addData?.processing_time}
                                type="text"
                                placeholder="Enter Processing Time"
                                className="form-input"
                            />
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

export default EmbassyActionModal;
