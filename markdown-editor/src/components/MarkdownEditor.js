import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Import for table and list support
import axios from "axios"; // Axios for API requests
import "./MarkdownEditor.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");

  // Save markdown content to the backend
  const saveMarkdown = async () => {
    try {
      if (!title || !markdown) {
        alert("Title and content are required!");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/markdown", {
        title,
        content: markdown,
      });

      alert("Markdown saved successfully!");
      console.log("Saved Data:", response.data);
    } catch (error) {
      console.error("Error saving markdown:", error);
      alert("Failed to save markdown.");
    }
  };

  // Fetch all markdown entries from the backend
  const fetchMarkdowns = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/markdown");
      const data = response.data;

      if (data.length > 0) {
        const lastEntry = data[data.length - 1];
        setTitle(lastEntry.title);
        setMarkdown(lastEntry.content);
      } else {
        // alert("No markdown entries found!");
      }
    } catch (error) {
      console.error("Error fetching markdown:", error);
      alert("Failed to fetch markdown.");
    }
  };

  useEffect(() => {
    fetchMarkdowns(); // Fetch the initial content when the component loads
  }, []);

  const handleToolbarClick = (startSyntax, endSyntax = startSyntax) => {
    const textarea = document.getElementById("markdown-input");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = markdown.slice(start, end);

    const updatedText =
      markdown.substring(0, start) +
      startSyntax +
      selectedText +
      endSyntax +
      markdown.substring(end);

    setMarkdown(updatedText);

    textarea.focus();
    textarea.selectionStart = start + startSyntax.length;
    textarea.selectionEnd = end + startSyntax.length;
  };

  return (
    <div className="markdown-editor">
      <h2>Markdown Editor</h2>
      <div className="input-title">
      </div>
      <div className="toolbar">
        <button onClick={() => handleToolbarClick("**")}>
          <b>B</b>
        </button>
        <button onClick={() => handleToolbarClick("_")}>
          <i>/</i>
        </button>
        <button onClick={() => handleToolbarClick("# ", "")}>H1</button>
        <button onClick={() => handleToolbarClick("- ", "")}>List</button>
        {/* <button onClick={saveMarkdown}>Save</button>
        <button onClick={fetchMarkdowns}>Load</button> */}
      </div>
      <div className="editor">
        <textarea
          id="markdown-input"
          className="input-area"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
        <div className="preview-area">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;




// only frontend
// import React, { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm"; // Import for table and list support
// import "./MarkdownEditor.css";

// const MarkdownEditor = () => {
//   const [markdown, setMarkdown] = useState("");

//   const handleToolbarClick = (startSyntax, endSyntax = startSyntax) => {
//     const textarea = document.getElementById("markdown-input");
//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;

//     // Get the selected text
//     const selectedText = markdown.slice(start, end);

//     // Wrap the selected text with the syntax
//     const updatedText =
//       markdown.substring(0, start) +
//       startSyntax +
//       selectedText +
//       endSyntax +
//       markdown.substring(end);

//     setMarkdown(updatedText);

//     // Refocus and adjust cursor position
//     textarea.focus();
//     textarea.selectionStart = start + startSyntax.length;
//     textarea.selectionEnd = end + startSyntax.length;
//   };

//   console.log("markdown", markdown);
  

//   return (
//     <div className="markdown-editor">
//       <h2>Markdown Editor</h2>
//       <div className="toolbar">
//         <button onClick={() => handleToolbarClick("**")}>
//           <b>B</b>
//         </button>
//         <button onClick={() => handleToolbarClick("_")}>
//           <i>/</i>
//         </button>
//         <button onClick={() => handleToolbarClick("# ", "")}>H1</button>
//         <button onClick={() => handleToolbarClick("- ", "")}>List</button>
//       </div>
//       <div className="editor">
//         <textarea
//           id="markdown-input"
//           className="input-area"
//           value={markdown}
//           onChange={(e) => setMarkdown(e.target.value)}
//         />
//         <div className="preview-area">
//           <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarkdownEditor;