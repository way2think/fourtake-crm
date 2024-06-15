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
}



const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const ComponentsFormDatePickerBasic: React.FC<ComponentsFormDatePickerBasicProps> = ({ label, id, setAddData, isEdit, addData }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date1, setDate1] = useState<string>();

    useEffect(() => {
        if (isEdit && addData && id && addData[id]) {
            setDate1(addData[id]);
        }
    }, [isEdit, addData, id]);

    const handleDateChange = (selectedDates: Date[]) => {
        const selectedDate = selectedDates[0];
        const formattedDate = formatDate(selectedDate);
        // console.log("select",selectedDate,formattedDate)
        setDate1(formattedDate);
        setAddData((prevData: any) => ({
            ...prevData,
            [id]: formattedDate,
        }));
    };


    return (
        <div className="mb-5">
            <label htmlFor={id}>{label}</label>
            <Flatpickr
                value={date1}
                options={{
                    dateFormat: 'd-m-Y',
                    position: isRtl ? 'auto right' : 'auto left',
                }}
                className="form-input"
                onChange={handleDateChange}
            />
        </div>
    );
};

export default ComponentsFormDatePickerBasic;
