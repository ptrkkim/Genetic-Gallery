import React, { Component } from 'react';

export default function withInfinite (WrappedComponent) {
  return class WithInfinite extends Component {
    componentDidMount() {
      window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = () => {
      const { loadMore, loadArgs, isLoading, hasMore } = this.props; // eslint-disable-line
      const atBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500);
      if (atBottom && !isLoading && hasMore) loadMore(...loadArgs);
    }

    render () {
      return <WrappedComponent {...this.props} />;
    }
  };
}

