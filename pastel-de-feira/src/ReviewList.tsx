import React from 'react';
import { Review } from './types';
import './ReviewList.css'; // Import your stylesheet

interface ReviewListProps {
  reviews: Review[];
  onDelete: (title: string) => void;
  onEdit: (review: Review) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onDelete, onEdit }) => (
  <ul className="review-list">
    {reviews.map((review) => (
      <li key={review.id} className="review-item">
        <div className="review-details">
          <h3>{review.title}</h3>
          <p>{review.description}</p>
          <p>
            <strong>Author:</strong> {review.author} | <strong>Product:</strong> {review.product}
          </p>
        </div>
        <div className="review-actions">
          <button onClick={() => onEdit(review)}>Editar</button>
          <button onClick={() => onDelete(review.title)}>Excluir</button>
        </div>
      </li>
    ))}
  </ul>
);

export default ReviewList;
