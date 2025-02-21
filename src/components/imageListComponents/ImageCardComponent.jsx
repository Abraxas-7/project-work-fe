import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./ImageCardComponent.module.css";

function ImageCardComponent({ image }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Valore di default
    swipeToSlide: true,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200, // XL: max-width 1200px
        settings: {
          slidesToShow: 5, // Mostra 5 card
        },
      },
      {
        breakpoint: 992, // LG: max-width 992px
        settings: {
          slidesToShow: 4, // Mostra 4 card
        },
      },
      {
        breakpoint: 768, // MD: max-width 768px
        settings: {
          slidesToShow: 3, // Mostra 3 card
        },
      },
      {
        breakpoint: 576, // SM: max-width 576px
        settings: {
          slidesToShow: 3, // Mostra 3 card
        },
      },
    ],
  };

  console.log("Immagini", image);

  if (!Array.isArray(image)) {
    return (
      <div key={image} className={`${style.imageContainer}`}>
        <img src={`http://localhost:3000/${image}`} alt="Immagine" />
      </div>
    );
  } else if (image.length === 2) {
    return (
      <>
        {image.map((image) => (
          <div key={image} className={`${style.imageContainer}`}>
            <img src={`http://localhost:3000/${image}`} alt="Immagine" />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="row g-3 d-flex justify-content-center py-3">
      <div className="col-12">
        <Slider {...settings}>
          {image.map((image) => (
            <div key={image} className={`${style.imageSliderContainer}`}>
              <img
                src={`http://localhost:3000/${image}`}
                alt={`Immagine`}
                className="d-block w-100"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ImageCardComponent;
