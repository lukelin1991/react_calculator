import React, { Component } from 'react';
import './App.css';

import Display from './components/Display'
import ButtonPanel from './components/ButtonPanel'
import calculate from './components/logic/calculate'

export default class App extends Component {

  state = {
    total: null,
    next: null,
    operation: null,
  }

  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName))
  }

  render(){
    return (
      <div className="App">
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick}/>
      </div>
    );
  }
}
