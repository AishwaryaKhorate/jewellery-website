import { useState } from 'react';

function CategoryDetail({ category, onBack }) {
  const [flippedItems, setFlippedItems] = useState({});

  const toggleFlip = (index) => {
    setFlippedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="section-layout">
      <button type="button" className="secondary-btn back-button" onClick={onBack}>
        Back to categories
      </button>
      <h2>{category.title} Collection</h2>
      <p className="section-copy">{category.fullDescription}</p>
      <div className="detail-images">
        {category.images.map((item, index) => {
          const isFlipped = flippedItems[index];
          return (
            <button
              key={index}
              type="button"
              className={`detail-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => toggleFlip(index)}
            >
              <div className="detail-card-inner">
                <div className="detail-card-face detail-card-front">
                  <img src={item.src} alt={item.name} />
                  <div className="detail-caption">
                    <strong>{item.name}</strong>
                    <span>{category.title}</span>
                  </div>
                </div>

                <div className="detail-card-face detail-card-back">
                  <div className="detail-back-content">
                    <h3>{item.name}</h3>
                    <p>{category.description}</p>
                    <p>Category: {category.title}</p>
                    <span>Tap again to flip back</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryDetail;
