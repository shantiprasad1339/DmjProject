import React from 'react';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      translateValue: 0,
    };
  }

  goToPrevSlide = () => {
    if (this.state.activeIndex === 0) {
      return;
    }

    this.setState((prevState) => ({
      activeIndex: prevState.activeIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth(),
    }));
  }

  goToNextSlide = () => {
    if (this.state.activeIndex === this.props.slides.length - 1) {
      return this.setState({
        activeIndex: 0,
        translateValue: 0,
      });
    }

    this.setState((prevState) => ({
      activeIndex: prevState.activeIndex + 1,
      translateValue: prevState.translateValue - this.slideWidth(),
    }));
  }

  slideWidth = () => {
    return this.slideRef.clientWidth;
  }

  render() {
    return (
      <div className="carousel-container">
        <div className="carousel-wrapper" style={{
          transform: `translateX(${this.state.translateValue}px)`,
          transition: 'transform ease-out 0.45s'
        }}>
          {this.props.slides.map((slide, index) =>
            <div className="carousel-slide" ref={el => this.slideRef = el} key={index}>
              {slide}
            </div>
          )}
        </div>
        <button className="carousel-control prev" onClick={this.goToPrevSlide}>
          &lsaquo;
        </button>
        <button className="carousel-control next" onClick={this.goToNextSlide}>
          &rsaquo;
        </button>
      </div>
    );
  }
}

export default Carousel;