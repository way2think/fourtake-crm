import IconX from '@/components/icon/icon-x';
import ComponentsFormsFileUploadMulti from '../../Reusable/file-upload/components-forms-file-upload-multi';
import ComponentsFormsFileUploadSingle from '../../Reusable/file-upload/components-forms-file-upload-single';
import ActionModal from '@/components/Reusable/Modal/ActionModal';
import ComponentsFormsSelectMultiselect from '@/components/Reusable/select/components-forms-select-multiselect';
import { useGetVisaTypesQuery } from '@/services/api/cms/visaTypeSlice';

interface CountryVisaTypeActionModalProps {
    isOpen: any;
    setIsOpen: any;
    handleSave: any;
    addData?: any;
    handleInputChange: any;
    setAddData: any;
}

interface OptionType {
    value: string;
    label: string;
}
const CountryVisaTypeActionModal: React.FC<CountryVisaTypeActionModalProps> = ({ isOpen, setAddData, handleInputChange, setIsOpen, handleSave, addData }) => {
    const { data, isFetching, isLoading } = useGetVisaTypesQuery({ page: 0, limit: 0 });

    const options: OptionType[] = [
        { value: 'E-Visa', label: 'E-Visa' },
        { value: 'Business Visa', label: 'Business Visa' },
        { value: 'Tourist Visa', label: 'Tourist Visa' },
        { value: 'Student Visa', label: 'Student Visa' },
        { value: 'Work Visa', label: 'Work Visa' },
        { value: 'Diplomatic Visa', label: 'Diplomatic Visa' },
        { value: 'Transit Visa', label: 'Transit Visa' },
        { value: 'Medical Visa', label: 'Medical Visa' },
    ];

    return (
        <>
            <ActionModal isOpen={isOpen} setIsOpen={setIsOpen} handleSave={handleSave} width="max-w-xl" height="h-50">
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-lg font-bold">Edit Country Visa Type</h5>
                    <button onClick={() => setIsOpen(false)} type="button" className="text-white-dark hover:text-dark">
                        <IconX />
                    </button>
                </div>

                <div className="p-5">
                    <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-1 ">
                        <ComponentsFormsSelectMultiselect addData={addData} options={options} setAddData={setAddData} id={'type'} />
                    </div>

                    <div className="mt-8 flex items-center justify-end">
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
        </>
    );
};

export default CountryVisaTypeActionModal;
