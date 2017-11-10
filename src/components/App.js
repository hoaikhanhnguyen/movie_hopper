import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SearchBar from '../containers/search_bar.js'
import TheaterList from '../containers/theater_list';
import ShowTimeList from '../containers/showtime_list';
import '../App.css';

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
          <div className="App">
            <div className="App-header">
              <h2>Welcome to Movie Hopper</h2>
                <SearchBar />
            </div>
              <TheaterList />
              <ShowTimeList />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
