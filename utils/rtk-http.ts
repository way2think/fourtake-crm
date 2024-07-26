import Swal from 'sweetalert2';
import { isFetchBaseQueryError, isSerializedError } from '@/utils/validator';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, MutationDefinition } from '@reduxjs/toolkit/dist/query/react';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { RTKPagination } from '@/types/rtk-api';

interface HandleLocalUpdateParams {
    apiObjectRef: any;
    endpoint: string;
    updateReceipe: any;
    args?: any;
}

interface HandleCreateParams {
    createMutation: MutationTrigger<MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, any, 'api'>>;
    value: any;
    items: any[];
    meta: any;
    handleLocalUpdate: (params: HandleLocalUpdateParams) => void;
    apiObjectRef: any;
    endpoint: string;
    args?: any;
    refetch: Function;
}

interface HandleUpdateParams {
    updateMutation: MutationTrigger<MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, any, 'api'>>;
    value: any;
    items: any[];
    meta: any;
    handleLocalUpdate: (params: HandleLocalUpdateParams) => void;
    apiObjectRef: any;
    endpoint: string;
    args?: any;
}

interface HandleDeleteParams {
    deleteMutation: MutationTrigger<MutationDefinition<any, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, any, 'api'>>;
    item: any;
    items: any[];
    meta: any;
    handleLocalUpdate: (params: HandleLocalUpdateParams) => void;
    apiObjectRef: any;
    endpoint: string;
    args?: any;
}

export const handleCreate = async ({ createMutation, value, items, meta, handleLocalUpdate, apiObjectRef, endpoint, args = undefined, refetch }: HandleCreateParams): Promise<boolean> => {
    const result = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Create',
        padding: '2em',
        customClass: 'sweet-alerts',
    });

    // console.log('value: ', value);

    if (result.value) {
        const res = await createMutation({ body: { ...value } });
        if ('error' in res) {
            await handleErrorResponse(res.error);
            return false;
        } else {
            const newItem = { id: res?.data?.data?.id, ...value };
            const updatedItems = [...items, newItem];
            const updatedMeta = { ...meta, itemCount: meta.itemCount + 1, totalItems: meta.totalItems + 1 };
            // handleLocalUpdate({ apiObjectRef, endpoint, updateReceipe: { items: updatedItems, meta: updatedMeta, args } });
            Swal.fire({ title: 'Created!', text: res.data.message, icon: 'success', customClass: 'sweet-alerts' });
            // refetch();
            return true;
        }
    }
    return false;
};

export const handleUpdate = async ({ updateMutation, value, items, meta, handleLocalUpdate, apiObjectRef, endpoint, args = undefined }: HandleUpdateParams): Promise<boolean> => {
    const result = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Update',
        padding: '2em',
        customClass: 'sweet-alerts',
    });

    if (result.value) {
        const res = await updateMutation({ id: value.id, body: { ...value } });
        if ('error' in res) {
            await handleErrorResponse(res.error);
            return false;
        } else {
            console.log('result,value', value, args);
            const updatedItems = items.map((item) => (item.id === value.id ? { ...item, ...value } : item));
            // handleLocalUpdate({ apiObjectRef, endpoint, updateReceipe: { items: updatedItems, meta }, args });
            Swal.fire({ title: 'Updated!', text: res.data.message, icon: 'success', customClass: 'sweet-alerts' });
            return true;
        }
    }
    return false;
};

export const handleDelete = async ({ deleteMutation, item, items, meta, handleLocalUpdate, apiObjectRef, endpoint, args = undefined }: HandleDeleteParams): Promise<boolean> => {
    const result = await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Delete',
        padding: '2em',
        customClass: 'sweet-alerts',
    });

    if (result.value) {
        const res = await deleteMutation(item.id);
        if ('error' in res) {
            await handleErrorResponse(res.error);
            return false;
        } else {
            const updatedItems = items.filter((i) => i.id !== item.id);
            const updatedMeta = { ...meta, itemCount: meta.itemCount - 1, totalItems: meta.totalItems - 1 };
            handleLocalUpdate({ apiObjectRef, endpoint, updateReceipe: { items: updatedItems, meta: updatedMeta }, args });
            Swal.fire({ title: 'Deleted!', text: res.data.message, icon: 'success', customClass: 'sweet-alerts' });
            return true;
        }
    }
    return false;
};

const handleErrorResponse = async (error: FetchBaseQueryError | Error | any) => {
    // if (isFetchBaseQueryError(error)) {
    //     await Swal.fire({ title: `${error.data?.error || 'Error'}!`, text: `${error.data?.message || 'Please try after sometime'}`, icon: 'error', customClass: 'sweet-alerts' });
    //   } else if (isSerializedError(error)) {
    //     await Swal.fire({ title: 'Error!', text: `${error.message || 'Please try after sometime'}`, icon: 'error', customClass: 'sweet-alerts' });
    //   } else {
    //     await Swal.fire({ title: 'Unknown error!', text: 'Please try after sometime', icon: 'error', customClass: 'sweet-alerts' });
    //   }
    await Swal.fire({ title: `${error.data?.error || 'Error'}!`, text: `${error.data?.message || 'Please try after sometime'}`, icon: 'error', customClass: 'sweet-alerts' });
};

export const generateURLWithPagination = ({ endpoint, page = 1, limit = 10, sortOrder, sortField, search, filter }: RTKPagination) => {
    // let url = `${endpoint}&page=${page}&limit=${limit}`;

    // if (sortOrder) {
    //     url += `&sortOrder=${sortOrder}`;
    // }

    // if (sortField) {
    //     url += `&sortField=${sortField}`;
    // }

    // if (search) {
    //     url += `&search=${search}`;
    // }

    // return url;

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(sortOrder && { sortOrder }),
        ...(sortField && { sortField }),
        ...(search && { search }),
        ...(filter && { filter }),
    });

    return `${endpoint}?${params.toString()}`;
};
