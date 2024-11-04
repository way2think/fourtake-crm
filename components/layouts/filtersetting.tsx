'use client';
import { useEffect, useState } from 'react';
import ComponentsFormDatePickerRange from '../lead-management/lead-manage/components-form-date-picker-range';
import { useGetAllEmployeesQuery, useGetUsersQuery } from '@/services/api/userSlice';
import { useGetCountriesQuery } from '@/services/api/cms/countrySlice';
import { useGetLeadsQuery, useLazyGetLeadsQuery } from '@/services/api/leadSlice';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';

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
    const [addData, setAddData] = useState("");

    console.log('addData,dateFilter', addData, dateFilter);

    // const { data: employeelist } = useGetAllEmployeesQuery({ page: 0, limit: 0 });
    const { data: assigneeList } = useGetUsersQuery({ page: 0, limit: 0, filterbyrole: 'employee, admin' });
    const { data: countries } = useGetCountriesQuery({ page: 0, limit: 0 });

    const { page, limit, sortField, sortOrder, search, filter, setFilter, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });
    const [getLeadsByFilter, {}] = useLazyGetLeadsQuery();

    // console.log('leads', leads);
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
        setDateFilter('')
        setAddData('')
    };

    // useEffect(() => {
    //     if (!isFetching && !isLoading && leads) {
    //         setFilterItem(leads.items);
    //     }
    // }, [leads, isFetching, isLoading, setFilterItem]);

    const handleApplyFilter = async () => {
        setShowCustomizer(false);
        setFilterFetch(true);
        console.log('country id', country);
        const result = await getLeadsByFilter({
            page,
            limit,
            sortField,
            sortOrder,
            country: String(country),
            status: leadStatus,
            stage: leadStage,
            priority,
            assigned_to: user,
            source,
            fromDate: dateFilter?.split(' to ')[0],
            toDate: dateFilter?.split(' to ')[1],
        }).unwrap();

        setFilterItem(result.items);

        console.log('result', result);
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
                            <ComponentsFormDatePickerRange  title="lead filter" setDateFilter={setDateFilter} setAddData={setAddData} addData={addData}  />
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
                                {assigneeList?.items?.map((item: any) => (
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
            </nav>
        </div>
    );
};

export default Filtersetting;
