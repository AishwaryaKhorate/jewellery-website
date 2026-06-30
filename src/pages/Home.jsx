import { useState, useEffect } from 'react';

function Home({ onNavigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Add your featured image paths here
  const slides = [
    { url: "/rings/r9.png", label: "Premium Rings" },
    { url: "/necklace/n9.png", label: "Elegant Necklaces" },
    { url: "/bangles/ba1.png", label: "Luxury Bangles" },
    { url: "/earrings/e2.png", label: "Sparkling Earrings" },
    { url: "/Bracelets/b8.png", label: "Classic Bracelets" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Changes image every 4 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="eyebrow">Luxury Jewellery Showcase</p>
        <h1>Discover sparkling rings, necklaces, earrings and bangles.</h1>
        <p className="hero-copy">
          Browse a curated exhibition of designs that blend classic craftsmanship with modern elegance.
        </p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={() => onNavigate('categories')}>
            View Categories
          </button>
          <button className="secondary-btn" onClick={() => onNavigate('contact')}>
            Book a Visit
          </button>
        </div>
      </div>

      <div className="hero-preview">
        <div className="preview-card hero-slider">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`slide-item ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={slide.url} alt={slide.label} />
              <div className="preview-label">{slide.label}</div>
            </div>
          ))}
          
          {/* Optional: Slide Dots */}
          <div className="slider-dots">
            {slides.map((_, i) => (
              <span 
                key={i} 
                className={`dot ${i === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;