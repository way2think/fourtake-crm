import { Metadata } from 'next';
import React from 'react';
import Home from '@/components/home/home';

export const metadata: Metadata = {
    title: 'Fourtake CRM',
};

const HomePage = async () => {
    return <Home />;
};

export default HomePage;
