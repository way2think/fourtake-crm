import { RefreshCw } from 'lucide-react';
import React from 'react';

const RefreshButton = () => {
    return (
        <span
            className="cursor-pointer rounded-lg border border-[#808080] p-1.5"
            onClick={() => {
                window.location.reload();
            }}
        >
            <RefreshCw color="grey" />
        </span>
    );
};

export default RefreshButton;
