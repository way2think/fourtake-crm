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
    title?: any;
    heading: string;
    clearSearch?: boolean;
}

const CountrySearchDropdown: React.FC<SearchableDropdownProps> = ({ addData, setAddData, handleEmbassyChange, items, setVisaTypes, title, heading, clearSearch }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(items);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

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
        if (clearSearch) {
            setSearchTerm('');
        }
    }, [clearSearch]);

    useEffect(() => {
        // Initialize searchTerm with the name of the selected country (if any)
        const selectedCountry = items?.find((option: Option) => option.id == (addData?.destination_country?.id || addData?.destination_country));
        if (selectedCountry) {
            setSearchTerm(selectedCountry.name);

            const index = items.findIndex((cv: any) => cv.id == (addData?.destination_country?.id || addData?.destination_country));
            if (setVisaTypes !== undefined) {
                setVisaTypes(items[index].country_visa_types);
            }
        }
    }, [addData?.destination_country, items]);

    useEffect(() => {
        // Initialize searchTerm with the name of the selected country (if any)
        const selectedCountry = items?.find((option: Option) => option.id === (addData?.[title]?.id || addData?.[title]));

        if (selectedCountry) {
            setSearchTerm(selectedCountry.name);

            // const index = items.findIndex((cv: any) => cv.id == addData?.country?.id);
            // if (setVisaTypes !== undefined) {
            //     console.log('visaTypes', setVisaTypes);
            //     setVisaTypes(items[index].country_visa_types);
            // }
        }
    }, [addData?.[title], items]);

    // useEffect(() => {
    //     if (title) {
    //         setSearchTerm(addData[title]);
    //     }
    // }, [addData]);

    useEffect(() => {
        if (searchTerm && items) {
            setFilteredOptions(items?.filter((option: Option) => option.name.toLowerCase().includes(searchTerm.toLowerCase())));
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
        console.log('option', option);
        const index = items.findIndex((cv: any) => cv.id == option.id);
        if (setVisaTypes !== undefined) {
            setVisaTypes(items[index].country_visa_types);
        }
        setSearchTerm(option.name);
        if (title == 'destination_country') {
            setAddData({ ...addData, destination_country: option.id });
        } else {
            setAddData({ ...addData, [title]: option.id });
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

    const handleBlur = () => {
        console.log('false');
        setIsOpen(false);
    };

    const handleOptionSelect = (option:any) => {
        handleOptionClick(option);
        setSearchTerm(option.name);
        setIsOpen(false);
    };

    const handleKeyDown = (e:any) => {
        if (!isOpen) return;

        // Handle arrow key navigation
        if (e.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) => {
                const nextIndex = Math.min(filteredOptions.length - 1, prevIndex + 1);
                return nextIndex;
            });
        } else if (e.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) => Math.max(0, prevIndex - 1));
        }

        // Handle selecting an option with Enter
        if (e.key === 'Enter' && highlightedIndex !== -1) {
            handleOptionSelect(filteredOptions[highlightedIndex]);
        }
    };
    // console.log('filtered', filteredOptions);

    return (
        <div className="searchable-dropdown" ref={dropdownRef}>
            <label htmlFor="country">{heading}*</label>
            <input
                type="text"
                className="form-input"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleInputClick}
                // onBlur={handleBlur}
                onClick={handleInputClick}
                onKeyDown={handleKeyDown}
                placeholder="-- Select Destination Country --"
            />
            {isOpen && (
                <ul className="options-list list-group m-3">
                    {filteredOptions?.map((option) => (
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
