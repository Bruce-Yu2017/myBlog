import React, { useEffect, useCallback, useMemo, useState } from "react";
import { Card, Badge, Image, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getPost, setReplyOrComment } from "../actions/postActions";
import { Link, useLocation } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import ReplyCommentForm from "./ReplyCommentForm";
import { GET_POST_DETAIL_RESET } from "../constants/postConstants";
import { Editable, withReact, Slate } from "slate-react";
import { createEditor } from "slate";
import { Element, Leaf } from "./richTextEditor/HelperComponents";
import moment from "moment";
import { logout } from "../actions/userActions";

const PostDetail = ({ match, history }) => {
  const postId = match.params.id;
  const dispatch = useDispatch();
  const location = useLocation();
  const { postDetail } = useSelector((state) => state);
  const { loading, post, error } = postDetail;

  const { userAuth } = useSelector((state) => state);
  const { userInfo } = userAuth;

  const { replyOrComment } = useSelector((state) => state);
  const { error: replyCommentError } = replyOrComment;

  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const loginpage = () => {
      history.push("/login");
    };
    if (replyCommentError) {
      dispatch(logout(loginpage));
    }
  }, [dispatch, history, replyCommentError]);

  useEffect(() => {
    if (post && post._id !== postId) {
      dispatch({ type: GET_POST_DETAIL_RESET });
    }
    if (!post || post._id !== postId) {
      dispatch(getPost(postId));
    }
    if (location.hash && !rendered) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (post) {
      setRendered(true);
    }
  }, [dispatch, postId, post, location, rendered]);

  const [openedComment, setOpenComment] = useState(null);
  const [openedTargetComment, setOpenTargetComment] = useState(null);

  const toggleCommentForReply = (index) => {
    openedComment === null
      ? setOpenComment(index)
      : openedComment === index
      ? setOpenComment(null)
      : setOpenComment(index);
  };

  const toggleCommentForTargetComment = (index) => {
    openedTargetComment === null
      ? setOpenTargetComment(index)
      : openedTargetComment === index
      ? setOpenTargetComment(null)
      : setOpenTargetComment(index);
  };

  const handleReply = (val) => {
    const data = {
      type: "reply",
      content: val,
    };
    dispatch(setReplyOrComment(data, post._id));
  };
  const handleComment = (val, replyId) => {
    const data = {
      type: "comment",
      content: val,
      replyId,
    };
    dispatch(setReplyOrComment(data, post._id));
  };
  const handleTargetComment = (val, replyId, targetCommentId) => {
    const data = {
      type: "targetComment",
      content: val,
      replyId,
      targetCommentId,
    };
    dispatch(setReplyOrComment(data, post._id));
  };

  return (
    <div className="wrapper">
      <Container>
        <Link to="/" className="btn btn-light my-3">
          <i className="fas fa-arrow-left mr-1"></i>Go Back
        </Link>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {post && (
          <>
            <Card style={{ width: "100%" }} className="mb-1 mt-2">
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted small">
                  <div className="mb-2 p-2 author-info-block">
                    <Image
                      src={`https://avatars.dicebear.com/4.5/api/human/${post.user.name}.svg`}
                      fluid
                      className="user-thumbnail mr-2"
                    />
                    <div className="author-info-box">
                      <div className="user-name">{post.user.name}</div>
                      <div>
                        <i className="far fa-calendar-alt mr-1"></i>
                        {new Date(post.createdAt).toLocaleDateString()}{" "}
                        {post.tags.length > 0 &&
                          post.tags.map((tag, index) => (
                            <Badge
                              variant="success"
                              pill
                              className="ml-2"
                              key={`${tag}${index}`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        <span className="ml-2">Read: {post.readCount}</span>
                      </div>
                    </div>
                  </div>
                </Card.Subtitle>
                <Card.Title as="h1">{post.name}</Card.Title>
                <Card.Text className="small text-info">
                  {post.description}
                </Card.Text>
                <div className="bg-white min-height-300 p-1">
                  <Slate editor={editor} value={JSON.parse(post.content)}>
                    <Editable
                      readOnly
                      renderElement={renderElement}
                      renderLeaf={renderLeaf}
                    />
                  </Slate>
                </div>
              </Card.Body>
            </Card>
            <div className="reply-list-box">
              {userInfo && (
                <div className="reply-form-box">
                  <div className="avatar-box">
                    <Image
                      src={`https://avatars.dicebear.com/4.5/api/human/${userInfo.name}.svg`}
                      fluid
                      className="user-thumbnail mr-2 small-thumbnail"
                    />
                  </div>
                  <ReplyCommentForm
                    replyTo={userInfo.name}
                    handleFormData={(val) => {
                      handleReply(val, "reply", post._id);
                    }}
                  />
                </div>
              )}
              <div className="reply-list" id="replyArea">
                {post.replies.length > 0 &&
                  post.replies.map((reply, index) => (
                    <div className="reply-item" key={reply._id}>
                      <>
                        <div className="avatar-box">
                          <Image
                            src={`https://avatars.dicebear.com/4.5/api/human/${reply.author.name}.svg`}
                            fluid
                            className="user-thumbnail mr-2 small-thumbnail"
                          />
                        </div>
                        <div className="reply-content-box">
                          <div className="reply-author-meta">
                            {reply.author.name}
                            {`${
                              reply &&
                              userInfo &&
                              userInfo.name === reply.author.name
                                ? " (You)"
                                : ""
                            }`}
                          </div>
                          <div className="reply-content">{reply.content}</div>
                          <div className="reply-stat">
                            <div className="reply-time small">
                              {moment(reply.createdAt).fromNow()}
                            </div>
                            <div className="reply-action">
                              <div
                                className="commentBtn cursor-pointer"
                                onClick={() => toggleCommentForReply(index)}
                              >
                                <i className="far fa-comment-dots mr-1"></i>
                              </div>
                            </div>
                          </div>
                          {openedComment !== null && openedComment === index && (
                            <ReplyCommentForm
                              replyTo={reply.author.name}
                              handleFormData={(val) => {
                                handleComment(val, reply._id);
                              }}
                            />
                          )}
                          <div className="comment-list">
                            {reply.comments.length > 0 &&
                              reply.comments.map((comment, index) => (
                                <div className="reply-item" key={comment._id}>
                                  <div className="avatar-box">
                                    <Image
                                      src={`https://avatars.dicebear.com/4.5/api/human/${comment.author.name}.svg`}
                                      fluid
                                      className="user-thumbnail mr-2 small-thumbnail"
                                    />
                                  </div>
                                  <div className="reply-content-box">
                                    <div className="reply-author-meta">
                                      @{comment.author.name}
                                      {`${
                                        userInfo &&
                                        userInfo.name === comment.author.name
                                          ? " (You)"
                                          : ""
                                      }`}{" "}
                                      {comment.targetComment && (
                                        <>
                                          <span className="replied ml-2 mr-2">
                                            replied
                                          </span>
                                          <span>
                                            @{comment.targetComment.author.name}
                                          </span>
                                        </>
                                      )}
                                      {`${
                                        comment.targetComment &&
                                        userInfo &&
                                        userInfo.name ===
                                          comment.targetComment.author.name
                                          ? " (You)"
                                          : ""
                                      }`}
                                    </div>
                                    <div className="reply-content">
                                      {comment.content}
                                    </div>
                                    <div className="reply-stat">
                                      <div className="reply-time small">
                                        {moment(comment.createdAt).fromNow()}
                                      </div>
                                      <div className="reply-action">
                                        <div
                                          className="commentBtn cursor-pointer"
                                          onClick={() =>
                                            toggleCommentForTargetComment(index)
                                          }
                                        >
                                          <i className="far fa-comment-dots mr-1"></i>
                                        </div>
                                      </div>
                                    </div>
                                    {openedTargetComment !== null &&
                                      openedTargetComment === index && (
                                        <ReplyCommentForm
                                          replyTo={comment.author.name}
                                          handleFormData={(val) => {
                                            handleTargetComment(
                                              val,
                                              reply._id,
                                              comment._id
                                            );
                                          }}
                                        />
                                      )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default PostDetail;
