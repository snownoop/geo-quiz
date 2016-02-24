import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="quiz-header">
        <h4>Correct: {this.props.correctAnswersCounter} / {this.props.answersCounter}</h4>
      </div>
    );
  }
}

Footer.propTypes = {
  correctAnswersCounter: React.PropTypes.number.isRequired,
  answersCounter: React.PropTypes.number.isRequired
};

export default Footer;

