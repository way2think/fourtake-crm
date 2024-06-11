'use client';
import React, { useEffect, useState } from 'react';
import Select, { components, StylesConfig } from 'react-select';

interface OptionType {
    value: string;
    label: string;
}

interface ComponentsFormsSelectMultiselectProps {
    options: any;
    setAddData: any;
    id: string;
    addData: any;
}

const ComponentsFormsSelectMultiselect: React.FC<ComponentsFormsSelectMultiselectProps> = ({ options, addData, setAddData, id }) => {
    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

    useEffect(() => {
        const arr: any = options.filter((item: any) => addData[id]?.includes(item.value));
        setSelectedOptions(arr);
    }, [addData]);

    // useEffect(() => {
    //     setAddData((prev: any) => ({ ...prev, [id]: selectedOptions }));
    // }, [selectedOptions]);

    console.log('selected options', selectedOptions);

    const handleChange = (selected: any) => {
        console.log('selected options', selected);
        if (selected && selected.length === options.length) {
            const getValue = options.map((item: any) => item.value);
            setSelectedOptions(options);
            setAddData((prev: any) => ({ ...prev, [id]: getValue }));
        } else if (selected && selected.length === 0) {
            setSelectedOptions([]);
            setAddData((prev: any) => ({ ...prev, [id]: [] }));
        } else {
            const getValue = selected.map((item: any) => item.value);
            setSelectedOptions(selected as OptionType[]);
            setAddData((prev: any) => ({ ...prev, [id]: getValue }));
        }
    };

    const handleSelectAll = () => {
        if (selectedOptions.length === options.length) {
            setSelectedOptions([]);
        } else {
            setSelectedOptions(options);
        }
    };

    // Custom styles for react-select
    const customStyles: any = {
        menu: (provided: any) => ({
            ...provided,
            overflowY: 'auto', // Enable vertical scrolling
            zIndex: 9999, // Ensure the dropdown menu appears above other elements
        }),
        menuPortal: (provided: any) => ({
            ...provided,
            zIndex: 9999, // Ensure the dropdown menu portal appears above other elements
        }),
    };

    const Option = (props: any) => (
        <components.Option {...props}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" checked={props.isSelected} onChange={() => null} className="form-checkbox bg-white dark:bg-black" />
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
                    <input type="checkbox" checked={selectedOptions.length === options.length} onChange={handleSelectAll} className="form-checkbox bg-white dark:bg-black" />
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
                options={options}
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
