import React, { useState, useMemo } from "react";
import { Modal, Form, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import { handleSearch } from "../actions/postActions";
import { SEARCH_POSTS_RESET } from "../constants/postConstants";

const SearchBox = ({ show, handle }) => {
  const dispatch = useDispatch();
  const { getMostViewsPost } = useSelector((state) => state);
  const { posts } = getMostViewsPost;

  const { searchPost } = useSelector((state) => state);
  const { posts: foundPosts } = searchPost;

  const [searchKeyword, setSearchKeyword] = useState("");

  const debouncedSave = useMemo(
    () =>
      debounce((nextValue) => {
        if (nextValue.length > 0) {
          dispatch(handleSearch(nextValue));
        } else {
          dispatch({ type: SEARCH_POSTS_RESET });
        }
      }, 500),
    [dispatch]
  );
  const handleSearchInput = (val) => {
    setSearchKeyword(val);
    debouncedSave(val);
  };

  return (
    <div>
      <Modal show={show} onHide={() => handle(false)} size="lg">
        <div className="search-container">
          <div className="search-input-area">
            <Form inline className="w-100">
              <Form.Control
                type="text"
                placeholder="Search something..."
                className="w-100 search-input"
                value={searchKeyword}
                autoFocus
                onChange={(e) => {
                  handleSearchInput(e.target.value);
                }}
              />
            </Form>
            <span className="search-box-close" onClick={() => handle(false)}>
              <i className="fa fa-times-circle"></i>
            </span>
          </div>
          {foundPosts.length > 0 && (
            <div className="search-result-area">
              <header className="p-2 pl-3">Search Result</header>
              <ListGroup variant="flush" className="search-scroll-area">
                {foundPosts.map((post) => {
                  return (
                    <ListGroup.Item action key={post._id}>
                      <div className="search-result-list-item p-1">
                        <header className="d-flex justify-content-between">
                          <div>
                            <i className="fas fa-file mr-2 mt-1"></i>
                            {post.name}
                          </div>
                          <div className="search-result-readcount">
                            Read: {post.readCount}
                          </div>
                        </header>
                        <article>{post.description}</article>
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
          )}
          {posts.length > 0 && (
            <div className="search-result-area">
              <header className="p-2 pl-3">Most Viewed Posts</header>
              <ListGroup variant="flush" className="search-scroll-area">
                {posts.map((post) => {
                  return (
                    <ListGroup.Item action key={post._id}>
                      <div className="search-result-list-item p-1">
                        <header className="d-flex justify-content-between">
                          <div>
                            <i className="fas fa-file mr-2 mt-1"></i>
                            {post.name}
                          </div>
                          <div className="search-result-readcount">
                            Read: {post.readCount}
                          </div>
                        </header>
                        <article>{post.description}</article>
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SearchBox;
