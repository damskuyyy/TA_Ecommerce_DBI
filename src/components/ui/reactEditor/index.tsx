import { MinimalTiptapEditor } from '@/minimal-tiptap';
import { Content } from '@tiptap/core';
import React, { Dispatch, SetStateAction } from 'react';

// Define a type for the setValue function that can handle Content
type SetValueFunction = (value: Content) => void;

interface Props {
  value: string;
  setValue: SetValueFunction | Dispatch<SetStateAction<string>>;
  placeholder?: string
}

const ReactEditor: React.FC<Props> = ({ value, setValue, placeholder }) => {
  const handleChange = (content: Content) => {
    if (typeof setValue === 'function') {
      if (typeof setValue === 'function') {
        const contentString =  String(content);
        setValue(String(contentString));
      }
    }
  }

  return (
    <MinimalTiptapEditor
      value={value}
      onChange={handleChange}
      throttleDelay={2000}
      className="w-full"
      output="html"
      placeholder={placeholder || "Type your description here..."}
      autofocus={true}
      immediatelyRender={true}
      editable={true}
      injectCSS={true}
      shouldRerenderOnTransaction={false}
      editorClassName="focus:outline-none"
    />
  );
};

export default ReactEditor;
