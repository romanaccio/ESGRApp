import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import MyButton from './MyButton';

interface LoginInterface extends RouteComponentProps<any> {}

class Login extends Component<LoginInterface> {
  state = {
    username: '',
    testsize: 'small',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/survey',
      state: { username: this.state.username, testsize: this.state.testsize },
    });
  };

  render() {
    const isValid = this.state.username.length > 0;
    return (
      <div className='mt-2'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter your username:
            <input
              className='ml-2'
              placeholder='Username'
              name='username'
              type='text'
              onChange={this.handleChange}
              value={this.state.username}
            />
          </label>
          <div>
            <label>
              Please select test size
              <label className='ml-2'>
                <input
                  className='mx-1'
                  type='radio'
                  name='testsize'
                  value={'small'}
                  checked={this.state.testsize === 'small'}
                  onChange={this.handleChange}
                />
                small
              </label>
              <label className='ml-2'>
                <input
                  className='mx-1'
                  type='radio'
                  name='testsize'
                  value={'medium'}
                  checked={this.state.testsize === 'medium'}
                  onChange={this.handleChange}
                />
                medium
              </label>
              <label className='ml-2'>
                <input
                  className='mx-1'
                  type='radio'
                  name='testsize'
                  value={'large'}
                  checked={this.state.testsize === 'large'}
                  onChange={this.handleChange}
                />
                large
              </label>
            </label>
          </div>
          <MyButton text='Go to test' disabled={!isValid} />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
