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

type NextPair = {
  card: ArticleInterface;
  nextCard: ArticleInterface;
};

type StateType = {
  username: string;
  testsize: string;
};
type SurveyProps = RouteComponentProps<{}, {}, StateType>;

class Survey extends Component<SurveyProps> {
  state = {
    loading: false,
    initialDatabaseCards: [] as ArticleInterface[],
    databaseCards: [] as ArticleInterface[],
    selectedCards: [] as ArticleInterface[],
    cardsPulled: 0,
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
      cardsPulled++;
      selectedCards.push(card);
      databaseCards.splice(index, 1);
      this.setState({ selectedCards, databaseCards, cardsPulled });
    }
  };

  tryAgain = () => {
    this.setState({
      cardsPulled: 0,
      databaseCards: [...this.state.initialDatabaseCards],
      selectedCards: [],
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

  selectNextCard = (cards: ArticleInterface[]): NextPair => {
    // build scores of all available cards
    const currentScore = calculateScore(this.state.selectedCards);

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

  render() {
    const { loading, cardsPulled } = this.state;
    const reachedLimit = cardsPulled >= this.MAX_CARDS_TO_PULL;
    const nextPair = this.selectNextCard(this.state.databaseCards);
    let { card, nextCard } = nextPair;
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
                  <MyButton text='Try again' onClick={this.tryAgain}></MyButton>
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
