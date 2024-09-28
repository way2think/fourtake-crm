import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { IRootState } from '@/store';

interface ComponentsFormDatePickerRangeProps {
    // setDateFilter: any;
    // dateFilter: any[];
    // data: any;
    addData?: any;
    setAddData?: any;
    setDateFilter: (value: any) => void;
    title?: any;
}

const getTodayDateRange = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    // Construct the date range string
    return `${year}-${month}-${day} to ${year}-${month}-${day}`;
};

const ComponentsFormDatePickerRange: React.FC<ComponentsFormDatePickerRangeProps> = ({ setDateFilter, setAddData, addData,title }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date3, setDate3] = useState<any>(() => {
        title == 'lead filter' ? ' ' : addData?.date_range || getTodayDateRange();
    });
    //const [date3, setDate3] = useState<string>('');
    const [dateRange, setDateRange] = useState<Date[]>([]);

    useEffect(() => {
        if (addData?.date_range) {
            setDate3(addData?.date_range);
        }
    }, [addData?.date_range]);

    // Update records based on date3 change
    // useEffect(() => {
    //     if (typeof date3 === 'string' && date3.includes(' to ')) {
    //         const [startDateStr, endDateStr] = date3.split(' to ');
    //         const startDate = new Date(startDateStr);
    //         const endDate = new Date(endDateStr);

    //         // Filter records based on the date range
    //         const filteredRecords = data.filter((record: any) => {
    //             const recordDate = new Date(record.applydate);
    //             return recordDate >= startDate && recordDate <= endDate;
    //         });

    //         if (dateFilter !== filteredRecords) {
    //             setDateFilter(filteredRecords);
    //         }
    //     }
    // }, [date3]);

    // console.log("date filter", dateFilter)

    const handleDateChange = (selectedDates: Date[]) => {
        setDateRange(selectedDates);

        if (selectedDates.length === 2) {
            const startDate = selectedDates[0];
            const endDate = selectedDates[1];

            // Adjust endDate to be inclusive of the whole day
            //endDate.setDate(endDate.getDate() + 1); // Increment by 1 day to include the selected end date

            // Format dates in YYYY-MM-DD format
            const formattedStartDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];

            const formattedDate = `${formattedStartDate} to ${formattedEndDate}`;
            setDateFilter(formattedDate);
            if(setAddData){
                setAddData((prev: any) => ({ ...prev, date_range: formattedDate }));
            }
           
        } else {
            setDateFilter(null); // No date range selected, reset filter
        }
    };

    return (
        <div className="mb-5">
            <label htmlFor="date">From Date to To Date</label>
            <Flatpickr
                id="From_Date_to_To_Date"
                options={{
                    mode: 'range',
                    dateFormat: 'Y-m-d',
                    position: isRtl ? 'auto right' : 'auto left',
                }}
                defaultValue={date3}
                className="form-input w-full"
                onChange={handleDateChange}
            />
        </div>
    );
};

export default ComponentsFormDatePickerRange;
