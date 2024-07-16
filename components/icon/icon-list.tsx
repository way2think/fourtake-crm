import { FC } from 'react';

interface IconChatDotProps {
    className?: string;
    title: string;
}

const IconList: FC<IconChatDotProps> = ({ className, title  }) => {
    return (
        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <title>{title}</title>
            <rect x="15" y="8" width="9" height="2" className="clr-i-outline clr-i-outline-path-1"></rect>
            <rect x="15" y="12" width="9" height="2" className="clr-i-outline clr-i-outline-path-2"></rect>
            <rect x="15" y="16" width="9" height="2" className="clr-i-outline clr-i-outline-path-3"></rect>
            <rect x="15" y="20" width="9" height="2" className="clr-i-outline clr-i-outline-path-4"></rect>
            <rect x="15" y="24" width="9" height="2" className="clr-i-outline clr-i-outline-path-5"></rect>
            <rect x="11" y="8" width="2" height="2" className="clr-i-outline clr-i-outline-path-6"></rect>
            <rect x="11" y="12" width="2" height="2" className="clr-i-outline clr-i-outline-path-7"></rect>
            <rect x="11" y="16" width="2" height="2" className="clr-i-outline clr-i-outline-path-8"></rect>
            <rect x="11" y="20" width="2" height="2" className="clr-i-outline clr-i-outline-path-9"></rect>
            <rect x="11" y="24" width="2" height="2" className="clr-i-outline clr-i-outline-path-10"></rect>
            <path d="M28,2H8A2,2,0,0,0,6,4V32a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V4A2,2,0,0,0,28,2Zm0,30H8V4H28Z" className="clr-i-outline clr-i-outline-path-11"></path>
            <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
        </svg>
    );
};

export default IconList;
