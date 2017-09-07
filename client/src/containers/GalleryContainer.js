import React, { Component } from 'react';
import GalleryCard from '../components/GalleryCard';
import { container } from './styles/gallery.css';

export default class GalleryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePairs: [],
    };
  }

  componentDidMount() {
    fetch('/api/images')
      .then(response => response.json())
      .then((foundPairs) => {
        const imagePairs = foundPairs.map(pair => ({
          id: pair.id,
          title: pair.title,
          artist: pair.artist,
          artImg: pair.artImg,
          originalImg: pair.originalImg,
        }));

        this.setState({ imagePairs });
      });
  }

  render () {
    const cards = this.state.imagePairs.map(pair => (
      <GalleryCard
        key={pair.id}
        originalSrc={pair.originalImg}
        artSrc={pair.artImg}
      />
    ));

    return (
      <div className={container}>
        {cards}
      </div>
    );
  }
}
