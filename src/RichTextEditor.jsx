import { useState, useRef, useEffect } from 'react';

const RichTextEditor = () => {
  const [editorContent, setEditorContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('John');
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const imagePreviewRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    inputRef.current.focus();
  };

  const handleImageInsert = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
    inputRef.current.focus();
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePost = () => {
    if (editorContent.trim() !== '' || imagePreview) {
      const postContent = `${editorContent}${imagePreview ? `<img src="${imagePreview}" class="w-[147px] h-[147px] rounded-lg mt-2" alt="Uploaded image" />` : ''}`;
      setPosts([...posts, postContent]);
      setEditorContent('');
      setImagePreview(null);
      inputRef.current.innerHTML = '';
    }
  };

  return (
    <div className="border border-gray-300 rounded-2xl p-4 max-w-7xl mx-auto">
      <span>Hi
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block mb-4">
          @{name}
        </div>
      </span>
      
      <div className="mb-4 relative">
        <div
          ref={inputRef}
          contentEditable
          className="w-full p-2 min-h-[40px] focus:outline-none border-b-2 border-gray-300 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-500 empty:before:pointer-events-none"
          onInput={(e) => setEditorContent(e.target.innerHTML)}
          data-placeholder="What's on your mind?"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <button onClick={() => handleFormat('bold')} className="font-bold">B</button>
          <button onClick={() => handleFormat('underline')} className="underline">U</button>
          <button onClick={() => handleFormat('italic')} className="italic">I</button>
          <button onClick={() => fileInputRef.current.click()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageInsert}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
        <button 
          onClick={handlePost}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>

      {/* Image Preview should be below the insert icon */}
{imagePreview && (
  <div
    ref={imagePreviewRef}
    className="relative mt-4"
    style={{
      width: '147px',
      height: '147px',
      borderRadius: '8px 0px 0px 0px',
    //  border: '1px solid gray',
      opacity: 1, 
    }}
  >
    <img
      src={imagePreview}
      alt="Preview"
      className="w-full h-full rounded-lg"
      style={{
        objectFit: 'contain', // Ensures the full image fits within the container
        borderRadius: '8px 0px 0px 0px', // Matches the border radius of the card
      }}
    />
    <button
      onClick={handleRemoveImage}
      className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md m-1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
)}
      
      {posts.map((post, index) => (
        <div key={index} className="border-t border-gray-200 pt-4 mt-4">
          <div dangerouslySetInnerHTML={{ __html: post }} />
        </div>
      ))}
    </div>
  );
};

export default RichTextEditor;
