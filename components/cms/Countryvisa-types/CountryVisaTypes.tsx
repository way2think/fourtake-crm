'use client';

import TableLayout from '@/components/layouts/table-layout';
import { showMessage } from '@/utils/notification';
import {
    countryVisaTypeSlice,
    useCreateCountryVisaTypeMutation,
    useDeleteCountryVisaTypeMutation,
    useGetCountryVisaTypesQuery,
    useUpdateCountryVisaTypeMutation,
} from '@/services/api/cms/countryVisaTypeSlice';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { CountryVisaType } from '@/entities/country-visa-type.entity';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';
import CountryVisaTypeActionModal from './CountryVisaTypesActionModal';
import LoadingSpinner from '@/components/Reusable/LoadingSpinner/LoadingSpinner';

const CountryVisaTypes: React.FC = () => {
    const [createCountryVisaType, { isLoading: isCreateLoading }] = useCreateCountryVisaTypeMutation();
    const [updateCountryVisaType, { isLoading: isUpdateLoading }] = useUpdateCountryVisaTypeMutation();
    const [deleteCountryVisaType, { isLoading: isDeleteLoading }] = useDeleteCountryVisaTypeMutation();

    const { page, limit, sortField, sortOrder, search, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10 });

    const { data, isFetching, isLoading } = useGetCountryVisaTypesQuery({ page, limit, sortField, sortOrder, search });
    const { items = [], meta = {} } = data || {};

    // console.log('time', items);

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'ID' },
        {
            accessor: 'name',
            textAlign: 'left',
            title: 'Country Name',
        },
        {
            accessor: 'country_visa_types',
            textAlign: 'left',
            title: 'Country Visa Types',
            render: (row: any) => {
                return row.country_visa_types.map((item: any) => item.name).join(', ');
            },
        },
    ];

    const exportColumns = ['id', 'country', 'visa_type'];

    const handleDeleteCountryVisaType = (countryvisatype: CountryVisaType) =>
        handleDelete({
            deleteMutation: deleteCountryVisaType,
            item: countryvisatype,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: countryVisaTypeSlice,
            endpoint: 'getCountryVisaTypes',
        });

    const handleSubmit = async (value: CountryVisaType) => {
        if (value.visa_type == null) {
            showMessage('Select VisaTypes', 'error');
            return false;
        }

        if (value.id) {
            return handleUpdate({
                updateMutation: updateCountryVisaType,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: countryVisaTypeSlice,
                endpoint: 'getCountryVisaTypes',
            });
        } else {
            return handleCreate({
                createMutation: createCountryVisaType,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: countryVisaTypeSlice,
                endpoint: 'getCountryVisaTypes',
            });
        }
    };

    // const handleSubmit = (value: any) => {
    //     console.log('value', value);
    //     if (value.visatypes == '' || value.visatypes == null || value.visatypes.length === 0) {
    //         showMessage('Select VisaTypes', 'error');
    //         return false;
    //     }

    //     //edit
    //     let formData: any = data.find((d: any) => d.id === value.id);
    //     formData.visatypes = value.visatypes;
    //     return true;

    //     // else {
    //     //     //add user
    //     //     let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

    //     //     let formData = {
    //     //         id: +maxUserId + 1,
    //     //         country: value.country,
    //     //         language: value.language,
    //     //         dailingcode: value.dailingcode,
    //     //         capital: value.capital,
    //     //         cities: value.cities,
    //     //         countrydetails: value.countrydetails,
    //     //         climate: value.climate,
    //     //         currency: value.currency,
    //     //         timezone: value.timezone,
    //     //         additionalinfo: value.additionalinfo,
    //     //         website: value.website,
    //     //         ispopular: value.ispopular,
    //     //         isoutsource: value.isoutsource,
    //     //         isjurisdiction: value.isjurisdiction,
    //     //         image: value.image,
    //     //         flag: value.flag,
    //     //     };
    //     //     setData([...data, formData]);
    //     //     return formData;

    //     //     //   searchContacts();
    //     // }

    //     // showMessage('User has been saved successfully.');
    //     // setAddContactModal(false);
    //     // setIsEdit(false);
    // };
    return (
        <>
            {(isFetching || isLoading || isCreateLoading || isUpdateLoading || isDeleteLoading) && <LoadingSpinner />}

            <TableLayout
                title="Country Visa Types"
                data={items || []}
                meta={meta}
                filterby="country"
                handleDelete={handleDeleteCountryVisaType}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={CountryVisaTypeActionModal}
                handleSubmit={handleSubmit}
                setSearch={setSearch}
                setPage={setPage}
                setLimit={setLimit}
            />
        </>
    );
};

export default CountryVisaTypes;
