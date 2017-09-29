import React, { Component } from 'react';
import SearchBar from '../containers/search_bar.js'
import TheaterList from '../containers/theater_list';
import ShowTimeList from '../containers/showtime_list';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Movie Hopper</h2>
            <SearchBar />
        </div>
          <TheaterList />
          <ShowTimeList />
      </div>
    );
  }
}

export default App;
