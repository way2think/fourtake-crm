'use client';
import React, { useEffect, useRef, useState } from 'react';
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
    resetTrigger?: any;
}

const ComponentsFormsSelectMultiselect: React.FC<ComponentsFormsSelectMultiselectProps> = ({ options, addData, setAddData, id, resetTrigger }) => {
    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const isInitialMount = useRef(true);

    useEffect(() => {
        setSelectedOptions([]);
        setAddData((prev: any) => ({ ...prev, [id]: [] }));
    }, [resetTrigger]);

    // useEffect(() => {
    //     if (id == 'status_apply_to' && isFirstRender) {
    //         const defaultSelectedOptions = options; // Select all options by default
    //         setSelectedOptions(defaultSelectedOptions);

    //         const getValue = options.map((item: any) => item.value).join(', ');
    //         setAddData((prev: any) => ({ ...prev, [id]: getValue }));
    //         setIsFirstRender(false);
    //     }
    // }, [options, id, setAddData, isFirstRender]);

    useEffect(() => {
        if (isInitialMount.current && id === 'status_apply_to' && options.length > 0) {
            const defaultSelectedOptions = options; // Select all options by default
            setSelectedOptions(defaultSelectedOptions);

            const getValue = options.map((item:any) => item.value).join(', ');
            setAddData((prev: any) => ({ ...prev, [id]: getValue }));

            isInitialMount.current = false; // Mark the initial load as done
        }
    }, [options, id, setAddData]);

    console.log('selectedOptions', selectedOptions);

    // useEffect(() => {
    //     if (Array.isArray(addData.jurisdiction) ) {
    //         const selectedIds = addData?.jurisdiction.map((item: any) => item);
    //         const arr = options.filter((item: any) => selectedIds.includes(item.label));
    //         setSelectedOptions(arr);

    //         console.log('arr', arr);
    //     } else {
    //         setSelectedOptions([]); // or handle as needed
    //     }
    // }, [addData.jurisdiction]);

    useEffect(() => {
        if (Array.isArray(addData[id])) {
            const selectedValues = addData[id];
            const selected = options.filter((option: any) => selectedValues.includes(option.value));
            setSelectedOptions(selected);
        } else {
            setSelectedOptions([]);
        }
    }, []);

    useEffect(() => {
        setSelectedOptions([]);
        setAddData((prev: any) => ({ ...prev, [id]: [] }));
    }, [resetTrigger]);

    const handleChange = (selected: any) => {
        console.log('selected options', selected);
        if (selected && selected.length == options.length) {
            console.log('1');
            const getValue = options.map((item: any) => item.value).join(', ');
            setSelectedOptions(options);
            setAddData((prev: any) => ({ ...prev, [id]: getValue }));
        } else if (selected && selected.length === 0) {
            setSelectedOptions([]);
            setAddData((prev: any) => ({ ...prev, [id]: [] }));
            console.log('2');
        } else {
            const getValue = selected.map((item: any) => item.value).join(', ');
            setSelectedOptions(selected as OptionType[]);
            setAddData((prev: any) => ({ ...prev, [id]: getValue }));
            console.log('3');
            console.log('getValue', getValue);
        }
    };

    const handleSelectAll = () => {
        if (selectedOptions.length === options.length) {
            setSelectedOptions([]);
            setAddData((prev: any) => ({ ...prev, [id]: [] }));
        } else {
            setSelectedOptions(options);
            const getValue = options.map((item: any) => item.value).join(', ');
            setAddData((prev: any) => ({ ...prev, [id]: getValue }));
        }
    };

    // Custom styles for react-select
    // const customStyles: any = {
    //     menu: (provided: any) => ({
    //         ...provided,
    //         maxHeight: '500px',
    //         overflowY: 'auto', // Enable vertical scrolling
    //         zIndex: 9999, // Ensure the dropdown menu appears above other elements
    //     }),
    //     menuPortal: (provided: any) => ({
    //         ...provided,
    //         zIndex: 9999, // Ensure the dropdown menu portal appears above other elements
    //     }),
    // };

    const customStyles: any = {
        menu: (provided: any) => ({
            ...provided,
            maxHeight: '200px', // Set the maximum height for the dropdown menu
            overflow: 'scroll', // Enable vertical scrolling
            zIndex: 9999, // Ensure the dropdown menu appears above other elements
        }),
        menuPortal: (provided: any) => ({
            ...provided,
            zIndex: 9999, // Ensure the dropdown menu portal appears above other elements
        }),
        multiValueContainer: (provided: any) => ({
            ...provided,
            maxHeight: '100px', // Set maximum height for the selected options
            overflow: 'scroll', // Enable vertical scrolling
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
                hideSelectedOptions={true}
            />
        </div>
    );
};

export default ComponentsFormsSelectMultiselect;
