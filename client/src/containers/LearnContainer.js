import React from 'react';
import { container, header, link } from './styles/learn.css';

const LearnContainer = () => {
  const watch = <a className={link} href="https://www.youtube.com/watch?v=XP8R0yzAbdo">watch this talk</a>;
  return (
    <div className={container}>
      <h2 className={header}>Under Construction</h2>
      <section>
        For now, you can {watch} I gave for a primer on genetic algorithms.
      </section>
    </div>
  );
};

export default LearnContainer;
