import React from "react";

import Reviews from './Reviews';

const reviewArea = (props) => {
  const messages = props.data && props.data.map((message, index) => {
    return <Reviews key={index} name={message.name} reviews={message.comments}/>;
  });

  return messages || <div></div>;
};

export default reviewArea ;