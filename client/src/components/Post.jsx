import React from "react";
import { Card, Row, Col, Badge, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";

const Post = ({ post }) => {
  return (
    <div>
      <Card style={{ width: "100%" }} className="mb-2">
        <Card.Body>
          <Row>
            <Col md={10}>
              <Card.Subtitle className="mb-2 text-muted small">
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
              <Card.Text>{post.description}</Card.Text>
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
