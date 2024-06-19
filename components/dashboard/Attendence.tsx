
import IconFile from '../icon/icon-file';
import IconLogout from '../icon/icon-logout';
import React, { useState } from 'react';

const Attendence = () => {
    function handleInputChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        throw new Error('Function not implemented.');
    }
    const [formData, setFormData] = useState({
        passport: '',
        residence: '',
        country: '',
        trip: ''
    });

    const [errors, setErrors] = useState({
        passport: false,
        residence: false,
        country: false,
        trip: false
    });

    type FormFields = {
        passport: string;
        residence: string;
        country: string;
        trip: string;
    };

    type ErrorFields = {
        [key in keyof FormFields]: boolean;
    };

    const handleInputChangeAttendence = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
        setErrors({
            ...errors,
            [id]: false
        });
    };

    const handleSubmitAttendence = () => {
        const newErrors: ErrorFields = {
            passport: formData.passport === '',
            residence: formData.residence === '',
            country: formData.country === '',
            trip: formData.trip === ''
        };

        setErrors(newErrors);

        for (const [field, hasError] of Object.entries(newErrors)) {
            if (hasError) {
                alert(`Please fill out the ${field.charAt(0).toUpperCase() + field.slice(1)} field.`);
                return;
            }
        }

        // Form is valid, handle the form submission here
        console.log('Form submitted successfully with data:', formData);
        alert('Form submitted successfully');
    };

    return (
        <>
            <section className="rounded-md bg-[#fff]  p-5 shadow-lg ">
                <h1 className="mb-2 text-left text-2xl font-bold text-[#005fbe]">Attendence</h1>

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
                    <h1 className="mb-2 text-left text-2xl font-bold text-[#005fbe]">Dashboard</h1>

                    <div className=" grid grid-cols-1 items-center justify-between  gap-5 md:grid-cols-2">
                        <div className="dropdown mb-5">
                            <label htmlFor="passport">I Hold a Passport From</label>
                            <select className="form-input" defaultValue="" id="passport" value={formData.passport} onChange={handleInputChangeAttendence}>
                                <option value="" disabled={true}>
                                    I Hold a Passport From
                                </option>
                                <option value="Canada">Canada</option>
                                <option value="India">India</option>
                                <option value="Usa">Usa</option>
                            </select>
                        </div>
                        <div className="dropdown mb-5">
                            <label htmlFor="residence">State of Residence</label>
                            <select className="form-input" defaultValue="" id="residence" value={formData.residence} onChange={handleInputChangeAttendence}>
                                <option value="" disabled={true}>
                                    Select
                                </option>
                                <option value="Canada">Canada</option>
                                <option value="India">India</option>
                                <option value="Usa">Usa</option>
                            </select>
                        </div>
                    </div>
                    <div className=" grid grid-cols-1 items-center justify-between  gap-5 md:grid-cols-2">
                        <div className="dropdown mb-5">
                            <label htmlFor="country">I am going to </label>
                            <select className="form-input" defaultValue="" id="country" value={formData.country} onChange={handleInputChangeAttendence}>
                                <option value="" disabled={true}>
                                    Select Visa Country
                                </option>
                                <option value="Canada">Canada</option>
                                <option value="India">India</option>
                                <option value="Usa">Usa</option>
                            </select>
                        </div>
                        <div className="dropdown mb-5">
                            <label htmlFor="trip">My Purpose of trip is</label>
                            <select className="form-input" defaultValue="" id="trip" value={formData.trip} onChange={handleInputChangeAttendence}>
                                <option value="" disabled={true}>
                                    Select Visa Category
                                </option>
                                <option value="Canada">Canada</option>
                                <option value="India">India</option>
                                <option value="Usa">Usa</option>
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
