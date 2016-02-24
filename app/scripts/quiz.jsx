import React from 'react';
import config from './config';
import store from './store';
import classNames from 'classnames';

// default layout imports
import PageHeader from './partials/header.jsx';
import PageFooter from './partials/footer.jsx';
//components
import Answer from './answer.jsx';

const initialState = {
  currentItem: {},
  items: [],
  country: '',
  answersCounter: 0,
  correctAnswersCounter: 0,
  wrongAnswersCounter: 0,
  showCorrect: false,
  helpOn: false
};

class Quiz extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentWillMount() {
    this.setState(this.createTest());
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.answersCounter === 5) {
      alert('You made ' + nextState.correctAnswersCounter + ' correct and ' + nextState.wrongAnswersCounter + ' wrong answers.');
      this.resetGame();
    }
  }

  createTest() {
    //removing all items that don't have capital:
    let data = store.data.filter(function(item) {
      return item.capital;
    });
    let items = _.shuffle(data).splice(0, 6);
    let currentItem = items[_.random(items.length-1)];
    return {
      items: items,
      currentItem: currentItem,
      country: currentItem.name.common
    };
  }

  resetGame() {
    this.setState({
      answersCounter: 0,
      correctAnswersCounter: 0,
      wrongAnswersCounter: 0,
      showCorrect: false,
      helpOn: false
    });
  }

  hadnleAnswerSelected(capital) {
    if(this.state.currentItem.capital === capital) {
      this.setState(function(state) {
        return {correctAnswersCounter: state.correctAnswersCounter + 1};
      });
    } else {
      this.setState(function(state) {
        return {wrongAnswersCounter: state.wrongAnswersCounter + 1};
      });
    }
    this.setState(function(state) {
      return {answersCounter: state.answersCounter + 1};
    });
    this.setState({showCorrect: true});
  }

  handleNextTestClick() {
    this.setState({
      showCorrect: false
    });
    this.setState(this.createTest);
  }

  handleHelpOnClick() {
    this.setState({
      helpOn: true
    });
  }

  createRandomIndexes(arr) {
    let rand = _.random(0, 5);
    if(_.indexOf(arr, rand) === -1 && rand != _.findIndex(this.state.items, this.state.currentItem)) {
      arr.push(rand);
    } else {
      this.createRandomIndexes(arr);
    }
  }

  render() {
    let btnHelpOnClass = classNames({
      'btn btn-default': true,
      'disabled': this.state.helpOn
    });

    let btnNextTextClass = classNames({
      'btn btn-default col-md-offset-1': true,
      'disabled': !this.state.showCorrect
    });

    //generate 3 random indexes for help on:
    let helpOnIndexes = [];
    if(this.state.helpOn) {
      for(let i=0; i < 3; i++) {
        this.createRandomIndexes(helpOnIndexes);
      }
    };
    return (
      <div className="quiz-wrapper">
        <PageHeader correctAnswersCounter={this.state.correctAnswersCounter}/>

        <div className="row country-wrapper">
          <div className="country col-md-offset-1">
            <h3>What is the capital of <u>{this.state.country}</u> ?</h3>
          </div>
        </div>
        <div className="row answers-wrapper">
          <ul className="answers col-md-offset-1">
            {this.state.items.map((item, index) => {
              return <Answer
                onAnswerClick={this.hadnleAnswerSelected.bind(this)}
                item={item}
                showCorrect={this.state.showCorrect}
                helpOn={_.indexOf(helpOnIndexes, index) != -1 }
                isCorrect={item.capital === this.state.currentItem.capital}
              />;
            })}
          </ul>
        </div>
        <div className={btnNextTextClass} onClick={this.handleNextTestClick.bind(this)}>Next test</div>
        <div className={btnHelpOnClass} onClick={this.handleHelpOnClick.bind(this)}>Help me !</div>
        <PageFooter correctAnswersCounter={this.state.correctAnswersCounter} answersCounter={this.state.answersCounter} />
      </div>
    );
  }
}

export default Quiz;
