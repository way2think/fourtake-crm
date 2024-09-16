import { usePaginationOptions } from '@/hooks/usePaginationOptions';
import { useGetLeadsQuery } from '@/services/api/leadSlice';
import { useEffect } from 'react';

interface FilteringProps {
    setFilterItem: any;
    country: any;
    status: string;
    stage: string;
    priority: string;
    assignee: any;
    source: string;
    fromDate: any;
    toDate: any;
}

const Filtering: React.FC<FilteringProps> = ({ country, status, stage, priority, assignee, source, fromDate, toDate, setFilterItem }) => {
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
        status,
        stage,
        priority,
        assignee,
        source,
        fromDate,
        toDate,
    });

    useEffect(() => {
        if (!isFetching && !isLoading && leads) {
            setFilterItem(leads.items);
        }
    }, [leads, isFetching, isLoading, setFilterItem]);

    console.log('filtering', leads);
    return <div>hi</div>;
};

export default Filtering;
