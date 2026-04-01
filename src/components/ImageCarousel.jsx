import React from "react";
import Slider from "react-slick";
import { imageData } from "../data/imageData3";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageCarousel() {
  const filenames = imageData.map(item => item.filename);
  const n_images = imageData.length;

  const img_fn = [];
  for (let i = 0; i < 5; i++) {
    img_fn.push(filenames[Math.ceil(Math.random()*n_images)]);
  }
  const img_fname1 = String(img_fn[0]);
  const img_fname2 = String(img_fn[1]);
  const img_fname3 = String(img_fn[2]);
  const img_fname4 = String(img_fn[3]);
  const img_fname5 = String(img_fn[4]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <Slider {...settings}>
        <div>
          <img src={`/public/newimages/${img_fname1}`} width="100%" />
        </div>
        <div>
          <img src={`/public/newimages/${img_fname2}`} width="100%" />
        </div>
        <div>
          <img src={`/public/newimages/${img_fname3}`} width="100%" />
        </div>
        <div>
          <img src={`/public/newimages/${img_fname4}`} width="100%" />
        </div>
        <div>
          <img src={`/public/newimages/${img_fname5}`} width="100%" />
        </div>
      </Slider>
    </div>
  );
}

export default ImageCarousel;