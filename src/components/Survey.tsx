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

type StateType = {
  username: string;
};
type SurveyProps = RouteComponentProps<{}, {}, StateType>;

class Survey extends Component<SurveyProps> {
  state = {
    loading: false,
    responses: [] as ArticleInterface[],
    selectedCards: [] as ArticleInterface[],
    index: 0,
  };

  componentDidMount() {
    this.setState({ loading: true });

    const responses = getArticles();
    this.setState({ responses, loading: false });
  }

  handleSwipe = (swipeDirection: direction): void => {
    console.log('handleSwipe direction: ' + swipeDirection);
    const selectedCards = [...this.state.selectedCards];
    let index = this.state.index;

    if (index < this.state.responses.length) {
      const resp = this.state.responses[index];

      if (swipeDirection === direction.RIGHT) {
        resp.choice = 1;
      } else if (swipeDirection === direction.LEFT) {
        resp.choice = -1;
      }
      selectedCards.push(resp);

      this.setState({ selectedCards });

      index++;
      this.setState({ index });
    }
  };

  tryAgain = () => {
    this.setState({ index: 0, selectedCards: [] });
  };

  render() {
    // TODO: instead of simply incrementing the index, find the next card that will
    // maximise the suggestion metric based on current user score and other
    // parameters as per the spec
    const { loading, index } = this.state;
    const len = this.state.responses.length;

    const card = this.state.responses[index];
    let nextCard = defaultArticle;
    if (index < len - 1) nextCard = this.state.responses[index + 1];
    const reachedLimit = index >= len;
    const username = this.props.location.state.username
      ? this.props.location.state.username
      : '';

    return (
      <div className='mx-auto p-1'>
        {loading || len === 0 ? (
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
                  legend={`Card ${index + 1}/${len}`}
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
