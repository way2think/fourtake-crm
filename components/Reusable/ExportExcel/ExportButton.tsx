import React from 'react';
import { exportToExcel } from './exportToExcel';


const ExportButton = () => {
    const handleExport = () => {
        const data = [
            { name: 'John Doe', age: 30, email: 'john@example.com' },
            { name: 'Jane Doe', age: 25, email: 'jane@example.com' },
            // Add more data as needed
        ];

        exportToExcel(data);
    };

    return <button onClick={handleExport}>Export to Excel</button>;
};

export default ExportButton;
