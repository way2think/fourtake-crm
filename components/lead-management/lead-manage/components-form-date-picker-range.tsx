'use client';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import { IRootState } from '@/store';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const ComponentsFormDatePickerRange = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date3, setDate3] = useState<any>('2022-07-05 to 2022-07-10');

    return (
        <div className="mb-5">
            <label htmlFor="date">From Date to To Date</label>
            <Flatpickr
                options={{
                    mode: 'range',
                    dateFormat: 'Y-m-d',
                    position: isRtl ? 'auto right' : 'auto left',
                }}
                defaultValue={date3}
                className="form-input"
                onChange={(date3) => setDate3(date3)}
            />
        </div>
    );
};

export default ComponentsFormDatePickerRange;
