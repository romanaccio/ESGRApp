import axios from 'axios';

import React, { Component } from 'react';
import Card, { CardInterface } from './components/Card';
import Box from './components/Box';
import MyButton from './components/MyButton';
import Heart from './icons/Heart';
import X from './icons/X';

class App extends Component {
  state = {
    loading: false,
    responses: [] as CardInterface[],
    index: 0,
  };

  componentDidMount() {
    const url = 'https://jsonplaceholder.typicode.com/photos?albumId=1';
    this.setState({ loading: true });
    axios.get(url).then((response) => {
      const responses = response.data as CardInterface;
      console.log(responses);
      this.setState({ responses, loading: false });
    });
  }

  handleSwipe = (direction: string): void => {
    console.log('handleSwipe direction: ' + direction);
    let index = this.state.index;
    if (index < this.state.responses.length - 1) index++;
    this.setState({ index });
  };

  render() {
    const resp = this.state.responses[this.state.index];
    console.log(resp);
    return (
      <div className='mx-auto'>
        {this.state.loading || this.state.responses.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <Box title='ESG App'>
            <Card key={resp.title} obj={resp} handleSwipe={this.handleSwipe} />
            <div className='flex justify-between'>
              <MyButton
                icon={<X color='red' />}
                color='white'
                onClick={() => this.handleSwipe('left')}
              ></MyButton>
              <MyButton
                icon={<Heart color='green' />}
                color='white'
                onClick={() => this.handleSwipe('right')}
              ></MyButton>
            </div>
          </Box>
        )}
      </div>
    );
  }
}

export default App;
