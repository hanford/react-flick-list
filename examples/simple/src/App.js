import React, { Component } from 'react';
import List from './list'
import Kinetic from './kinetic'

import './App.css';

class App extends Component {
  state = {
    translateY: 0,
    ref: null
  }

  storeList = ref => {
    if (!this.state.ref) {
      this.setState({ ref })
    }
  }

  render() {
    const { translateY, ref } = this.state
    console.log(translateY)

    return (
      <div className="App" id='App'>
        <List getRef={this.storeList} componentStyle={{transform: `translateY(-${translateY}px)`}}/>

        {ref && <Kinetic element={ref} broadcast={({ position }) => this.setState({translateY: position})} />}
      </div>
    );
  }
}

export default App;
