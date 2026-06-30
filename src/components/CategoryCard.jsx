import { useState } from 'react';

function CategoryCard({ category, onSelect, className = '' }) {
  const [hovered, setHovered] = useState(false);
  const hasImages = category.images && category.images.length > 0;
  const previewImage = hasImages ? category.images[0].src : null;

  return (
    <button
      type="button"
      className={`category-card ${hovered ? 'card-hovered' : ''} ${className}`}
      onClick={() => onSelect(category.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {previewImage ? (
        <img
          src={previewImage}
          alt={category.title}
          className="category-image"
        />
      ) : (
        <div className="empty-card">Images coming soon</div>
      )}
      <div className="category-overlay">
        <h3>{category.title}</h3>
        <p>{category.description}</p>
      </div>
    </button>
  );
}

export default CategoryCard;
