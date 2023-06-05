import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange }) => {
  const [quillValue, setQuillValue] = useState('');

  useEffect(() => {
    setQuillValue(value);
  }, [value]);

  const handleChange = (content) => {
    setQuillValue(content);
    onChange(content);
  };

  return (
    <div>
      {typeof window !== 'undefined' && (
        <ReactQuill value={quillValue} onChange={handleChange} />
      )}
    </div>
  );
};

export default QuillEditor;
