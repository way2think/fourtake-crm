import IconX from "@/components/icon/icon-x";
import ComponentsFormsFileUploadMulti from "../../Reusable/file-upload/components-forms-file-upload-multi";
import ComponentsFormsFileUploadSingle from "../../Reusable/file-upload/components-forms-file-upload-single";
import ActionModal from "@/components/Reusable/Modal/ActionModal";

interface CountryActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    editData?: any;
}
const CountryActionModal:React.FC<CountryActionModalProps> = ({ isOpen, setIsOpen, handleSave, editData }) => {
    return (
        <>
        <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} >
            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Add Country</h5>
                <button onClick={() => setIsOpen(false)} type="button" className="text-white-dark hover:text-dark">
                    <IconX />
                </button>
            </div>

            <div className="p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="mb-5">
                        <label htmlFor="countrysname">Country Name</label>
                        <input id="countrysname" type="text" placeholder="Enter Country Name" className="form-input" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="languages">Languages</label>
                        <input id="languages" type="text" placeholder="Enter Languages" className="form-input" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="mb-5">
                        <label htmlFor="dailingcode">Dailing Code</label>
                        <input id="dailingcode" type="tel" placeholder="Enter dailing Code" className="form-input" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="capital">Capital</label>
                        <input id="capital" type="text" placeholder="Enter Capital" className="form-input" />
                    </div>
                </div>
                <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                    <div className="dropdown">
                        <label htmlFor="role">Cities</label>
                        <select className="form-input" defaultValue="" id="role">
                            <option value="" disabled={true}>
                                Cities
                            </option>
                            <option value="Chennai">Chennai</option>
                            <option value="Vellore">Vellore</option>
                            <option value="Bengaluru">Bengaluru</option>
                            <option value="New Delhi">New Delhi</option>
                            <option value="Mangalore">Mangalore</option>
                            <option value="Mumbai">Mumbai</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="mb-5">
                        <label htmlFor="countrydetails">Country Details</label>
                        <textarea id="countrydetails" rows={3} placeholder="Enter Country Details" className="form-textarea min-h-[80px] resize-none"></textarea>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="climate">Climate</label>
                        <textarea id="climate" rows={3} placeholder="Enter Climate" className="form-textarea min-h-[80px] resize-none"></textarea>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">
                    <div className="mb-5">
                        <label htmlFor="currency">Currency</label>
                        <input id="currency" type="tel" placeholder="Enter Currency" className="form-input" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="timezone">Time Zone</label>
                        <input id="timezone" type="text" placeholder="Enter Time Zone" className="form-input" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                    <div className="mb-5">
                        <label htmlFor="additionalinfo">Additional Info</label>
                        <textarea id="additionalinfo" rows={3} placeholder="Enter Additional Info" className="form-textarea min-h-[80px] resize-none"></textarea>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-1 ">
                    <div className="mb-5">
                        <label htmlFor="website">Website</label>
                        <input id="website" type="text" placeholder="Enter Website" className="form-input" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                    <div className="mb-5">
                        <label className="flex cursor-pointer items-center">
                            <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                            <span className="text-white-dark">Is popular Country</span>
                        </label>
                    </div>
                    <div className="mb-5">
                        <label className="flex cursor-pointer items-center">
                            <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                            <span className="text-white-dark">Enable outsource application center</span>
                        </label>
                    </div>
                    <div className="mb-5">
                        <label className="flex cursor-pointer items-center">
                            <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                            <span className="text-white-dark">Enable Jurisdiction</span>
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 ">
                    <div className="mb-5">
                        <ComponentsFormsFileUploadSingle />
                    </div>
                    <div className="mb-5">
                        <ComponentsFormsFileUploadMulti />
                    </div>
                </div>
                <div className="mt-8 flex items-center justify-end">
                    <button onClick={() => setIsOpen(false)} type="button" className="btn btn-outline-danger">
                        Cancel
                    </button>
                    <button onClick={handleSave} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                        Save
                    </button>
                </div>
            </div>
            </ActionModal>
        </>
    );
};

export default CountryActionModal;
