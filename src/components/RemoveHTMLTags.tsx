
const RemoveHTMLTags =  function RemoveHTMLTags({ text }) {
  const removeHTMLTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent;
  };

  const cleanText = removeHTMLTags(text);

  return <>{cleanText}</>;
}
export default RemoveHTMLTags ;