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
        { accessor: 'country', textAlign: 'left', title: 'Visa Country' },
        { accessor: 'name', textAlign: 'left', title: 'Name' },
        { accessor: 'state', textAlign: 'left', title: 'State' },
        { accessor: 'city', textAlign: 'left', title: 'City' },
    ];
    console.log('emabassy data', items);
    const exportColumns = ['id', 'type', 'country', 'name', 'city', 'state'];

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
        if (value.name === '' || value.name == null) {
            showMessage('Enter country name', 'error');
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

    // const handleDelete = (row: any) => {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Are you sure?',
    //         text: `You want to delete ${row.name}`,
    //         showCancelButton: true,
    //         confirmButtonText: 'Delete',
    //         padding: '2em',
    //         customClass: 'sweet-alerts',
    //     }).then((result) => {
    //         if (result.value) {
    //             setData(data.filter((item: any) => item.id !== row.id));
    //             Swal.fire({ title: 'Deleted!', text: 'Your file has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
    //             return true;
    //         }
    //     });
    // };
    // const handleSubmit = (value: any) => {
    //     if (value.embassy == '' || value.embassy == null) {
    //         showMessage('Select type - Embassy/VFS', 'error');
    //         return false;
    //     }
    //     if (value.country == '' || value.country == null) {
    //         showMessage('Select country name', 'error');
    //         return false;
    //     }
    //     if (value.name == '' || value.name == null) {
    //         showMessage('Enter embassy name', 'error');
    //         return false;
    //     }
    //     if (value.state == '' || value.state == null) {
    //         showMessage('Select State', 'error');
    //         return false;
    //     }
    //     if (value.city == '' || value.city == null) {
    //         showMessage('Slect City', 'error');
    //         return false;
    //     }

    //     if (value.id) {
    //         //update user
    //         let formData: any = data.find((d: any) => d.id === value.id);
    //         formData.embassy = value.embassy;
    //         formData.country = value.country;
    //         formData.jurisdiction = value.jurisdiction;
    //         formData.name = value.name;
    //         formData.address = value.address;
    //         formData.city = value.city;
    //         formData.state = value.state;
    //         formData.phone = value.phone;
    //         formData.fax = value.fax;
    //         formData.mail = value.mail;
    //         formData.submissiondetails = value.submissiondetails;
    //         formData.collectiondetails = value.collectiondetails;
    //         formData.processingtime = value.processingtime;

    //         console.log(formData.jurisdiction);

    //         return formData;
    //     } else {
    //         //add user

    //         let maxUserId = data.length ? data.reduce((max: any, character: any) => (character.id > max ? character.id : max), data[0].id) : 0;

    //         let formData = {
    //             id: +maxUserId + 1,
    //             embassy: value.embassy,
    //             country: value.country,
    //             jurisdiction: value.jurisdiction,
    //             name: value.name,
    //             address: value.address,
    //             city: value.city,
    //             state: value.state,
    //             fax: value.fax,
    //             mail: value.mail,
    //             submissiondetails: value.submissiondetails,
    //             collectiondetails: value.collectiondetails,
    //             processingtime: value.processingtime,
    //         };
    //         setData([...data, formData]);
    //         return formData;

    //         //   searchContacts();
    //     }

    //     // showMessage('User has been saved successfully.');
    //     // setAddContactModal(false);
    //     // setIsEdit(false);
    // };

    return (
        <>
            <TableLayout
                title="Embassy/Vfs"
                filterby="embassy"
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
