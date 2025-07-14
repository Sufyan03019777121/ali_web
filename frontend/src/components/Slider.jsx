import React from 'react';
import { Carousel } from 'react-bootstrap';
import gold_imag from '../imags/gold_imag.jpeg';
import silver_image from '../imags/silver_image.jpeg';
import dollar_imag from '../imags/dollar_imag.jpeg';

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 mb-5"
          src={gold_imag}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Gold</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 mb-5"
          src={silver_image}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Silver</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 mb-5"
          src={dollar_imag}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Dollar</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
