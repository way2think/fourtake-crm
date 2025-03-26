import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Import icons
import '@/components/Reusable/country-selector/CountrySearchDropdown.css';

interface Option {
    id: number | string;
    name: string;
}

interface SearchableDropdownProps {
    addData: any;
    setAddData: any;
    handleEmbassyChange?: any;
    items?: any;
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
        const selectedCountry = items?.find((option: Option) => option.id === (addData?.[title]?.id || addData?.[title]));
        if (selectedCountry) {
            setSearchTerm(selectedCountry.name);
        }
    }, [addData?.[title], items]);

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
            setAddData({ ...addData, [title]: '' });
        }
        setIsOpen(true);
    };

    const handleOptionClick = (option: Option) => {
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
        setIsOpen((prev) => !prev);
        setFilteredOptions(items);
    };

    const handleOptionSelect = (option: any) => {
        handleOptionClick(option);
        setSearchTerm(option.name);
        setIsOpen(false);
    };

    const handleKeyDown = (e: any) => {
        if (!isOpen) return;

        if (e.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) => Math.min(filteredOptions.length - 1, prevIndex + 1));
        } else if (e.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) => Math.max(0, prevIndex - 1));
        }

        if (e.key === 'Enter' && highlightedIndex !== -1) {
            handleOptionSelect(filteredOptions[highlightedIndex]);
        }
    };

    return (
        <div className="searchable-dropdown relative w-full" ref={dropdownRef}>
            <label htmlFor="country" className="block text-sm font-medium">
                {heading}*
            </label>
            <div className="relative">
                <input
                    type="text"
                    className="form-input w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleInputClick}
                    onClick={handleInputClick}
                    onKeyDown={handleKeyDown}
                    placeholder="-- Select Destination Country --"
                />
                <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">{isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
            </div>
            {isOpen && (
                <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
                    {filteredOptions?.map((option) => (
                        <li key={option.id} className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => handleOptionClick(option)}>
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CountrySearchDropdown;
