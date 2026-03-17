import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageCarousel() {

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
          <img src="/public/newimages/00016.jpg" width="100%" />
        </div>
        <div>
          <img src="/public/newimages/00063.jpg" width="100%" />
        </div>
        <div>
          <img src="/public/newimages/00134.jpg" width="100%" />
        </div>
        <div>
          <img src="/public/newimages/00262.jpg" width="100%" />
        </div>
      </Slider>
    </div>
  );
}

export default ImageCarousel;