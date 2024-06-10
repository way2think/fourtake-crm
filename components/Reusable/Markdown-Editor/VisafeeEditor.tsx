// components/MarkdownEditor.js
import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './MarkDownEditor.css';

const VisafeeEditor: React.FC<{ handleInputChange: any; addData: any; setAddData: any }> = ({ handleInputChange, addData, setAddData }) => {
    const [value, setValue] = useState(addData?.fee || '');

    const handleChange = (value: React.SetStateAction<string>) => {
        setValue(value);
        setAddData((prev: any) => ({ ...prev, ['fee']: value }));
    };

    return (
        <div>
            <label htmlFor="Checklist">Visa Fee information*</label>
            <SimpleMDE onChange={handleChange} id="fee" value={value} />
        </div>
    );
};

export default VisafeeEditor;
