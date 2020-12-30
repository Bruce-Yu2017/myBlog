import React, { useState, useEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";

const TagGenerator = ({ addTag }) => {
  const [tags, setTags] = useState([]);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  useEffect(() => {
    addTag(tags);
  }, [tags, addTag]);
  return (
    <div>
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        allowDragDrop={false}
        placeholder="Enter Post Tag"
      />
    </div>
  );
};

export default TagGenerator;
