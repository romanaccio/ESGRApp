// import axios from 'axios';
import data from '../data/data';
import React, { Component } from 'react';
import Card, { CardInterface, defaultCard } from './Card';
import Box from './Box';
import { direction } from 'react-deck-swiper';
import ESGProfile from './ESGProfile';
import MyButton, { MyButtonColor } from './MyButton';

class App extends Component {
  state = {
    loading: false,
    responses: [] as CardInterface[],
    selectedCards: [] as CardInterface[],
    index: 0,
  };

  componentDidMount() {
    this.setState({ loading: true });
    // const url = 'https://jsonplaceholder.typicode.com/photos?albumId=1';
    // axios.get(url).then((response) => {
    //   const responses = response.data as CardInterface;
    //   console.log(responses);
    //   this.setState({ responses, loading: false });
    // });
    // const responses = Object.values(data);
    const responses = [];
    for (const [key, value] of Object.entries(data)) {
      const resp = {
        id: key,
        image_url: value.image_url,
        title: value.title,
        content: value.content,
        grade: value.grade,
        choice: 0,
      };
      responses.push(resp);
    }
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
