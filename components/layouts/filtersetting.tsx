'use client';

interface FiltersettingProps {
    showCustomizer: any;
    setShowCustomizer: any;
}

const Filtersetting: React.FC<FiltersettingProps> = ({ showCustomizer, setShowCustomizer }) => {
    return (
        <div>
            <div className={`${(showCustomizer && '!block') || ''} fixed inset-0 z-[51] hidden bg-[black]/60 px-4 transition-[display]`} onClick={() => setShowCustomizer(false)}></div>

            <nav
                className={`${
                    (showCustomizer && 'ltr:!right-0 rtl:!left-0') || ''
                } fixed bottom-0 top-0 z-[51] w-full max-w-[400px] bg-white p-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 dark:bg-black ltr:-right-[400px] rtl:-left-[400px]`}
            >
                {/* <button
                    type="button"
                    className="absolute top-100  flex h-10 w-12 cursor-pointer items-center justify-center bg-primary text-white ltr:-left-12 ltr:rounded-bl-full ltr:rounded-tl-full rtl:-right-12 rtl:rounded-br-full rtl:rounded-tr-full"
                    onClick={() => setShowCustomizer(!showCustomizer)}
                >
                    <IconLayout className="h-5 w-5 animate-[spin_3s_linear_infinite]" />
                </button> */}

                <div className="perfect-scrollbar h-full overflow-y-auto overflow-x-hidden">
                    <div className="flex h-screen items-center justify-center">Filter</div>
                </div>
            </nav>
        </div>
    );
};

export default Filtersetting;
