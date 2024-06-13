'use client';
import IconSearch from '../icon/icon-search';

interface FiltersettingProps {
    showCustomizer: any;
    setShowCustomizer: any;
}

const Filtersetting: React.FC<FiltersettingProps> = ({ showCustomizer, setShowCustomizer }) => {
    return (
        <div>
            <div className={`${(showCustomizer && '!block') || ''} fixed inset-0 z-[51] hidden bg-[black]/60 px-4 transition-[display]`} onClick={() => setShowCustomizer(false)}></div>

            <nav
                className={`${(showCustomizer && 'ltr:!right-0 rtl:!left-0') || ''
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
                    <div className="grid grid-cols-1 gap-5 m-5">

                        <div className="relative">
                            <input type="text" placeholder="Search" className="peer form-input py-2 ltr:pr-11 rtl:pl-11" />
                            <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                                <IconSearch className="mx-auto" />
                            </button>
                        </div>


                        <div className="dropdown ">
                            <label htmlFor="embassy/vfs">Follow Up</label>
                            <select className="form-input" defaultValue="" id="embassy">
                                <option value="" >
                                    [-Select-]
                                </option>
                                <option value="all">All</option>
                                <option value="vfs">VFS</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="embassy/vfs">Country</label>
                            <select className="form-input" defaultValue="" id="embassy">
                                <option value="" >
                                    [-Select-]
                                </option>
                                <option value="andorra">Andorra</option>
                                <option value="albania">Albania</option>
                                <option value="bangladesh">Bangladesh</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="embassy/vfs">Status</label>
                            <select className="form-input" defaultValue="" id="embassy">
                                <option value="" >
                                    [-Select-]
                                </option>
                                <option value="embassy">Embassy</option>
                                <option value="vfs">VFS</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="embassy/vfs">Filter Lead statu</label>
                            <select className="form-input" defaultValue="" id="embassy">
                                <option value="" >
                                    [-Select-]
                                </option>
                                <option value="hot">Hot</option>
                                <option value="cold">Cold</option>
                                <option value="warm">Warm</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label htmlFor="embassy/vfs">Filter by Priority</label>
                            <select className="form-input" defaultValue="" id="embassy">
                                <option value="" >
                                    [-Select-]
                                </option>
                                <option value="hot">Hot</option>
                                <option value="cold">Cold</option>
                                <option value="warm">Warm</option>
                            </select>
                        </div>


                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Filtersetting;
