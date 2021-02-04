import React, { Component } from 'react';
import Card, { defaultCard } from './Card';
import { ArticleInterface } from '../models/Article';
import Box from './Box';
import { direction } from 'react-deck-swiper';
import ESGProfile from './ESGProfile';
import MyButton, { MyButtonColor } from './MyButton';
import { getArticles } from '../services/getData';

class App extends Component {
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
    const resp = this.state.responses[this.state.index];
    const reachedLimit = this.state.index >= this.state.responses.length;
    return (
      <div className='mx-auto p-1'>
        {this.state.loading || this.state.responses.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <Box title='ESG Revolution'>
            {reachedLimit ? (
              <div>
                <Card key={defaultCard.title} obj={defaultCard} />
                <div className='flex items-center justify-center'>
                  <MyButton text='Try again' onClick={this.tryAgain}></MyButton>
                </div>
              </div>
            ) : (
              <Card
                key={resp.title}
                obj={resp}
                handleSwipe={this.handleSwipe}
              />
            )}
            <ESGProfile selectedCards={this.state.selectedCards} />
          </Box>
        )}
      </div>
    );
  }
}

export default App;
