import React from "react";

import ImageCardComponent from "./imageCardComponent.jsx";

function ImageListComponent({ images }) {
  console.log("Il tuo array di immagini:", images);

  const largeImage = images[0];
  const mediumImage = images.slice(1, 3);
  const smallImage = images.slice(3);

  console.log("Immagine grande:", largeImage);
  console.log("Immagini medie:", mediumImage);
  console.log("Immagini piccole:", smallImage);

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center  g-3">
        <div className="col-lg-6 col-8">
          <ImageCardComponent image={largeImage} />
        </div>
        <div className="col-lg-3 col-4 d-flex flex-column justify-content-between">
          <ImageCardComponent image={mediumImage} />
        </div>
      </div>
      <ImageCardComponent image={smallImage} />
    </div>
  );
}

export default ImageListComponent;
