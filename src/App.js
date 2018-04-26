import React, { Component } from 'react';

import MapView from './MapView';
import './App.css';

class App extends Component {
  state = {
    crumbsList: "USA"
  }
  breadCrumbs(crumbs){
    this.setState({crumbsList: crumbs});
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <header className="App-header">
            <div className="App-title">Flu Vaccine Dashbaord</div>
          </header>
         </div> 
        <div className="row">
          <div style={{margin: 10}}>{this.state.crumbsList}</div>
          <div className="leaflet-container">
            <MapView breadCrumbs={(crumbs)=>this.breadCrumbs(crumbs)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
