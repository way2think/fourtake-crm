// components/MarkdownEditor.js
import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './MarkDownEditor.css';

const MarkdownEditor: React.FC<{ handleInputChange: any; addData: any; setAddData: any }> = ({ handleInputChange, addData, setAddData }) => {
    const [value, setValue] = useState(addData?.checklist || '');
    const handleChange = (value: React.SetStateAction<string>) => {
        setValue(value);
        setAddData((prev: any) => ({ ...prev, ['checklist']: value }));
    };

    return (
        <div>
            <label htmlFor="Checklist">Checklist*</label>
            <SimpleMDE onChange={handleChange} id="checklist" value={value} />
        </div>
    );
};

export default MarkdownEditor;
