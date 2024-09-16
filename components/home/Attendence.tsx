import IconFile from '../icon/icon-file';
import IconLogout from '../icon/icon-logout';
import React, { useState } from 'react';
import { showMessage } from '@/utils/notification';
import { stateCityData } from '@/utils/constant';
import { useGetCountryVisaTypesQuery } from '@/services/api/cms/countryVisaTypeSlice';
import { VisaType } from '@/entities/visa-type.entity';
import CountrySearchDropdown from '../Reusable/country-selector/CountrySearchDropdown';
import { useRouter } from 'next/navigation';

const Attendence = () => {
    const [states] = useState(Object.keys(stateCityData).sort());
    const [formData, setFormData] = useState({
        passport: 75,
        residence_state: '',
        country: '',
        visa_type: '',
    });
    const [visaTypes, setVisaTypes] = useState([]);
    const router = useRouter();
    const { data: countryVisaTypes } = useGetCountryVisaTypesQuery({ page: 0, limit: 0 });

    const [errors, setErrors] = useState({
        passport: false,
        residence_state: false,
        country: false,
        visa_type: false,
    });

    type FormFields = {
        passport: string;
        residence_state: string;
        country: string;
        visa_type: string;
    };

     type ErrorFields = {
        [key in keyof FormFields]: boolean;
    };

    const handleInputChangeAttendence = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
        setErrors({
            ...errors,
            [id]: false,
        });
    };
    // console.log('formData', formData);
    const handleSubmitAttendence = () => {
        const newErrors: ErrorFields = {
            passport: formData.passport == null,
            residence_state: formData.residence_state === '',
            country: formData.country === '',
            visa_type: formData.visa_type === '',
        };

        setErrors(newErrors);

        for (const [field, hasError] of Object.entries(newErrors)) {
            if (hasError) {
                //alert(`Please fill out the ${field.charAt(0).toUpperCase() + field.slice(1)} field.`);
                showMessage(`Please fill out the ${field.charAt(0).toUpperCase() + field.slice(1)} field.`, 'error');
                return;
            }
        }

        router.push(`/check-requirements?countryId=${formData.country}&visaTypeId=${formData.visa_type}&stateOfResidence=${formData.residence_state}`);

        // Form is valid, handle the form submission here
        console.log('Form submitted successfully with data:', formData);
        //alert('Form submitted successfully');
        showMessage('Form submitted successfully.');
    };

    return (
        <>
            <section className="rounded-md bg-[#fff]  p-5 shadow-lg ">
                <h1 className="mb-2 text-left text-2xl font-bold text-[#2eb9fe]">Attendence</h1>

                <div className=" grid grid-cols-1 items-center justify-between  gap-5    md:grid-cols-2">
                    <div>
                        <p className="font-bold text-[#000]">Start Time: 09/09/2024 10:30pm</p>
                    </div>
                    <div className="flex items-center justify-end">
                        <button type="button" className=" btn btn-primary w-2/4">
                            <IconLogout className="ltr:mr-2 rtl:ml-2" />
                            End of the day
                        </button>
                    </div>
                </div>
            </section>
            <div>
                <section className="mb-5 mt-5  rounded-md bg-[#fff] p-5 shadow-lg">
                    <h1 className="mb-2 text-left text-2xl font-bold text-[#2eb9fe]">Dashboard</h1>

                    <div className=" grid grid-cols-1 items-center justify-between  gap-5 md:grid-cols-2">
                        <div className="dropdown mb-4 mt-2">
                            <label htmlFor="passport">I Hold a Passport From</label>
                            <select className="form-input" defaultValue="india" id="residence_state" value={formData?.passport} onChange={(e) => handleInputChangeAttendence(e)}>
                                <option value="" disabled={true}>
                                    Select Country
                                </option>
                                <option value="india">India</option>
                            </select>
                        </div>
                        <div className="dropdown mb-4 mt-2">
                            <label htmlFor="residence_state">State of Residence</label>
                            <select className="form-input" defaultValue="" id="residence_state" value={formData?.residence_state} onChange={(e) => handleInputChangeAttendence(e)}>
                                <option value="" disabled={true}>
                                    Select State
                                </option>

                                {states.map((state) => (
                                    <option value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className=" grid grid-cols-1 items-center justify-between  gap-5 md:grid-cols-2">
                        <CountrySearchDropdown
                            addData={formData}
                            setAddData={setFormData}
                            //  handleEmbassyChange={handleEmbassyChange}
                            items={countryVisaTypes?.items}
                            setVisaTypes={setVisaTypes}
                            heading="I am going to"
                            title="country"
                        />

                        <div className="dropdown mb-5 mt-2">
                            <label htmlFor="visa_type">My Purpose of visa_type is</label>
                            <select
                                className="form-input"
                                defaultValue=""
                                id="visa_type"
                                // value={formData?.visa_type?.id}
                                onChange={(e) => handleInputChangeAttendence(e)}
                            >
                                <option value="" disabled={true}>
                                    Visa Type
                                </option>

                                {visaTypes.map((visaType: VisaType) => (
                                    <option key={visaType.id} value={visaType.id}>
                                        {visaType.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className=" flex  items-center justify-center  ">
                        <button type="button" className=" btn btn-primary w-2/4" onClick={handleSubmitAttendence}>
                            <IconLogout className="ltr:mr-2 rtl:ml-2" />
                            Check Requirements
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Attendence;
