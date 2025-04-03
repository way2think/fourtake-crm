import { useEffect, useState } from 'react';

interface InputDateProps {
    label: string;
    id: string;
    setAddData: (data: any) => void;
    addData: any;
    isEdit?: boolean;
    disable?: boolean;
}

const InputDate = ({ id, label, disable, isEdit, addData, setAddData }: InputDateProps) => {
    const [dateStrValue, setDateStrValue] = useState('');

    useEffect(() => {
        // console.log('addData: ', addData[id]);
        if (isEdit) {
            setDateStrValue(addData[id]);
        }
    }, [isEdit, addData, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        // console.log('e', value);

        setDateStrValue(value);
        setAddData((prevData: any) => ({
            ...prevData,
            [id]: value,
        }));
    };

    return (
        <div className="mb-5">
            <label htmlFor={id}>{label}</label>
            <input value={dateStrValue} title={label} id={id} type="date" className="form-input w-auto" disabled={disable} onChange={handleChange} required />
        </div>
    );
};

export default InputDate;
