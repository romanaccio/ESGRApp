// import axios from 'axios';
import data from './data';
import React, { Component } from 'react';
import Card, { CardInterface } from './components/Card';
import Box from './components/Box';
import { direction } from 'react-deck-swiper';

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
    const responses = Object.values(data);
    this.setState({ responses, loading: false });
  }

  handleSwipe = (swipeDirection: direction): void => {
    console.log('handleSwipe direction: ' + swipeDirection);
    const selectedCards = [...this.state.selectedCards];
    let index = this.state.index;

    if (index < this.state.responses.length) {
      if (swipeDirection === direction.RIGHT) {
        selectedCards.push(this.state.responses[index]);
        this.setState({ selectedCards });
      }
      index++;
      this.setState({ index });
    }
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
                <p className='font-bold'>
                  Your have seen all the cards. Your selection:
                </p>
                {this.state.selectedCards.map((card) => (
                  <p>-{card.title}</p>
                ))}
              </div>
            ) : (
              <Card
                key={resp.title}
                obj={resp}
                handleSwipe={this.handleSwipe}
              />
            )}
          </Box>
        )}
      </div>
    );
  }
}

export default App;
