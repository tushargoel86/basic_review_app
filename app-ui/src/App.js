import React, { useState, useEffect, useCallback } from "react";
import ReviewForm from "./components/ReviewForm";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewArea from "./components/ReviewArea";

import { FETCH_REVIEWS_URL, ADD_REVIEW_URL } from "./config/constants";

import { Row, Container } from "react-bootstrap";

const App = (props) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(FETCH_REVIEWS_URL, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "sec-fetch-mode": "no-cors",
      },
    })
      .then((res) => res.json())
      .then((reviews) => setReviews(reviews.data))
      .catch((err) => console.log(err));
  }, []);

  const handleReviewAddition = useCallback((review) => {
    fetch(ADD_REVIEW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "sec-fetch-mode": "no-cors",
      },
      body: JSON.stringify(review),
    })
      .then((res) => {
        if (res.status !== 200) {
          var origReviews = [...reviews];
          origReviews.shift();
          setReviews(origReviews);
          throw new Error(res.message);
        }
        res.json();
      })
      .then(res => alert('added successfully'))
      .catch(alert);
  });

  const addReview = (review) => {
    var origReviews = [...reviews];
    origReviews.unshift(review);
    handleReviewAddition(review);
    setReviews(origReviews);
  };

  return (
    <div className="rowC">
      <Container fluid className="mt-2">
        <Row className="justify-content-center p-2">
          <ReviewForm data={reviews} addReview={addReview} />
        </Row>
        <h2>
          <span>reviews</span>
        </h2>
        <hr />
        {reviews.length !== 0 && <ReviewArea data={reviews} />}
      </Container>
    </div>
  );
};

export default App;
