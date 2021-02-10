import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ArticleInterface } from '../models/Article';
import Box from './Box';
import ESGProfile from './ESGProfile';

type StateType = {
  selectedCards: ArticleInterface[];
};

type ResultsProps = RouteComponentProps<{}, {}, StateType>;

class Results extends Component<ResultsProps> {
  render() {
    return (
      <Box title='Results'>
        Work in progress... Work in progress
        <ESGProfile selectedCards={this.props.location.state.selectedCards} />
      </Box>
    );
  }
}

export default withRouter(Results);
