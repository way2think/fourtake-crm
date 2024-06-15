'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import IconSearch from '../icon/icon-search';
import ComponentsFormDatePickerBasic from '../lead-management/lead-manage/components-form-date-picker-basic';

interface FiltersettingProps {
    showCustomizer: any;
    setShowCustomizer: any;
    setFilterItem: any;
    data: any;
}

const Filtersetting: React.FC<FiltersettingProps> = ({ data, showCustomizer, setFilterItem, setShowCustomizer }) => {
    // State for all form fields
    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    // const [followUp, setFollowUp] = useState('');
    // const [country, setCountry] = useState('');
    const [leadStatus, setLeadStatus] = useState('');
    const [leadStage, setLeadStage] = useState('');
    const [priority, setPriority] = useState('');
    const [user, setUser] = useState('');
    const [source, setSource] = useState('');

    // Handler to clear all fields
    const handleClear = () => {
        // setStartDate(null);
        // setEndDate(null);
        // setFollowUp('');
        // setCountry('');
        setLeadStatus('');
        setLeadStage('');
        setPriority('');
        setUser('');
        setSource('');
        setFilterItem(data);
        setShowCustomizer(false);
    };

    const handleFilter = () => {
        let filteredData = data;

        if (leadStage) {
            filteredData = filteredData.filter((item: any) => item.stage === leadStage);
        }
        if (leadStatus) {
            filteredData = filteredData.filter((item: any) => item.status === leadStatus);
        }
        if (priority) {
            filteredData = filteredData.filter((item: any) => item.leadtype === priority);
        }
        if (user) {
            filteredData = filteredData.filter((item: any) => item.assignee === user);
        }
        if (source) {
            filteredData = filteredData.filter((item: any) => item.source === source);
        }

        setFilterItem(filteredData);
        console.log('filter', filteredData);
        setShowCustomizer(false);
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

                        {/* <div> 
                            <ComponentsFormDatePickerBasic label="Start Date" nomargin="yes"/>
                        </div>
                        <div>
                           <ComponentsFormDatePickerBasic label="End Date" nomargin="yes"/>
                        </div>

                        <div className="dropdown">
                            <label htmlFor="followUp">Follow Up</label>
                            <select
                                className="form-input"
                                value={followUp}
                                onChange={(e) => setFollowUp(e.target.value)}
                            >
                                <option value="">[-Select-]</option>
                                <option value="all">All</option>
                                <option value="vfs">VFS</option>
                            </select>
                        </div>

                        <div className="dropdown">
                            <label htmlFor="country">Country</label>
                            <select
                                className="form-input"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">[-Select-]</option>
                                <option value="andorra">Andorra</option>
                                <option value="albania">Albania</option>
                                <option value="bangladesh">Bangladesh</option>
                            </select>
                        </div> */}

                        <div className="dropdown">
                            <label htmlFor="leadStatus">Filter Lead Status</label>
                            <select className="form-input" value={leadStatus} onChange={(e) => setLeadStatus(e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="open">Open</option>
                                <option value="In-progress">In-progress</option>
                                <option value="Closed">Closed</option>
                                <option value="Done ">Done </option>
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
                                <option value="Sanjay">Sanjay</option>
                                <option value="buji">Bujji</option>
                                <option value="raji">raji</option>
                                <option value="santhosh">Santhosh</option>
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
                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleFilter()}>
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
