import React from 'react';
import EmbassyVfs from '@/components/cms/embassy-vfs/EmbassyVfs';
import { Metadata } from 'next';
import Country from '@/components/cms/countries/Country';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const Sales = () => {
    const data = [
        {
            id: 1,
            embassy: 'Embassy',
            country: 'india',
            name: 'jagadish',
            city: 'vellore',
            state: 'Tamil nadu',
        },
        {
            id: 2,
            embassy: 'vfs',
            country: 'india',
            name: 'Raji',
            city: 'Chennai',
            state: ' Andhra Pradesh',
        },
        {
            id: 3,
            embassy: 'Embassy',
            country: 'india',
            name: 'Santhosh',
            city: 'madhuri',
            state: 'Karnataka',
        },
    ];
    return <EmbassyVfs embassyvfsdata={data} />;
};

export default Sales;
