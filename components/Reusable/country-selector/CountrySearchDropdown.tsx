import React, { useState, useEffect, useRef } from 'react';
import '@/components/Reusable/country-selector/CountrySearchDropdown.css';

interface Option {
    id: number | string;
    name: string;
}

interface SearchableDropdownProps {
    addData: any;
    setAddData: any;
    handleEmbassyChange?: any;
    items?: any; // Update this to match the correct type
    setVisaTypes?: any;
    title?: string;
}

const CountrySearchDropdown: React.FC<SearchableDropdownProps> = ({ addData, setAddData, handleEmbassyChange, items, setVisaTypes, title }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(items);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Initialize searchTerm with the name of the selected country (if any)
        const selectedCountry = items?.find((option: Option) => option.id === addData?.destination_country?.id);
        if (selectedCountry) {
            setSearchTerm(selectedCountry.name);
            
        const index = items.findIndex((cv: any) => cv.id == addData?.destination_country?.id);
        if (setVisaTypes !== undefined) {
            console.log('visaTypes', setVisaTypes);
            setVisaTypes(items[index].country_visa_types);
        }
        }
        
    }, [addData?.destination_country, items]);

    useEffect(() => {
        // Initialize searchTerm with the name of the selected country (if any)
        const selectedCountry = items?.find((option: Option) => option.id === addData?.country?.id);
        if (selectedCountry) {
            setSearchTerm(selectedCountry.name);
            
        // const index = items.findIndex((cv: any) => cv.id == addData?.country?.id);
        // if (setVisaTypes !== undefined) {
        //     console.log('visaTypes', setVisaTypes);
        //     setVisaTypes(items[index].country_visa_types);
        // }
        }
        
    }, [addData?.country, items]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredOptions(items.filter((option: Option) => option.name.toLowerCase().includes(searchTerm.toLowerCase())));
        } else {
            setFilteredOptions(items);
        }
    }, [searchTerm, items]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (title == 'destination_country') {
            setAddData({ ...addData, destination_country: '' });
        } else {
            setAddData({ ...addData, destination_country: '' }); // Clear selected country when typing
        }

        setIsOpen(true);
    };

    const handleOptionClick = (option: Option) => {
        const index = items.findIndex((cv: any) => cv.id == option.id);
        if (setVisaTypes !== undefined) {
            console.log('visaTypes', setVisaTypes);
            setVisaTypes(items[index].country_visa_types);
        }
        setSearchTerm(option.name);
        if (title == 'destination_country') {
            setAddData({ ...addData, destination_country: option.id });
        } else {
            setAddData({ ...addData, country: option.id });
        }

        setIsOpen(false);
        if (handleEmbassyChange) {
            handleEmbassyChange(option);
        }
    };

    const handleInputClick = () => {
        setIsOpen(true);
        setFilteredOptions(items); // Show all options when clicking input
    };

    return (
        <div className="searchable-dropdown" ref={dropdownRef}>
            <label htmlFor="country">Destination Country*</label>
            <input type="text" className="form-input" value={searchTerm} onChange={handleSearchChange} onClick={handleInputClick} placeholder="Select Country" />
            {isOpen && (
                <ul className="options-list list-group m-3">
                    {filteredOptions.map((option) => (
                        <li
                            key={option.id}
                            onClick={() => {
                                handleOptionClick(option);
                            }}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CountrySearchDropdown;
