const img1 = {
  src: "https://atletjaime-images.s3.eu-central-1.amazonaws.com/slide1.avif",
  fallback:
    "https://atletjaime-images.s3.eu-central-1.amazonaws.com/slide1.jpg",
  alt: "Image1",
};

const img2 = {
  src: "https://atletjaime-images.s3.eu-central-1.amazonaws.com/slide2.avif",
  fallback:
    "https://atletjaime-images.s3.eu-central-1.amazonaws.com/slide2.jpg",
  alt: "Image1",
};

const img3 = {
  src: "https://atletjaime-images.s3.eu-central-1.amazonaws.com/slide3.avif",
  fallback:
    "https://atletjaime-images.s3.eu-central-1.amazonaws.com/slide3.jpg",
  alt: "Image1",
};

const mainSliderImages = [
  { src: img1.src, fallback: img1.fallback, alt: img1.alt },
  { src: img2.src, fallback: img2.fallback, alt: img2.alt },
  { src: img3.src, fallback: img3.fallback, alt: img3.alt },
];

export default mainSliderImages;
