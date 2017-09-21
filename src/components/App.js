import React, { Component } from 'react';
import SearchBar from '../containers/search_bar.js'
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Movie Hopper</h2>
            <SearchBar/>
        </div>
      </div>
    );
  }
}

export default App;
