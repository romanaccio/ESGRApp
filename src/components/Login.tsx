import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface LoginInterface extends RouteComponentProps<any> {}

class Login extends Component<LoginInterface> {
  state = {
    username: '',
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
      state: { username: this.state.username },
    });
  };

  render() {
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
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
