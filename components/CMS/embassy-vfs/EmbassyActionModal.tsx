import IconX from '@/components/icon/icon-x';
import ComponentsFormsFileUploadMulti from '../../Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '../../Reusable/file-upload/components-forms-file-upload-single';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import ComponentsFormsSelectMultiselect from '@/components/Reusable/select/components-forms-select-multiselect';
import { useGetCountriesQuery } from '@/services/api/cms/countrySlice';
import { stateCityData } from '@/utils/constant';
import React, { useState } from 'react';

// interface StateCityData {
//     [key: string]: string[];
//   }

// const stateCityData: StateCityData = {
//     'Andaman and Nicobar Islands': ['Port Blair', 'Nicobar'],
//     'Andhra Pradesh': ['Vishakhapatnam', 'Vijayawada'],
//     // other states...
//   };

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
    const [states] = useState(Object.keys(stateCityData));
    const [cities, setCities] = useState<string[]>([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const { data: countries, isLoading, isFetching } = useGetCountriesQuery(undefined);
    const { items = [], meta = {} } = countries || {};
    const options: OptionType[] = [
        { value: 'Chennai', label: 'Chennai' },
        { value: 'Vellore', label: 'Vellore' },
        { value: 'Bengaluru', label: 'Bengaluru' },
        { value: 'New Delhi', label: 'New Delhi' },
        { value: 'Mangalore', label: 'Work Visa' },
        { value: 'Mumbai', label: 'Mumbai' },
    ];
    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const state = e.target.value;
        setAddData({...addData,state})
        
        setSelectedState(state);
        setCities(stateCityData[state] || []);
        setSelectedCity(''); // Reset city when state changes
      };
      const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
        const city = e.target.value;
        setAddData({...addData,city})
      };
      debugger;
      console.log(addData)

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
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
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
                        <div className="dropdown">
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
                        </div>
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
                                <option value="" >State</option>
                                {states.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="city">City</label>
                            <select className="form-input" defaultValue="" id="city" onChange={handleCityChange} value={addData?.city}>  
                                <option value="" >City</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>{city}</option>
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
