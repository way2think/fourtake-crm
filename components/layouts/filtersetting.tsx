'use client';
import { useEffect, useState } from 'react';
import ComponentsFormDatePickerRange from '../lead-management/lead-manage/components-form-date-picker-range';
import { useGetAllEmployeesQuery } from '@/services/api/userSlice';
import { useGetCountriesQuery } from '@/services/api/cms/countrySlice';
import { useGetLeadsQuery } from '@/services/api/leadSlice';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';
import Filtering from '../Reusable/filtering';

interface FiltersettingProps {
    showCustomizer: any;
    setShowCustomizer: any;
    setFilterItem: any;
    data: any;
    setFilterTitle?: any;
}

const Filtersetting: React.FC<FiltersettingProps> = ({ data, showCustomizer, setFilterTitle, setFilterItem, setShowCustomizer }) => {
    // State for all form fields
    const [country, setCountry] = useState('');
    const [leadStatus, setLeadStatus] = useState('');
    const [leadStage, setLeadStage] = useState('');
    const [priority, setPriority] = useState('');
    const [user, setUser] = useState('');
    const [source, setSource] = useState('');
    const [dateFilter, setDateFilter] = useState<any>();
    const [filterFetch, setFilterFetch] = useState(false);

    const { data: employeelist } = useGetAllEmployeesQuery({ page: 0, limit: 0 });
    const { data: countries } = useGetCountriesQuery({ page: 0, limit: 0 });

    const { page, limit, sortField, sortOrder, search, filter, setFilter, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });
    const {
        data: leads,
        isFetching,
        isLoading,
    } = useGetLeadsQuery({
        page,
        limit,
        sortField,
        sortOrder,
        country,
        status: leadStatus,
        stage: leadStage,
        priority,
        assigned_to: user,
        source,
        fromDate: dateFilter?.split(' to ')[0],
        toDate: dateFilter?.split(' to ')[1],
    });

    console.log('leads', leads);
    console.log('filter options', country);

    // Handler to clear all fields
    const handleClear = () => {
        setLeadStatus('');
        setLeadStage('');
        setPriority('');
        setUser('');
        setSource('');
        setCountry('');
        setFilterItem(data);
        setShowCustomizer(false);
        setFilterTitle('Filter');
    };

    useEffect(() => {
        if (!isFetching && !isLoading && leads) {
            setFilterItem(leads.items);
        }
    }, [leads, isFetching, isLoading, setFilterItem]);

    const handleApplyFilter = () => {
        setShowCustomizer(false);
        setFilterFetch(true);
    };

    return (
        <div>
            <div className={`${(showCustomizer && '!block') || ''} fixed inset-0 z-[51] hidden bg-[black]/60 px-4 transition-[display]`} onClick={() => setShowCustomizer(false)}></div>
            <nav
                className={`${
                    (showCustomizer && 'ltr:!right-0 rtl:!left-0') || ''
                } fixed bottom-0 top-0 z-[51] w-full max-w-[400px] bg-white p-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 dark:bg-black ltr:-right-[400px] rtl:-left-[400px]`}
            >
                <div className="perfect-scrollbar h-full overflow-y-auto overflow-x-hidden">
                    <div className="m-5 grid grid-cols-1 gap-5">
                        <div className="flex items-center justify-between">
                            <div className="text-left">Filter</div>
                            <div className="text-right"></div>
                        </div>

                        <div>
                            <ComponentsFormDatePickerRange setDateFilter={setDateFilter} />
                        </div>

                        <div className="dropdown">
                            <label htmlFor="leadStatus">Filter Country</label>
                            <select className="form-input" value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value="">Select Country</option>
                                {countries?.items.map((country: any) => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="dropdown">
                            <label htmlFor="leadStatus">Filter Lead Status</label>
                            <select className="form-input" value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="open">Open</option>
                                <option value="In-progress">In-progress</option>
                                <option value="Closed">Closed</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="leadStage">Filter Lead Stage</label>
                            <select className="form-input" value={leadStage} onChange={(e) => setLeadStage(e.target.value)}>
                                <option value="">Select Stage</option>
                                <option value="Fresh">Fresh</option>
                                <option value="Attempted">Attempted</option>
                                <option value="Interested">Interested</option>
                                <option value="Not interested">Not interested</option>
                                <option value="Doc pick up">Doc pick up</option>
                                <option value="Doc picked up">Doc picked up</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="priority">Filter by Priority</label>
                            <select className="form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="">Select Priority</option>
                                <option value="cold">Cold</option>
                                <option value="warm">Warm</option>
                                <option value="hot">Hot</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="user">Filter by Assignee</label>
                            <select className="form-input" value={user} onChange={(e) => setUser(e.target.value)}>
                                <option value="">Select Assignee</option>
                                {employeelist?.items?.map((item: any) => (
                                    <option key={item.id} value={item.id}>
                                        {item.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="source">Filter by Source</label>
                            <select className="form-input" value={source} onChange={(e) => setSource(e.target.value)}>
                                <option value="">Select Source</option>
                                <option value="Google">Google</option>
                                <option value="Website">Website</option>
                                <option value="Previous customer">Previous Customer</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="mt-8 flex items-center justify-end">
                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={handleApplyFilter}>
                                Apply
                            </button>
                            <button type="button" className="btn btn-outline-danger ltr:ml-4 rtl:mr-4" onClick={handleClear}>
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
                {filterFetch && (
                    <Filtering
                        country={country}
                        status={leadStatus}
                        stage={leadStage}
                        priority={priority}
                        assigned_to={user}
                        source={source}
                        fromDate={dateFilter?.split(' to ')[0]}
                        toDate={dateFilter?.split(' to ')[1]}
                        setFilterItem={setFilterItem}
                    />
                )}
            </nav>
        </div>
    );
};

export default Filtersetting;

// 'use client';
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import IconSearch from '../icon/icon-search';
// import ComponentsFormDatePickerBasic from '../lead-management/lead-manage/components-form-date-picker-basic';
// import { useGetAllEmployeesQuery } from '@/services/api/userSlice';
// import { useGetCountriesQuery } from '@/services/api/cms/countrySlice';
// import SearchableDropdown from '@/components/Reusable/country-selector/CountrySearchDropdown';
// import ComponentsFormDatePickerRange from '../lead-management/lead-manage/components-form-date-picker-range';
// import { usePaginationOptions } from '@/hooks/usePaginationOptions';
// import { useGetLeadsQuery } from '@/services/api/leadSlice';

// interface FiltersettingProps {
//     showCustomizer: any;
//     setShowCustomizer: any;
//     setFilterItem: any;
//     data: any;
//     setFilterTitle?: any;
// }

// const Filtersetting: React.FC<FiltersettingProps> = ({ data, showCustomizer, setFilterTitle, setFilterItem, setShowCustomizer }) => {
//     // State for all form fields
//     // const [startDate, setStartDate] = useState(null);
//     // const [endDate, setEndDate] = useState(null);
//     // const [followUp, setFollowUp] = useState('');
//     const [country, setCountry] = useState('');
//     const [leadStatus, setLeadStatus] = useState('');
//     const [leadStage, setLeadStage] = useState('');
//     const [priority, setPriority] = useState('');
//     const [user, setUser] = useState('');
//     const [source, setSource] = useState('');
//     const [dateFilter, setDateFilter] = useState<any>();

//     const { data: employeelist } = useGetAllEmployeesQuery({ page: 0, limit: 0 });
//     const { data: countries } = useGetCountriesQuery({ page: 0, limit: 0 });

//     // Handler to clear all fields
//     const handleClear = () => {
//         // setStartDate(null);
//         // setEndDate(null);
//         // setFollowUp('');
//         // setCountry('');
//         setLeadStatus('');
//         setLeadStage('');
//         setPriority('');
//         setUser('');
//         setSource('');
//         setCountry('');
//         setFilterItem(data);
//         setShowCustomizer(false);
//         setFilterTitle('Filter');
//     };

//     const { page, limit, sortField, sortOrder, search, filter, setFilter, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });
//     console.log('DateFilter', dateFilter?.fromDate, dateFilter?.toDate, dateFilter);

//     const handleFilter = () => {
//         let fromDate, toDate;
//         if (dateFilter) {
//             const dateRange = dateFilter.split(' to ');
//             fromDate = dateRange[0];
//             toDate = dateRange[1];
//         }

//         const {
//             data: leads,
//             isError,
//             error,
//             isFetching,
//             isLoading,
//         } = useGetLeadsQuery({
//             page,
//             limit,
//             sortField: 'updated_time',
//             sortOrder: 'DESC',
//             search,
//             filter,
//             fromDate,
//             toDate,
//             country,
//             status: leadStatus,
//             stage: leadStage,
//             priority,
//             assignee: user,
//             source,
//         });

//         if (!isFetching && !isLoading && leads) {
//             setFilterItem(leads);
//             console.log('filter', leads);
//         }

//         setShowCustomizer(false);

//         // if (country) {
//         //     filteredData = filteredData.filter((item: any) => {
//         //         return item.country.id == country;
//         //     });
//         // }
//         // if (leadStage) {
//         //     filteredData = filteredData.filter((item: any) => item.stage === leadStage);
//         // }
//         // if (leadStatus) {
//         //     filteredData = filteredData.filter((item: any) => item.status === leadStatus);
//         // }
//         // if (priority) {
//         //     filteredData = filteredData.filter((item: any) => item.lead_type === priority);
//         // }
//         // if (user) {
//         //     filteredData = filteredData.filter((item: any) => {
//         //         return item.assignee?.id == user;
//         //     });
//         // }
//         // if (source) {
//         //     filteredData = filteredData.filter((item: any) => item.source === source);
//         // }
//     };

//     return (
//         <div>
//             <div className={`${(showCustomizer && '!block') || ''} fixed inset-0 z-[51] hidden bg-[black]/60 px-4 transition-[display]`} onClick={() => setShowCustomizer(false)}></div>

//             <nav
//                 className={`${
//                     (showCustomizer && 'ltr:!right-0 rtl:!left-0') || ''
//                 } fixed bottom-0 top-0 z-[51] w-full max-w-[400px] bg-white p-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 dark:bg-black ltr:-right-[400px] rtl:-left-[400px]`}
//             >
//                 <div className="perfect-scrollbar h-full overflow-y-auto overflow-x-hidden">
//                     <div className="m-5 grid grid-cols-1 gap-5">
//                         <div className="flex items-center justify-between">
//                             <div className="text-left">Filter</div>
//                             <div className="text-right"></div>
//                         </div>

//                         <div>
//                             <ComponentsFormDatePickerRange setDateFilter={setDateFilter} />
//                         </div>

//                         <div className="dropdown">
//                             <label htmlFor="leadStatus">Filter Country</label>
//                             <select className="form-input" value={country} onChange={(e) => setCountry(e.target.value)}>
//                                 <option value="">Select Country</option>
//                                 {countries?.items.map((country: any) => (
//                                     <option key={country.id} value={country.id}>
//                                         {country.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         {/*
//                         <SearchableDropdown addData={country} setAddData={setCountry} items={countries?.items} /> */}

//                         <div className="dropdown">
//                             <label htmlFor="leadStatus">Filter Lead Status</label>
//                             <select className="form-input" value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)}>
//                                 <option value="">Select Status</option>
//                                 <option value="open">Open</option>
//                                 <option value="In-progress">In-progress</option>
//                                 <option value="Closed">Closed</option>
//                                 <option value="Done ">Done </option>
//                             </select>
//                         </div>
//                         <div className="dropdown">
//                             <label htmlFor="leadStage">Filter Lead Stage</label>
//                             <select className="form-input" value={leadStage} onChange={(e) => setLeadStage(e.target.value)}>
//                                 <option value="">Select Stage</option>
//                                 <option value="Fresh">Fresh</option>
//                                 <option value="Attempted">Attempted</option>
//                                 <option value="Interested">Interested</option>
//                                 <option value="Not interested">Not interested</option>
//                                 <option value="Doc pick up">Doc pick up</option>
//                                 <option value="Doc picked up">Doc picked up</option>
//                             </select>
//                         </div>
//                         <div className="dropdown">
//                             <label htmlFor="priority">Filter by Priority</label>
//                             <select className="form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
//                                 <option value="">Select Priority</option>
//                                 <option value="cold">Cold</option>
//                                 <option value="warm">Warm</option>
//                                 <option value="hot">Hot</option>
//                             </select>
//                         </div>
//                         <div className="dropdown">
//                             <label htmlFor="user">Filter by Assignee</label>
//                             <select className="form-input" value={user} onChange={(e) => setUser(e.target.value)}>
//                                 <option value="">Select Assignee</option>
//                                 {employeelist?.items?.map((item: any) => (
//                                     <option value={item.id}>{item.username}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="dropdown">
//                             <label htmlFor="source">Filter by Source</label>
//                             <select className="form-input" value={source} onChange={(e) => setSource(e.target.value)}>
//                                 <option value="">Select Source</option>
//                                 <option value="Google">Google</option>
//                                 <option value="Website">Website</option>
//                                 <option value="Previous customer">Previous Customer</option>
//                                 <option value="Others">Others</option>
//                             </select>
//                         </div>
//                         <div className="mt-8 flex items-center justify-end">
//                             <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleFilter()}>
//                                 Apply
//                             </button>
//                             <button type="button" className="btn btn-outline-danger ltr:ml-4 rtl:mr-4" onClick={handleClear}>
//                                 Clear
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// };

// export default Filtersetting;
