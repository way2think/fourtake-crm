'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { IRootState } from '@/store';

interface ComponentsFormDateAndTimePickerProps {
    label: string;
    id: string;
    setAddData: (data: any) => void;
    addData: any;
    isEdit?: boolean;
    currentDate?: any;
    disable?: boolean;
    updateUser?: boolean;
}

// Helper function to format date as "YYYY-MM-DD HH:MM:SS"
const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0'); // Use getHours for local time
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Use getMinutes for local time
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Capture seconds
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const ComponentsFormDateAndTimePicker: React.FC<ComponentsFormDateAndTimePickerProps> = ({ label, id, setAddData, isEdit, addData, currentDate, disable, updateUser = false }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date1, setDate1] = useState<string | any | null>(null);

    useEffect(() => {
        if (isEdit && addData && id && addData[id]) {
            setDate1(new Date(addData[id]));
        } else if (!isEdit && !addData?.[id] && currentDate) {
            const formattedDate = formatDateTime(new Date(currentDate));
            setDate1(formattedDate);
            setAddData((prevData: any) => ({
                ...prevData,
                [id]: formattedDate,
            }));
        }
    }, [isEdit, addData, id, setAddData, currentDate]);

    const handleDateChange = (selectedDates: Date[]) => {
        const selectedDate = selectedDates[0];
        const formattedDateTime = formatDateTime(selectedDate);

        setDate1(selectedDate);

        if (updateUser) {
            //it will update status to all the applicants in the group
            const updatedVisaApplicants = addData.visa_applicants.map((item: any) => ({
                ...item,
                [id]: formattedDateTime,
            }));

            setAddData((prevData: any) => ({
                ...prevData,
                visa_applicants: updatedVisaApplicants,
                [id]: formattedDateTime,
            }));
        } else {
            setAddData((prevData: any) => ({
                ...prevData,
                [id]: formattedDateTime,
            }));
        }
    };

    return (
        <div className="mb-5">
            <label htmlFor={id}>{label}</label>
            <Flatpickr
                value={date1 || ''}
                disabled={disable ? true : false}
                options={{
                    dateFormat: 'd-m-Y H:i', // Adds time format to date
                    enableTime: true, // Enables time picker
                    time_24hr: false, // Use 12-hour format
                    defaultHour: 0, // Set default time hour
                    defaultMinute: 0, // Set default time minute
                    position: isRtl ? 'auto right' : 'auto left',
                }}
                className="form-input"
                onChange={handleDateChange}
            />
        </div>
    );
};

export default ComponentsFormDateAndTimePicker;
