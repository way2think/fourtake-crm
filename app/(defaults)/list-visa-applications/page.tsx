import ListVisaApplication from '@/components/visa-process/visa-application-list/ListVisaApplication';
import React from 'react';

const VisaApplicationList = () => {
    let data = [
        {
            id: 1,
            country: 'India',
            isgroup: true,
            visatype: 'Business Type',
            nationality: 'India',
            stateofresidence: 'Kernataka',
            visaduration: '72 Hours',
            entrytype: 'Single',
            traveldate: '13/06/2024',
            customertype: 'Postal'

        },
        {
            id: 2,
            country: 'Canada',
            isgroup: false,
            visatype: 'Vistor Visa',
            nationality: 'India',
            stateofresidence: 'Tamil Nadu',
            visaduration: '3 Months',
            entrytype: 'Double',
            traveldate: '13/06/2024',
            customertype: 'Agent'
        },


    ];
    return <ListVisaApplication listapplication={data} />;
};

export default VisaApplicationList;
