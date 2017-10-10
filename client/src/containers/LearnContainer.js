import React from 'react';
import { container, header, link, source } from './styles/learn.css';

const LearnContainer = () => {
  const watch = <a className={link} href="https://www.youtube.com/watch?v=XP8R0yzAbdo">watch this talk</a>;
  const sourceCode = <a className={link} href="https://github.com/ptrkkim/Genetic-Gallery">source code!</a>;
  return (
    <div className={container}>
      <h2 className={header}>Under Construction</h2>
      <section>
        For now, you can {watch} I gave for a primer on genetic algorithms.
      </section>
      <section className={source}>
        You can also check out the {sourceCode}
      </section>
    </div>
  );
};

export default LearnContainer;
