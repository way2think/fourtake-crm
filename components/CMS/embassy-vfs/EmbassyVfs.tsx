'use client';
import TableLayout from '@/components/layouts/table-layout';
import EmbassyActionModal from '@/components/CMS/embassy-vfs/EmbassyActionModal';
import { showMessage } from '@/utils/notification';
import { embassyVfsSlice, useCreateEmbassyVfsMutation, useDeleteEmbassyVfsMutation, useGetEmbassyVfsQuery, useUpdateEmbassyVfsMutation } from '@/services/api/cms/embassyVfsSlice';
import type { EmbassyVfs } from '@/models/embassy-vfs.entity';
import { useRTKLocalUpdate } from '@/hooks/useRTKLocalUpdate';
import { handleCreate, handleDelete, handleUpdate } from '@/utils/rtk-http';

const EmbassyVfs: React.FC = () => {
    const [createEmbassyVfs, {}] = useCreateEmbassyVfsMutation();
    const [updateEmbassyVfs, {}] = useUpdateEmbassyVfsMutation();
    const [deleteEmbassyVfs, {}] = useDeleteEmbassyVfsMutation();
    const { data, isFetching, isLoading } = useGetEmbassyVfsQuery(undefined);
    const { items = [], meta = {} } = data || {};

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
            return handleUpdate({
                updateMutation: updateEmbassyVfs,
                value,
                items,
                meta,
                handleLocalUpdate: handleLocalRTKUpdate,
                apiObjectRef: embassyVfsSlice,
                endpoint: 'getEmbassyVfs',
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
            });
        }
    };

    return (
        <>
            <TableLayout
                title="Embassy/Vfs"
                filterby='country.name'
                data={items}
                handleDelete={handleDeleteEmbassyVfs}
                totalPages={items?.length || 0}
                tableColumns={tableColumns}
                exportColumns={exportColumns}
                ActionModal={EmbassyActionModal}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default EmbassyVfs;
