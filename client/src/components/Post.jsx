import React from "react";
import { Card, Row, Col, Badge, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Post = ({ post }) => {
  return (
    <div className="cursor-pointer">
      <LinkContainer to={`/post/${post._id}`}>
        <Card style={{ width: "100%" }} className="mb-2">
          <Card.Body>
            <Row>
              <Col md={10}>
                <Card.Subtitle className="mb-2 text-muted small">
                  Post by <strong>{post.user.name}</strong> at{" "}
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
                </Card.Subtitle>
                <Card.Title>{post.name}</Card.Title>
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
      </LinkContainer>
    </div>
  );
};

export default Post;
