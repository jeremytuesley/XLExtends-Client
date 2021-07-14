import React, { useEffect } from 'react';
import canvas from '../components/Canvas';
import '../assets/home.scss';

const Home = () => {
  useEffect(() => {
    canvas();
  }, []);

  return (
    <div className="home">
      <canvas id="canvas"></canvas>
      <div className="title">
        <h1>Hey There</h1>
        <p>Lashes - Events - Arts</p>
      </div>
    </div>
  );
};

export default Home;
