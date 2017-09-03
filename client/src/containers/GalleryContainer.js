import React, { Component } from 'react';
import GalleryCard from '../components/GalleryCard';

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
        console.log('images from fetch', foundPairs);
        const imagePairs = foundPairs.map(pair => ({
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
        originalSrc={pair.originalImg}
        artSrc={pair.artImg}
      />
    ));

    return (
      <div>
        {cards}
      </div>
    );
  }
}
