import React from "react";

import { Col } from "react-bootstrap";

const Reviews = (props) => {
  return (
    <Col>
      <h2 className="text-left">{props.name} says...</h2>
      <h4 className="p-2"> {props.reviews}</h4>
      <hr />
    </Col>
  );
};

export default Reviews;
