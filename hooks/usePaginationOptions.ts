import { InitialPaginationOptions } from '@/types/pagination';
import { useState } from 'react';

const usePaginationOptions = ({
    initialPage = 1,
    initialLimit = 10,
    initialSortField = 'name',
    initialSortOrder = 'ASC',
    initialSearch = undefined,
    initialFilter = undefined,
}: InitialPaginationOptions) => {
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);
    const [sortField, setSortField] = useState(initialSortField);
    const [sortOrder, setSortOrder] = useState(initialSortOrder);
    const [search, setSearch] = useState(initialSearch);
    const [filter, setFilter] = useState(initialFilter);

    return { page, setPage, limit, setLimit, sortField, setSortField, sortOrder, setSortOrder, search, setSearch, filter, setFilter };
};

export { usePaginationOptions };
