import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { IRootState } from '@/store';

interface ComponentsFormDatePickerRangeProps {
    setFilterItem: any;
    filterItem: any[];
    data:any;
}

const ComponentsFormDatePickerRange: React.FC<ComponentsFormDatePickerRangeProps> = ({ setFilterItem, filterItem,data }) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date3, setDate3] = useState<string>('2022-02-05 to 2022-02-30');

    // Update records based on date3 change
    useEffect(() => {
        if (typeof date3 === 'string' && date3.includes(' to ')) {
            const [startDateStr, endDateStr] = date3.split(' to ');
            const startDate = new Date(startDateStr);
            const endDate = new Date(endDateStr);

            // Filter records based on the date range
            const filteredRecords = data.filter((record: any) => {
                const recordDate = new Date(record.applydate);
                console.log('recordDate1', recordDate >= startDate && recordDate <= endDate ,record );
                return recordDate >= startDate && recordDate <= endDate;
            });

            console.log('recordDate', filteredRecords);

            if(filterItem !== filteredRecords){
                setFilterItem(filteredRecords);
            }
          
        }
    }, [date3]);

    const handleDateChange = (selectedDates: Date[]) => {
        if (selectedDates.length === 2) {
            const startDate = selectedDates[0].toISOString().split('T')[0];
            const endDate = selectedDates[1].toISOString().split('T')[0];
            setDate3(`${startDate} to ${endDate}`);
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
                defaultValue={[new Date('2022-07-05'), new Date('2022-07-30')]}
                className="form-input w-full"
                onChange={handleDateChange}
            />
        </div>
    );
};

// const FilterableTable: React.FC = () => {
//     const [filterItem, setFilterItem] = useState([
//         { id: 1, applydate: '2022-07-06', name: 'Record 1' },
//         { id: 2, applydate: '2022-07-15', name: 'Record 2' },
//         { id: 3, applydate: '2022-08-01', name: 'Record 3' },
//         // Add more records as needed
//     ]);

//     return (
//         <div>
//             <ComponentsFormDatePickerRange setFilterItem={setFilterItem} filterItem={filterItem} />
//             <table className="table-auto w-full mt-5">
//                 <thead>
//                     <tr>
//                         <th className="px-4 py-2">ID</th>
//                         <th className="px-4 py-2">Apply Date</th>
//                         <th className="px-4 py-2">Name</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filterItem.map((record: any) => (
//                         <tr key={record.id}>
//                             <td className="border px-4 py-2">{record.id}</td>
//                             <td className="border px-4 py-2">{record.applydate}</td>
//                             <td className="border px-4 py-2">{record.name}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

export default ComponentsFormDatePickerRange;
