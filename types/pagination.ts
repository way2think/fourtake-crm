interface PaginationOptions {
    page: number;
    limit: number;
    sortField?: string;
    sortOrder?: 'ASC' | 'DESC';
    search?: string | undefined;
    filter?: string | undefined;
    filterbyrole?: string | undefined;
    showDeleted?: string | undefined;
    countryId?: string | undefined;
    visaTypeId?: string | undefined;
    stateOfResidence?: string | undefined;
}

interface InitialPaginationOptions {
    initialPage: number;
    initialLimit: number;
    initialSortField?: string;
    initialSortOrder?: 'ASC' | 'DESC';
    initialSearch?: string | undefined;
    initialFilter?: string | undefined;
}

interface PaginationMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export type { PaginationOptions, InitialPaginationOptions, PaginationMeta };
