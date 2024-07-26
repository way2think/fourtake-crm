import VisafeeEditorJodit from '@/components/Reusable/Markdown-Editor/VisafeeEditorJodit';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import NewComponentsFormsFileUploadMultiple from '@/components/Reusable/file-upload/NewComponentsFormsFileUploadSingle';
import IconX from '@/components/icon/icon-x';
import { useGetCountriesQuery } from '@/services/api/cms/countrySlice';
import { useGetVisaTypesQuery } from '@/services/api/cms/visaTypeSlice';

interface VisaChecklistActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}

const VisaChecklistActionModal: React.FC<VisaChecklistActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    const { data: countries, isLoading, isFetching } = useGetCountriesQuery(undefined);
    const { items = [], meta = {} } = countries || {};

    const { data: visatypes } = useGetVisaTypesQuery(undefined);
    // console.log('addData', addData);

    return (
        <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-4xl">
            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                <h5 className="text-lg font-bold">Add Visa Checklist</h5>
                <button
                    onClick={() => {
                        setIsOpen(false);
                        setAddData({});
                    }}
                    type="button"
                    className="text-white-dark hover:text-dark"
                >
                    <IconX />
                </button>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="dropdown">
                        <label htmlFor="country">Countries*</label>
                        <select className="form-input" id="country" value={(addData?.country && addData?.country.id) || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled>
                                Select Countries
                            </option>
                            {items?.map((country: any) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="dropdown">
                        <label htmlFor="role">Visa Category*</label>
                        <select className="form-input" defaultValue="" id="type" value={(addData.visa_type && addData?.visa_type.id) || ''} onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled>
                                Visa Type
                            </option>
                            {visatypes?.items?.map((type: any) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        {/* <label htmlFor="embassy">Embassy*</label>
                        <textarea
                            id="embassy"
                            rows={3}
                            placeholder="Enter Embassy"
                            className="form-textarea min-h-[80px] resize-none"
                            value={addData?.embassy}
                            onChange={(e) => handleInputChange(e)}
                        ></textarea> */}
                        <label htmlFor="embassy">Embassy*</label>
                        <select
                            id="embassy"
                            multiple
                            className="form-select"
                            value={addData?.embassy ? addData.embassy.split(', ') : []} // assuming addData.embassy is an array
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        {/* <MarkdownEditor handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} /> */}
                        <label htmlFor="Checklist">Checklist*</label>
                        <VisafeeEditorJodit title={'checklist'} handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} />
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <div className="mb-2">
                        {/* <VisafeeEditor handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} /> */}
                        <label htmlFor="Checklist">Visa Fee information*</label>

                        <VisafeeEditorJodit title={'fee'} handleInputChange={handleInputChange} setAddData={setAddData} addData={addData} />
                    </div>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-5 md:grid-cols-1">
                    {/* <div className="mb-2">
                        <ComponentsFormsFileUploadSingle setAddData={setAddData} addData={addData} />
                    </div> */}
                    <div className="mb-2">
                        <NewComponentsFormsFileUploadMultiple setAddData={setAddData} addData={addData} />
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            setAddData({});
                        }}
                        type="button"
                        className="btn btn-outline-danger"
                    >
                        Cancel
                    </button>
                    <button onClick={handleSave} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                        Save
                    </button>
                </div>
            </div>
        </ActionModal>
    );
};

export default VisaChecklistActionModal;
