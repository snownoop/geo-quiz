import React from "react";
import config from "./config";
import store from "./store";
import classNames from "classnames";

// default layout imports
import PageHeader from "./partials/header.jsx";
import PageFooter from "./partials/footer.jsx";
//components
import Answer from "./answer.jsx";

const initialState = {
  currentItem: {},
  items: [],
  country: "",
  answersCounter: 0,
  correctAnswersCounter: 0,
  wrongAnswersCounter: 0,
  showCorrect: false,
  helpOn: false,
  disabledHelpButton: false,
  answerSelected: false
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
    if (nextState.answersCounter === 5) {
      alert(
        "You made " +
          nextState.correctAnswersCounter +
          " correct and " +
          nextState.wrongAnswersCounter +
          " wrong answers."
      );
      this.resetGame();
    }
  }

  createTest() {
    //removing all items that don't have capital:
    let data = store.data.filter(function(item) {
      return (
        Array.isArray(item.capital) &&
        item.capital.length === 1 &&
        item.capital[0]
      );
    });
    let items = _.shuffle(data).splice(0, 6);
    let currentItem = items[_.random(items.length - 1)];
    return {
      items: items,
      currentItem: currentItem,
      country: currentItem.name.common,
      helpOn: false,
      disabledHelpButton: false,
      answerSelected: false
    };
  }

  resetGame() {
    this.setState(Object.assign(initialState, this.createTest()));
  }

  hadnleAnswerSelected(capital) {
    const {
      correctAnswersCounter,
      wrongAnswersCounter,
      currentItem,
      answersCounter
    } = this.state;
    const newState = {
      answersCounter: answersCounter + 1,
      showCorrect: true,
      helpOn: false,
      answerSelected: true
    };
    if (currentItem.capital === capital) {
      newState.correctAnswersCounter = correctAnswersCounter + 1;
    } else {
      newState.wrongAnswersCounter = wrongAnswersCounter + 1;
    }
    this.setState(newState);
  }

  handleNextTestClick() {
    const { answerSelected } = this.state;
    if (!answerSelected) {
      window.alert("Please select and answer !");
      return;
    }
    this.setState({
      showCorrect: false,
      answerSelected: false
    });
    this.setState(this.createTest);
  }

  handleHelpOnClick() {
    const { disabledHelpButton } = this.state;
    if (disabledHelpButton) return;
    this.setState({
      helpOn: true,
      disabledHelpButton: true
    });
  }

  createRandomIndexes(arr) {
    let rand = _.random(0, 5);
    if (
      _.indexOf(arr, rand) === -1 &&
      rand != _.findIndex(this.state.items, this.state.currentItem)
    ) {
      arr.push(rand);
    } else {
      this.createRandomIndexes(arr);
    }
  }

  render() {
    const {
      helpOn,
      showCorrect,
      country,
      correctAnswersCounter,
      currentItem,
      answersCounter,
      items,
      disabledHelpButton,
      answerSelected
    } = this.state;

    let btnHelpOnClass = classNames({
      "btn btn-default": true,
      disabled: disabledHelpButton
    });
    let btnNextTextClass = classNames({
      "btn btn-default col-md-offset-1": true,
      disabled: !answerSelected
    });

    //generate 3 random indexes for help on:
    let helpOnIndexes = [];
    if (helpOn) {
      for (let i = 0; i < 3; i++) {
        this.createRandomIndexes(helpOnIndexes);
      }
    }
    return (
      <div className="quiz-wrapper">
        <PageHeader correctAnswersCounter={correctAnswersCounter} />
        <div className="row country-wrapper">
          <div className="country col-md-offset-1">
            <h3>
              What is the capital of <u>{country}</u> ?
            </h3>
          </div>
        </div>
        <div className="row answers-wrapper">
          <ul className="answers col-md-offset-1">
            {items.map((item, index) => {
              return (
                <Answer
                  onAnswerClick={this.hadnleAnswerSelected.bind(this)}
                  item={item}
                  showCorrect={showCorrect}
                  helpOn={_.indexOf(helpOnIndexes, index) != -1}
                  isCorrect={item.capital === currentItem.capital}
                />
              );
            })}
          </ul>
        </div>
        <div
          className={btnNextTextClass}
          onClick={this.handleNextTestClick.bind(this)}
        >
          Next test
        </div>
        <div
          disabled={disabledHelpButton}
          className={btnHelpOnClass}
          onClick={this.handleHelpOnClick.bind(this)}
        >
          Help me !
        </div>
        <PageFooter
          correctAnswersCounter={correctAnswersCounter}
          answersCounter={answersCounter}
        />
      </div>
    );
  }
}

export default Quiz;
