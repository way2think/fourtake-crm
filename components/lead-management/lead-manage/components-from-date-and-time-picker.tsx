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
}

const formatDate = (date: Date) => {
    return date.toISOString(); // Convert to ISO 8601 string
};

function convertToDateObject(dateString: any) {
    // Split the date and time components
    const [datePart, timePart] = dateString.split(', '); // "18/10/2024", "10:00"
    const [day, month, year] = datePart.split('/'); // "18", "10", "2024"
    const [hours, minutes] = timePart.split(':'); // "10", "00"

    // Rearrange into "YYYY-MM-DDTHH:mm:ss" format
    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:00`;

    // Convert to Date object
    const dateObject = new Date(isoString);
    return dateObject;
}

// const ComponentsFormDateAndTimePicker: React.FC<ComponentsFormDateAndTimePickerProps> = ({ label, id, setAddData, isEdit, addData, currentDate, disable }) => {
//     const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
//     const [date1, setDate1] = useState<string>();
//     const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0 && obj.constructor === Object;

//     useEffect(() => {
//         if (isEdit && addData && id && addData[id]) {
//             setDate1(addData[id]);
//         } else if (!isEdit && !addData?.[id] && currentDate) {
//             // const currentDate = formatDate(new Date());
//             setDate1(formatDate(currentDate));
//             setAddData((prevData: any) => ({
//                 ...prevData,
//                 [id]: formatDate(currentDate),
//             }));
//         }
//     }, [isEdit, addData, id, setAddData]);

//     const handleDateChange = (selectedDates: Date[]) => {
//         const selectedDate = selectedDates[0];
//         // const formattedDate = formatDate(selectedDate);

//         const localDate = new Date(selectedDate).toLocaleString('en-IN', {
//             timeZone: 'Asia/Kolkata', // Set to IST
//             hour12: false, // 24-hour format
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//         });

//         console.log('select', selectedDate, localDate);
//         setDate1(localDate);
//         setAddData((prevData: any) => ({
//             ...prevData,
//             [id]: localDate,
//         }));
//     };

//     return (
//         <div className="mb-5">
//             <label htmlFor={id}>{label}</label>
//             <Flatpickr
//                 value={date1 || ''}
//                 disabled={disable ? true : false}
//                 options={{
//                     dateFormat: 'd-m-Y H:i', // Adds time format to date
//                     enableTime: true, // Enables time picker
//                     time_24hr: true, // 24-hour format (common in India)
//                     defaultHour: 0, // Set default time hour
//                     defaultMinute: 0, // Set default time minute
//                     position: isRtl ? 'auto right' : 'auto left',
//                 }}
//                 className="form-input"
//                 onChange={handleDateChange}
//             />
//         </div>
//     );
// };

const ComponentsFormDateAndTimePicker: React.FC<ComponentsFormDateAndTimePickerProps> = ({ label, id, setAddData, isEdit, addData, currentDate, disable }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date1, setDate1] = useState<string | any | null>(null);

    useEffect(() => {
        if (isEdit && addData && id && addData[id]) {
            setDate1(convertToDateObject(addData[id]));
        } else if (!isEdit && !addData?.[id] && currentDate) {
            const istCurrentDate = new Date(currentDate).toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour12: false,
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
            setDate1(istCurrentDate);
            setAddData((prevData: any) => ({
                ...prevData,
                [id]: istCurrentDate,
            }));
        }
    }, [isEdit, addData, id, setAddData, currentDate]);

    const handleDateChange = (selectedDates: Date[]) => {
        const selectedDate = selectedDates[0];

        // Format the selected date to IST
        const istDate = new Date(selectedDate).toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        console.log('Selected IST Date:', istDate);

        setDate1(istDate); // Store the IST formatted date
        setAddData((prevData: any) => ({
            ...prevData,
            [id]: istDate, // Store IST formatted string in addData
        }));
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
                    time_24hr: true, // 24-hour format
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
