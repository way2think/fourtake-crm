'use client';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import { IRootState } from '@/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const ComponentsFormDatePickerBasic = (props: {
    label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
    nomargin?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}) => {
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [date1, setDate1] = useState<any>('2022-07-05');

    return (
        <div className="mb-5">
            <label htmlFor="date">{props.label}</label>
            <Flatpickr
                value={date1}
                options={{
                    dateFormat: 'Y-m-d',
                    position: isRtl ? 'auto right' : 'auto left',
                }}
                className="form-input"
                onChange={(date: any) => setDate1(date)}
            />
        </div>
    );
};

export default ComponentsFormDatePickerBasic;
