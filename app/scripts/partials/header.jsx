import React from 'react';

class Header extends React.Component {

  render() {
    let imageSrc = 'sad';
    if(this.props.correctAnswersCounter >= 2) {
      if(this.props.correctAnswersCounter >= 4) {
        imageSrc = 'happy';
      } else {
        imageSrc = 'normal';
      }
    }

    return (
      <div className="quiz-header jumbotron">
        <div className="container">
          <h1>Geo Quiz</h1>
          <p>Choose a capital of the country provided.</p>
          <img className="image-status" src={"images/" + imageSrc + ".png"} />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  correctAnswersCounter: React.PropTypes.number.isRequired
};

export default Header;

