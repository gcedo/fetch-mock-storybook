import React, { Component } from 'react';
import logo from './logo.svg';

const GITHUB_URL = 'https://api.github.com';

function getLanguagesForRepository(user, repository) {
  return fetch(
    `${GITHUB_URL}/repos/${user}/${repository}/languages`,
  ).then(response => response.json());
}

class App extends Component {
  state = {
    languages: {},
  };

  componentDidMount() {
    getLanguagesForRepository('facebook', 'react').then(languages =>
      this.setState({
        languages,
      }));
  }

  render() {
    const { languages } = this.state;

    return (
      <ul>
        {Object.entries(languages).map(([language, bytes]) => (
          <li key={language}>{language}: {bytes}</li>
        ))}
      </ul>
    );
  }
}

export default App;
