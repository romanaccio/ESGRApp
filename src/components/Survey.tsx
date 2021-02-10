import React, { Component } from 'react';
import CardDeck from './CardDeck';
// import CardDeckJS from './CardDeckJS';
import { ArticleInterface, defaultArticle } from '../models/Article';
import Box from './Box';
import { direction } from 'react-deck-swiper';
import ESGProfile from './ESGProfile';
import MyButton from './MyButton';
import { getArticles } from '../services/getData';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { calculateScore } from '../util/calculateScore';
import { writeReport } from '../services/writeReport';
import { articlesToReport } from '../models/Article';

type NextPair = {
  card: ArticleInterface;
  nextCard: ArticleInterface;
};

type StateType =
  | {
      username: string;
      testsize: string;
    }
  | any; // any is a way to trick the TS compiler so that I can this.props.history.push anything

type SurveyProps = RouteComponentProps<{}, {}, StateType>;

class Survey extends Component<SurveyProps> {
  state = {
    loading: false,
    initialDatabaseCards: [] as ArticleInterface[],
    databaseCards: [] as ArticleInterface[],
    selectedCards: [] as ArticleInterface[],
    cardsPulled: 0,
    surveyStartTimestamp: 0,
  };

  MAX_CARDS_TO_PULL = 10; // this has to be a positive integer

  componentDidMount() {
    const { testsize } = this.props.location.state;
    if (testsize === 'small') {
      this.MAX_CARDS_TO_PULL = 5;
    } else if (testsize === 'medium') {
      this.MAX_CARDS_TO_PULL = 10;
    } else if (testsize === 'large') {
      this.MAX_CARDS_TO_PULL = 20;
    }
    this.setState({ loading: true });

    const initialDatabaseCards = getArticles();
    const databaseCards = [...initialDatabaseCards];
    this.setState({
      initialDatabaseCards,
      databaseCards,
      cardsPulled: 0,
      loading: false,
      surveyStartTimestamp: Date.now(),
    });
  }

  handleSwipe = (swipeDirection: direction, card: ArticleInterface): void => {
    console.log(
      'handleSwipe direction: ' + swipeDirection + ' on card with id ' + card.id
    );
    const selectedCards = [...this.state.selectedCards];
    const databaseCards = [...this.state.databaseCards];
    let cardsPulled = this.state.cardsPulled;

    const index = databaseCards.indexOf(card);
    if (index > -1) {
      if (swipeDirection === direction.RIGHT) {
        card.choice = 1;
      } else if (swipeDirection === direction.LEFT) {
        card.choice = -1;
      }
      card.timestamp = Date.now();
      selectedCards.push(card);
      databaseCards.splice(index, 1);

      cardsPulled++;
      this.setState({ selectedCards, databaseCards, cardsPulled });
    }
  };

  tryAgain = () => {
    this.setState({
      cardsPulled: 0,
      databaseCards: [...this.state.initialDatabaseCards],
      selectedCards: [],
      surveyStartTimestamp: Date.now(),
    });
  };

  goToResults = () => {
    // 1. save results to db
    const { cardsPulled, selectedCards } = this.state;

    if (this.reachedLimit(cardsPulled)) {
      const username = this.props.location.state.username
        ? this.props.location.state.username
        : 'unknown';
      const surveyReport = {
        username,
        reportStart: this.state.surveyStartTimestamp,
        data: articlesToReport(selectedCards),
      };
      writeReport(surveyReport);
    }
    // 2. go to results page
    this.props.history.push({
      pathname: '/results',
      state: { selectedCards: this.state.selectedCards },
    });
  };

  getMaximizedCard = (
    cards: ArticleInterface[],
    currentScore: number
  ): number => {
    if (cards.length === 0) return -1;

    let indexOfMax = 0;
    let maxChoice = 0;

    cards.forEach((card, index) => {
      const choice = 2 * card.quality + Math.abs(card.grade - currentScore);
      if (choice > maxChoice) {
        maxChoice = choice;
        indexOfMax = index;
      }
    });
    return indexOfMax;
  };

  selectNextCard = (
    cards: ArticleInterface[],
    currentScore: number
  ): NextPair => {
    const databaseCards = [...cards];
    let firstCard = defaultArticle;
    let secondCard = defaultArticle;
    const firstCardIndex = this.getMaximizedCard(databaseCards, currentScore);
    let secondCardIndex = -1;
    if (firstCardIndex > -1) {
      firstCard = databaseCards[firstCardIndex];
      databaseCards.splice(firstCardIndex, 1);
      secondCardIndex = this.getMaximizedCard(databaseCards, currentScore);
      if (secondCardIndex > -1) secondCard = databaseCards[secondCardIndex];
    }
    return { card: firstCard, nextCard: secondCard };
  };

  reachedLimit = (cardsPulled: number): boolean => {
    return cardsPulled >= this.MAX_CARDS_TO_PULL;
  };

  render() {
    const { loading, cardsPulled } = this.state;
    const reachedLimit = this.reachedLimit(cardsPulled);
    const currentScore = calculateScore(this.state.selectedCards);

    const nextPair = this.selectNextCard(
      this.state.databaseCards,
      currentScore
    );
    let { card, nextCard } = nextPair;
    // store score in card for the record
    card.calculatedScore = currentScore;

    if (cardsPulled === this.MAX_CARDS_TO_PULL - 1) nextCard = defaultArticle;

    const username = this.props.location.state.username
      ? this.props.location.state.username
      : '';

    return (
      <div className='mx-auto p-1'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Box title={`Hello ${username}`}>
            {reachedLimit ? (
              <div>
                <CardDeck
                  key={defaultArticle.title}
                  card={defaultArticle}
                  nextCard={defaultArticle}
                  handleSwipe={() => console.log('swipe disabled')}
                  displayButtons={false}
                />
                <div className='flex items-center justify-center'>
                  <MyButton text='Redo test' onClick={this.tryAgain}></MyButton>
                  <MyButton
                    text='Validate test'
                    onClick={this.goToResults}
                  ></MyButton>
                </div>
              </div>
            ) : (
              <>
                <CardDeck
                  key={card.title}
                  card={card}
                  nextCard={nextCard}
                  handleSwipe={this.handleSwipe}
                  legend={`Card ${cardsPulled + 1}/${this.MAX_CARDS_TO_PULL}`}
                />
              </>
            )}
            <ESGProfile selectedCards={this.state.selectedCards} />
          </Box>
        )}
      </div>
    );
  }
}

export default withRouter(Survey);
