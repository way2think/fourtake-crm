'use client';

import { IRootState } from '@/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const ComponentsFormDatePickerTime = () => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date4, setDate4] = useState<any>('13:45');
    return (
        <>
            <div className="mb-5">
                <label htmlFor="date">Time</label>
                <Flatpickr
                    options={{
                        noCalendar: true,
                        enableTime: true,
                        dateFormat: 'H:i',
                        position: isRtl ? 'auto right' : 'auto left',
                    }}
                    defaultValue={date4}
                    className="form-input"
                    onChange={(date4) => setDate4(date4)}
                />
            </div>
        </>
    );
};

export default ComponentsFormDatePickerTime;
