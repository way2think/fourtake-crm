// components/MarkdownEditor.js
import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './MarkDownEditor.css';

const VisafeeEditor = () => {
    const [value, setValue] = useState('');

    const handleChange = (value: React.SetStateAction<string>) => {
        setValue(value);
    };

    return (
        <div>
            <label htmlFor="Checklist">Visa Fee information*</label>
            <SimpleMDE value={value} onChange={handleChange} id="Checklist" />
        </div>
    );
};

export default VisafeeEditor;
