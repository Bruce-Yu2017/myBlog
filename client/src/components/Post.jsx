import React from "react";
import { Card, Row, Col, Badge, Image, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";
import { setThumbup } from "../actions/postActions";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const handleThumbUp = (id) => {
    dispatch(setThumbup(id));
  };

  const { userAuth } = useSelector((state) => state);
  const { userInfo } = userAuth;

  return (
    <div>
      <Card style={{ width: "100%" }} className="mb-2">
        <Card.Body>
          <Row>
            <Col md={10}>
              <Card.Subtitle className="mb-2 text-muted">
                Post by <strong>{post.user.name}</strong>{" "}
                {moment(post.createdAt).fromNow()}{" "}
                {post.tags.length > 0 &&
                  post.tags.map((tag, index) => (
                    <LinkContainer to={`/tag/${tag}`} key={`${tag}${index}`}>
                      <Badge
                        variant="success"
                        pill
                        className="ml-2 cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    </LinkContainer>
                  ))}
              </Card.Subtitle>
              <LinkContainer to={`/post/${post._id}`}>
                <Card.Title className="cursor-pointer">{post.name}</Card.Title>
              </LinkContainer>
              <Card.Text className="text-muted">{post.description}</Card.Text>
              <Button
                className={`btn-sm thumb-up-btn ${
                  userInfo &&
                  userInfo.thumbUpPosts &&
                  userInfo.thumbUpPosts[post._id]
                    ? "thumb-up-btn-active"
                    : "thumb-up-btn-normal"
                }`}
                onClick={() => handleThumbUp(post._id)}
              >
                <i className="fas fa-thumbs-up mr-1"></i>
                {post.thumpUpCount}
              </Button>
            </Col>
            <Col md={2} className="text-right">
              <Image
                src={`https://source.unsplash.com/80x80/?${post.name}`}
                fluid
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Post;
