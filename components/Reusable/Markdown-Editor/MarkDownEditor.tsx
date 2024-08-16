// components/MarkdownEditor.js
import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './MarkDownEditor.css';

const MarkdownEditor: React.FC<{ handleInputChange: any; addData: any; setAddData: any }> = ({ handleInputChange, addData, setAddData }) => {
    const [value, setValue] = useState(addData?.additional_info || '');
    const handleChange = (value: React.SetStateAction<string>) => {
        setValue(value);
        setAddData((prev: any) => ({ ...prev, ['additional_info']: value }));
    };

    return (
        <div>
            <label htmlFor="additional_info">Additional Info:</label>
            <SimpleMDE onChange={handleChange} id="additional_info" value={value} />
        </div>
    );
};

export default MarkdownEditor;
