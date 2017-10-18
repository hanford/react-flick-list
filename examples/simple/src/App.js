import React, { Component } from 'react';
import List from './list'
import FlickList from './kinetic'

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App" id='App'>
        <FlickList>
          {scroll => (
            <List componentStyle={{transform: `translateY(-${scroll}px)`}}/>
          )}
        </FlickList>
      </div>
    );
  }
}

export default App;
