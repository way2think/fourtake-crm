import { getData } from '@/api';
import TableLayout from '@/components/layouts/table-layout';
import { use } from 'react';

const getServerData = async () => {
    return await getData({ url: 'http://localhost:5001/center' });
};
const Country = () => {
    // const { data, isError, error } = use(getServerData());
    // // const { data, isError, error } = await getData({ url: 'http://localhost:5001/center' });
    // // console.log('dataaaa: ', data);
    // if (isError) {
    //     console.log(error.message);
    // }

    const data = [
        {
            id: 2,
            name: 'Bangalore',
            phone: '8778229794',
            email: 'blr@fourtakevisas.com',
            address: 'brigade road, bangalore',
            is_active: true,
        },
    ];

    const tableColumns = [
        { accessor: 'id', textAlign: 'left', title: 'S.NO' },
        { accessor: 'name', textAlign: 'left' },
        { accessor: 'phone', textAlign: 'left' },
        { accessor: 'email', textAlign: 'left' },
        { accessor: 'address', textAlign: 'left' },
        {
            accessor: 'is_active',
            textAlign: 'left',
            // render: ({ is_active }: { is_active: any }) => {
            //     return is_active;
            // },
        },
    ];

    return <TableLayout title="Country List" data={data || []} totalPages={data?.length || 0} tableColumns={tableColumns} actionModal={<>Hi</>} />;
};

export default Country;
