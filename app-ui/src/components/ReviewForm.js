import React, { useState } from "react";

import { Form, Col, Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ReviewForm = (props) => {
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (event) => {
    console.log(name, comments);
    event.preventDefault();
    props.addReview({name, comments});
    setName("");
    setComments("");
  };

  return (
    <Card border="primary" style={{ width: "30%" }}>
      <Card.Header className="justify-content-center">Add Reviews</Card.Header>
      <Card.Body className="text-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Col md={2}>
              <Form.Label>Name: </Form.Label>
            </Col>
            <Col>
              <Form.Control
                required
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group>
            <Col md={2}>
              <Form.Label>Review: </Form.Label>
            </Col>
            <Col>
              <Form.Control
                required
                as="textarea"
                rows="3"
                name="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

ReviewForm.propTypes = {
    name: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired
};

export default ReviewForm;
