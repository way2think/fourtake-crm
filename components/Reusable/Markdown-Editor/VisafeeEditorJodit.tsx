// components/MarkdownEditor.tsx
import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import './MarkDownEditor.css';

interface VisafeeEditorProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addData: { [key: string]: any };
    setAddData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const VisafeeEditor: React.FC<VisafeeEditorProps> = ({ handleInputChange, addData, setAddData }) => {
    const editor = useRef(null);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        const escapeHtml = (html: any) => {
            return html
                .replace(/\\/g, '\\\\') // Escape backslashes
                .replace(/"/g, '\\"') // Escape double quotes
                .replace(/\n/g, '\\n') // Escape new lines
                .replace(/\r/g, '\\r'); // Escape carriage returns
        };
        const result = escapeHtml(value);
        console.log('value of jodit editor', result);
    }, [value]);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typing...',
        }),
        []
    );

    const handleChange = (newValue: string) => {
        setValue(newValue);
        setAddData((prev) => ({ ...prev, fee: newValue }));
    };

    return (
        <div>
            {/* <label htmlFor="Checklist">Visa Fee information*</label> */}
            <JoditEditor ref={editor} value={value} config={config} onBlur={(newContent) => handleChange(newContent)} onChange={(newContent) => handleChange(newContent)} />
        </div>
    );
};

export default VisafeeEditor;
