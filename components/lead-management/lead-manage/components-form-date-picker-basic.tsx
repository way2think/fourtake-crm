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
    return date.toISOString(); // Convert to ISO 8601 string
};

const ComponentsFormDatePickerBasic: React.FC<ComponentsFormDatePickerBasicProps> = ({ label, id, setAddData, isEdit, addData, currentDate, disable }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date1, setDate1] = useState<string>();
    const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0 && obj.constructor === Object;

    useEffect(() => {
        if (isEdit && addData && id && addData[id]) {
            setDate1(addData[id]);
        } else if (!isEdit && !addData?.[id] && currentDate) {
            // const currentDate = formatDate(new Date());
            setDate1(formatDate(currentDate));
            setAddData((prevData: any) => ({
                ...prevData,
                [id]: formatDate(currentDate),
            }));
        }
    }, [isEdit, addData, id, setAddData]);

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
                value={date1 || ''}
                disabled={disable ? true : false}
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
