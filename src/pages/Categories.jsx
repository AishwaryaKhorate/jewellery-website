import { useEffect, useRef, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import CategoryDetail from './CategoryDetail';

function Categories({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const sliderRef = useRef(null);
  // Flag to prevent the scroll event from triggering while we are animating programmatically
  const isScrollingProgrammatically = useRef(false);

  const visibleCategories = categories.filter((category) => category.images?.length > 0);
  const activeCategory = visibleCategories.find((category) => category.id === selectedCategory);
  const slideCount = visibleCategories.length;

  // Auto-advance logic
  useEffect(() => {
    if (!slideCount || isPaused) return undefined;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [slideCount, isPaused, activeIndex]);

  // Helper to perform the scroll
  const scrollToIndex = (index) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const children = Array.from(container.children);
    const activeCard = children[index];

    if (activeCard) {
      isScrollingProgrammatically.current = true;
      
      const newScrollLeft =
        activeCard.offsetLeft - container.clientWidth / 2 + activeCard.clientWidth / 2;

      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });

      // Reset the flag after the smooth scroll finishes (roughly 600ms)
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 600);
    }
  };

  // Listen for activeIndex changes to move the slider
  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex]);

  const handleScroll = () => {
  // If the timer or arrow is moving the slider, STOP here.
  // This prevents the "Infinite Loop" that breaks your scrolling.
  if (isScrollingProgrammatically.current || !sliderRef.current) return;

  const slider = sliderRef.current;
  const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
  const children = Array.from(slider.children);
  
  let closestIndex = activeIndex;
  let closestDistance = Infinity;

  children.forEach((child, index) => {
    const childCenter = child.offsetLeft + child.clientWidth / 2;
    const distance = Math.abs(childCenter - sliderCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  // Only update if we actually landed on a new card
  if (closestIndex !== activeIndex) {
    setActiveIndex(closestIndex);
  }
};

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  };

  if (activeCategory) {
    return <CategoryDetail category={activeCategory} onBack={() => setSelectedCategory(null)} />;
  }

  return (
    <section className="section-layout">
      <h2>Jewellery Categories</h2>
      <div className="category-slider-header">
        <p className="slider-note">Swipe or use arrows to explore.</p>
        <div className="slider-controls">
          <button type="button" className="slider-btn" onClick={handlePrev}>‹</button>
          <button type="button" className="slider-btn" onClick={handleNext}>›</button>
        </div>
      </div>

      <div
        className="category-slider"
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {visibleCategories.map((category, index) => (
          <div
            key={category.id}
            className={`slider-item ${
              index === activeIndex ? 'active' : 
              (index === (activeIndex + 1) % slideCount || index === (activeIndex - 1 + slideCount) % slideCount) 
              ? 'adjacent' : 'inactive'
            }`}
          >
            <CategoryCard category={category} onSelect={setSelectedCategory} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
