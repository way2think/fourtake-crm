import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="min-h-screen bg-[#2DB7FE] text-black dark:text-white-dark ">{children} </div>;
};

export default AuthLayout;
