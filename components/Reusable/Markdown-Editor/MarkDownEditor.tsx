// components/MarkdownEditor.js
import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './MarkDownEditor.css';

const MarkdownEditor = () => {
    const [value, setValue] = useState('');

    const handleChange = (value: React.SetStateAction<string>) => {
        setValue(value);
    };

    return (
        <div>
            <label htmlFor="Checklist">Checklist*</label>
            <SimpleMDE value={value} onChange={handleChange} id="Checklist" />
        </div>
    );
};

export default MarkdownEditor;
