'use client';
import React, { useState } from 'react';
import Select, { components } from 'react-select';

const ComponentsFormsSelectMultiselect = () => {
    const options5 = [
        { value: 'E-Visa', label: 'E-Visa' },
        { value: 'Business Visa', label: 'Business Visa' },
        { value: 'Tourist Visa', label: 'Tourist Visa' },
        { value: 'Student Visa', label: 'Student Visa' },
        { value: 'Work Visa', label: 'Work Visa' },
        { value: 'Diplomatic Visa', label: 'Diplomatic Visa' },
        { value: 'Transit Visa', label: 'Transit Visa' },
        { value: 'Medical Visa', label: 'Medical Visa' },
    ];

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (selected: string | any[] | ((prevState: never[]) => never[])) => {
        if (selected?.length === options5.length) {
            setSelectedOptions(options5);
        } else if (selected?.length === 0) {
            setSelectedOptions([]);
        } else {
            setSelectedOptions(selected);
        }
    };

    const handleSelectAll = () => {
        if (selectedOptions.length === options5.length) {
            setSelectedOptions([]);
        } else {
            setSelectedOptions(options5);
        }
    };

    // Custom styles for react-select
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            overflowY: 'auto', // Enable vertical scrolling
            zIndex: 9999, // Ensure the dropdown menu appears above other elements
        }),
        menuPortal: (provided) => ({
            ...provided,
            zIndex: 9999, // Ensure the dropdown menu portal appears above other elements
        }),
    };

    const Option = (props: any) => (
        <components.Option {...props}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" checked={props.isSelected} onChange={() => null} className="form-checkbox  bg-white dark:bg-black" />
                <label className="flex cursor-pointer items-center" style={{ marginLeft: '10px' }}>
                    {props.label}
                </label>
            </div>
        </components.Option>
    );

    const customComponents = {
        Option,
        MultiValue: (props: any) => (
            <components.MultiValue {...props}>
                <span>{props.data.label}</span>
            </components.MultiValue>
        ),
        Menu: (props: any) => (
            <components.Menu {...props}>
                <div className="flex" style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                    <input type="checkbox" checked={selectedOptions.length === options5.length} onChange={handleSelectAll} className="form-checkbox  bg-white dark:bg-black" />
                    <label style={{ marginLeft: '8px' }}>Select All</label>
                </div>
                {props.children}
            </components.Menu>
        ),
    };

    return (
        <div className="mb-5">
            <Select
                placeholder="Select an option"
                options={options5}
                isMulti
                isSearchable={false}
                styles={customStyles} // Apply custom styles
                components={customComponents} // Apply custom components
                value={selectedOptions}
                onChange={handleChange}
                menuPortalTarget={document.body} // Append menu to the body to avoid clipping
                closeMenuOnSelect={false} // Keep the menu open when selecting options
            />
        </div>
    );
};

export default ComponentsFormsSelectMultiselect;
