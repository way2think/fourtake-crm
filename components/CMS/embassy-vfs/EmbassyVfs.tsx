'use client';

import TableLayout from '@/components/layouts/table-layout';
import EmbassyActionModal from '@/components/cms/embassy-vfs/EmbassyActionModal';
import { showMessage } from '@/utils/notification';
import { embassyVfsSlice, useCreateEmbassyVfsMutation, useDeleteEmbassyVfsMutation, useGetEmbassyVfsQuery, useUpdateEmbassyVfsMutation } from '@/services/api/cms/embassyVfsSlice';
import type { EmbassyVfs } from '@/entities/embassy-vfs.entity';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';
import { usePaginationOptions } from '@/hooks/usePaginationOptions';

const EmbassyVfs: React.FC = () => {
    const [createEmbassyVfs, {}] = useCreateEmbassyVfsMutation();
    const [updateEmbassyVfs, {}] = useUpdateEmbassyVfsMutation();
    const [deleteEmbassyVfs, {}] = useDeleteEmbassyVfsMutation();

    const { page, limit, sortField, sortOrder, search, filter, setFilter, setPage, setLimit, setSearch } = usePaginationOptions({ initialPage: 1, initialLimit: 10, initialFilter: 'all' });

    const { data, isFetching, isLoading } = useGetEmbassyVfsQuery({ page, limit, sortField, sortOrder, search, filter });
    const { items = [], meta = {} } = data || {};

    console.log('data: ', data, isLoading, isFetching);

    const [handleLocalRTKUpdate] = useRTKLocalUpdate();

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'S.NO' },
        { accessor: 'type', textAlign: 'left', title: 'Embassy/VFS' },
        {
            accessor: 'country.name',
            textAlign: 'left',
            title: 'Visa Country',
            render: (row: any) => {
                return row.country.name;
            },
        },
        { accessor: 'name', textAlign: 'left', title: 'Name' },
        { accessor: 'state', textAlign: 'left', title: 'State' },
        { accessor: 'city', textAlign: 'left', title: 'City' },
    ];

    const exportColumns = ['id', 'type', `country`, 'jurisdiction', 'name', 'city', 'state', 'phone', 'fax', 'email', 'submission_details', 'collection_details', 'processing_time'];

    const handleDeleteEmbassyVfs = (embassyvfs: EmbassyVfs) =>
        handleDelete({
            deleteMutation: deleteEmbassyVfs,
            item: embassyvfs,
            items,
            meta,
            handleLocalUpdate: handleLocalRTKUpdate,
            apiObjectRef: embassyVfsSlice,
            endpoint: 'getEmbassyVfs',
            args: { page, limit, sortField, sortOrder, search },
        });

    const handleSubmit = async (value: EmbassyVfs) => {
        if (value.type == '' || value.type == null) {
            showMessage('Select type - Embassy/VFS', 'error');
            return false;
        }
        if (value.country == '' || value.country == null) {
            showMessage('Select country name', 'error');
            return false;
        }
        if (value.name === '' || value.name == null) {
            showMessage('Enter  Name', 'error');
            return false;
        }
        if (value.state == '' || value.state == null) {
            showMessage('Select State', 'error');
            return false;
        }
        if (value.city == '' || value.city == null) {
            showMessage('Slect City', 'error');
            return false;
        }

        if (value.id) {
            console.log('hi', value.id);
            return handleUpdate({
                updateMutation: updateEmbassyVfs,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: embassyVfsSlice,
                endpoint: 'getEmbassyVfs',
                args: { page, limit, sortField, sortOrder, search, filter },
            });
        } else {
            return handleCreate({
                createMutation: createEmbassyVfs,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: embassyVfsSlice,
                endpoint: 'getEmbassyVfs',
                args: { page, limit, sortField, sortOrder, search, filter },
            });
        }
    };

    return (
        <>
            <TableLayout
                title="Embassy/Vfs"
                filterby="country.name"
                data={items}
                meta={meta}
                handleDelete={handleDeleteEmbassyVfs}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={EmbassyActionModal}
                handleSubmit={handleSubmit}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                setPage={setPage}
                setLimit={setLimit}
            />
        </>
    );
};

export default EmbassyVfs;
