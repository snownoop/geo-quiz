import React from 'react';
import classNames from 'classnames';

class Answer extends React.Component {
  handleClick() {
    this.props.onAnswerClick(this.props.item.capital);
  }

  render() {
    let answerClass = classNames({
      'answer-wrapper': true,
      'answer-correct': this.props.showCorrect && this.props.isCorrect,
      'complete': this.props.showCorrect,
      'help-on': this.props.helpOn && !this.props.isCorrect
    });
    return (
      <li className={answerClass} onClick={this.handleClick.bind(this)}>
        <h3>{this.props.item.capital}</h3>
      </li>
    );
  }
}

Answer.propTypes = {
    item: React.PropTypes.object.isRequired,
    onAnswerClick: React.PropTypes.func.isRequired,
    showCorrect: React.PropTypes.bool.isRequired,
    isCorrect: React.PropTypes.bool.isRequired,
    helpOn: React.PropTypes.bool.isRequired
};

export default Answer;
