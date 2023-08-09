import React, { useState } from 'react';

const CommentForm = () => {
  const [commentData, setCommentData] = useState({
    author: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Додано коментар:', commentData);
    setCommentData({
      author: '',
      content: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Автор:
          <input type="text" name="author" value={commentData.author} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Коментар:
          <textarea name="content" value={commentData.content} onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Додати коментар</button>
    </form>
  );
};

export default CommentForm;