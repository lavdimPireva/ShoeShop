import React from "react";

// MainSlider.jsx
import Slider from "react-slick";

const MainSlider = ({ settings, slides }) => (
  <Slider {...settings}>
    {slides.map((slide, index) => (
      <div key={index}>
        <img
          src={slide.src}
          alt={slide.alt}
          className="responsive-image"
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop if fallback also fails
            e.target.src = slide.fallback; // Use the fallback image URL
          }}
        />
      </div>
    ))}
  </Slider>
);

export default MainSlider;
