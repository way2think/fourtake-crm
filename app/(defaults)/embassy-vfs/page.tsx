import React from 'react';
import EmbassyVfs from '@/components/cms/embassy-vfs/EmbassyVfs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Fourtake CRM - Embassy/VFS',
};

const EmbassyVfsPage = () => {
    return <EmbassyVfs />;
};

export default EmbassyVfsPage;
