'use client';
import React, { useEffect, useRef, useState } from 'react';
import Select, { components } from 'react-select';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const isInitialMount = useRef(true);

    useEffect(() => {
        setSelectedOptions([]);
        setAddData((prev: any) => ({ ...prev, [id]: [] }));
    }, [resetTrigger]);

    useEffect(() => {
        if (isInitialMount.current && id === 'status_apply_to' && options.length > 0) {
            setSelectedOptions(options);
            const getValue = options.map((item: any) => item.value).join(', ');
            setAddData((prev: any) => ({ ...prev, [id]: getValue }));
            isInitialMount.current = false;
        }
    }, [options, id, setAddData]);

    useEffect(() => {
        if (Array.isArray(addData[id])) {
            const selectedValues = addData[id];
            const selected = options.filter((option: any) => selectedValues.includes(option.value));
            setSelectedOptions(selected);
        } else {
            setSelectedOptions([]);
        }
    }, []);

    const handleChange = (selected: any) => {
        if (selected && selected.length === options.length) {
            const getValue = options.map((item: any) => item.value).join(', ');
            setSelectedOptions(options);
            setAddData((prev: any) => ({ ...prev, [id]: getValue }));
        } else if (selected && selected.length === 0) {
            setSelectedOptions([]);
            setAddData((prev: any) => ({ ...prev, [id]: [] }));
        } else {
            const getValue = selected.map((item: any) => item.value).join(', ');
            setSelectedOptions(selected as OptionType[]);
            setAddData((prev: any) => ({ ...prev, [id]: getValue }));
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

    const customStyles: any = {
        menu: (provided: any) => ({
            ...provided,
            maxHeight: '200px',
            overflow: 'scroll',
            zIndex: 9999,
        }),
        menuPortal: (provided: any) => ({
            ...provided,
            zIndex: 9999,
        }),
        control: (provided: any) => ({
            ...provided,
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '2rem',
            position: 'relative',
        }),
    };

    const DropdownIndicator = (props: any) => <components.DropdownIndicator {...props}>{isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</components.DropdownIndicator>;

    const Option = (props: any) => (
        <components.Option {...props}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" checked={props.isSelected} onChange={() => null} className="form-checkbox bg-white dark:bg-black" />
                <label className="ml-2 flex cursor-pointer items-center">{props.label}</label>
            </div>
        </components.Option>
    );

    const customComponents = {
        Option,
        DropdownIndicator,
        MultiValue: (props: any) => (
            <components.MultiValue {...props}>
                <span>{props.data.label}</span>
            </components.MultiValue>
        ),
        Menu: (props: any) => (
            <components.Menu {...props}>
                <div className="flex items-center p-2">
                    <input type="checkbox" checked={selectedOptions.length === options.length} onChange={handleSelectAll} className="form-checkbox bg-white dark:bg-black" />
                    <label className="ml-2">Select All</label>
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
                styles={customStyles}
                components={customComponents}
                value={selectedOptions}
                onChange={handleChange}
                menuPortalTarget={document.body}
                closeMenuOnSelect={false}
                hideSelectedOptions={true}
                onMenuOpen={() => setIsDropdownOpen(true)}
                onMenuClose={() => setIsDropdownOpen(false)}
            />
        </div>
    );
};

export default ComponentsFormsSelectMultiselect;
