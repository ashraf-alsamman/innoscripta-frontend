import React from 'react';
interface RemoveHTMLTagsProps {
  text: string;
}

const RemoveHTMLTags: React.FC<RemoveHTMLTagsProps> = ({ text }) => {
  const removeHTMLTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent || '';
  };

  const cleanText = removeHTMLTags(text);

  return <>{cleanText}</>;
};

export default RemoveHTMLTags;
