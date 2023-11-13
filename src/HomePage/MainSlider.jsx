import React from "react";

// MainSlider.jsx
import Slider from "react-slick";

const MainSlider = ({ settings, slides }) => (
  <Slider {...settings}>
    {slides.map((slide, index) => (
      <div key={index}>
        <img src={slide.src} alt={slide.alt} className="responsive-image" />
      </div>
    ))}
  </Slider>
);

export default MainSlider;
