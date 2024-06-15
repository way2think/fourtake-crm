'use client';

import { IRootState } from '@/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

interface ComponentsFormDatePickerBasicProps {
    id: string;
    setAddData: (data: any) => void;
    addData: any;
    isEdit?: boolean;
}

const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    return `${day}/${month}/${year} ${strTime}`;
};

const ComponentsFormDatePickerTime: React.FC<ComponentsFormDatePickerBasicProps> = ({ id, setAddData, addData, isEdit }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const time = new Date().toLocaleTimeString();
    const [date4, setDate4] = useState<any>();
    console.log('date', date4, addData);
    useEffect(() => {
        if (isEdit && addData && id && addData[id]) {
            setDate4(addData[id]);
        }
    }, [isEdit, addData, id]);


    const handleDateChange = (selectedDates: Date[]) => {
        const selectedDate = selectedDates[0];
        const formattedDate = formatDate(selectedDate);
        console.log('select', selectedDate, formattedDate);
        setDate4(formattedDate);
        setAddData((prevData: any) => ({
            ...prevData,
            [id]: formattedDate,
        }));
    };

    return (
        <>
            <div className="mb-5">
                <label htmlFor="date">Time</label>
                <Flatpickr
                    options={{
                        noCalendar: true,
                        enableTime: true,
                        dateFormat: 'h:i K',
                        position: isRtl ? 'auto right' : 'auto left',
                    }}
                    value={date4}
                    className="form-input"
                    onChange={handleDateChange}
                />
            </div>
        </>
    );
};

export default ComponentsFormDatePickerTime;
