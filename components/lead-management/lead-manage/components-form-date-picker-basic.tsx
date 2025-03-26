'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { IRootState } from '@/store';

interface ComponentsFormDatePickerBasicProps {
    label: string;
    id: string;
    setAddData: (data: any) => void;
    addData: any;
    isEdit?: boolean;
    currentDate?: any;
    disable?: boolean;
}

const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Returns 'dd-mm-yyyy'
};

const parseDateString = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        const [day, month, year] = parts.map(Number);
        const parsedDate = new Date(year, month - 1, day); // Month is zero-based
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
    }
    return null;
};

const ComponentsFormDatePickerBasic: React.FC<ComponentsFormDatePickerBasicProps> = ({ label, id, setAddData, isEdit, addData, currentDate, disable }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date1, setDate1] = useState<string>('');
    const [typedValue, setTypedValue] = useState<string>(''); // Separate state for typing

    useEffect(() => {
        if (isEdit && addData?.[id]) {
            setDate1(addData[id]);
            setTypedValue(addData[id]); // Ensure input field is in sync
        } else if (!isEdit && !addData?.[id] && currentDate) {
            const formattedDate = formatDate(currentDate);
            setDate1(formattedDate);
            setTypedValue(formattedDate);
            setAddData((prevData: any) => ({
                ...prevData,
                [id]: formattedDate,
            }));
        }
    }, [isEdit, addData, id, setAddData, currentDate]);

    const handleDateChange = (selectedDates: Date[]) => {
        if (selectedDates.length > 0) {
            const formattedDate = formatDate(selectedDates[0]);
            setDate1(formattedDate);
            setTypedValue(formattedDate);
            setAddData((prevData: any) => ({
                ...prevData,
                [id]: formattedDate,
            }));
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypedValue(event.target.value); // Allow typing without updating Flatpickr state
    };

    const handleBlur = () => {
        const parsedDate = parseDateString(typedValue);
        if (parsedDate) {
            const formattedDate = formatDate(parsedDate);
            setDate1(formattedDate);
            setTypedValue(formattedDate);
            setAddData((prevData: any) => ({
                ...prevData,
                [id]: formattedDate,
            }));
        } else {
            setTypedValue(date1); // Reset to last valid date if invalid
        }
    };

    return (
        <div className="mb-5">
            <label htmlFor={id}>{label}</label>
            <Flatpickr
                value={typedValue} // Uses typed value for smooth input
                disabled={disable}
                options={{
                    dateFormat: 'd-m-Y',
                    position: isRtl ? 'auto right' : 'auto left',
                    allowInput: true, // Enable manual input
                }}
                className="form-input"
                onChange={handleDateChange}
                onInput={(e: any) => handleInputChange(e)}
                onClose={handleBlur} // Validate when losing focus
            />
        </div>
    );
};

export default ComponentsFormDatePickerBasic;
