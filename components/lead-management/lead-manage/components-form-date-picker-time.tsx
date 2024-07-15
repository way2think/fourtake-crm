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

const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
};

const ComponentsFormDatePickerTime: React.FC<ComponentsFormDatePickerBasicProps> = ({ id, setAddData, addData, isEdit }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [time, setTime] = useState<string | undefined>(undefined);
    const [date4, setDate4] = useState<Date[]>([]);

    useEffect(() => {
        if (isEdit && addData && id && addData[id]) {
            setTime(addData[id]);
        }
    }, [isEdit, addData, id]);

    const handleDateChange = (selectedDates: Date[]) => {
        const selectedDate = selectedDates[0];
        const formattedTime = formatTime(selectedDate);
        setTime(formattedTime);
        setAddData((prevData: any) => ({
            ...prevData,
            [id]: formattedTime,
        }));
    };

    return (
        <div className="mb-5">
            <label htmlFor="date">Time</label>
            <Flatpickr
                options={{
                    noCalendar: true,
                    enableTime: true,
                    dateFormat: 'h:i K',
                    position: isRtl ? 'auto right' : 'auto left',
                }}
                value={time}
                className="form-input"
                onChange={handleDateChange}
            />
        </div>
    );
};

export default ComponentsFormDatePickerTime;
