import React, { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const rate = 5;

  return (
    <div className="star-rating">
      {[...Array(rate)].map((_star, index) => {
        index += 1;
        function handleClick() {
          setRating(index);
          localStorage.setItem('ratings', JSON.stringify(index));
        }
        return (

          <button
            id="rate-btn"
            type="button"
            key={ index }
            className={ index <= (rating) ? 'rate-btn on' : 'rate-btn off' }
            onClick={ handleClick }
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
