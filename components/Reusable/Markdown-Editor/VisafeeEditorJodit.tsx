// components/MarkdownEditor.tsx
import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import './MarkDownEditor.css';

interface VisafeeEditorProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    addData: { [key: string]: any };
    setAddData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    title: string;
}

const VisafeeEditor: React.FC<VisafeeEditorProps> = ({ title, handleInputChange, addData, setAddData }) => {
    const editor = useRef(null);
    const [value, setValue] = useState<string>(addData?.[title] || '');

    useEffect(() => {
        const escapeHtml = (html: string = '') => {
            return html
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;')
                .replace(/\\/g, '\\\\')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r');
        };
    
        const escapedValue = escapeHtml(value);
        // Use escapedValue if necessary
    }, [value]);

    useEffect(() => {
        setValue(addData?.[title]);
    }, [addData?.[title]]);

    const config = useMemo(
        () => ({
            readonly: false,
            // placeholder: 'Start typing...',
        }),
        []
    );

    const handleChange = (newValue: string) => {
        setValue(newValue);
        setAddData((prev) => ({ ...prev, [title]: newValue }));
    };

    return (
        <div >
            {/* <label htmlFor="Checklist">Visa Fee information*</label> */}
            <JoditEditor ref={editor} value={value} config={config} onBlur={(newContent) => handleChange(newContent)} onChange={(newContent) => handleChange(newContent)} />
        </div>
    );
};

export default VisafeeEditor;
