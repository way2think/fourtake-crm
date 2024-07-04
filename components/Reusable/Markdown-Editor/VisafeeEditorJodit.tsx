// components/MarkdownEditor.tsx
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import './MarkDownEditor.css';

interface VisafeeEditorProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addData: { [key: string]: any };
    setAddData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const VisafeeEditor: React.FC<VisafeeEditorProps> = ({ handleInputChange, addData, setAddData }) => {
    const editor = useRef(null);
    const [value, setValue] = useState<string>(addData?.fee || '');

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typing...',
        }),
        []
    );

    const handleChange = (newValue: string) => {
        setValue(newValue);
        setAddData(prev => ({ ...prev, fee: newValue }));
    };

    return (
        <div>
            {/* <label htmlFor="Checklist">Visa Fee information*</label> */}
            <JoditEditor
                ref={editor}
                value={value}
                config={config}
                onBlur={(newContent) => handleChange(newContent)}
                onChange={newContent => handleChange(newContent)}
            />
        </div>
    );
};

export default VisafeeEditor;
