import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';
import MapView from './MapView';
import ModalContent from './ModalContent';
import './App.css';

class App extends Component {
  state = {
    crumbsList: "USA",
    show: false,
    modalContent: ""
  }
  breadCrumbs(crumbs){
    this.setState({crumbsList: crumbs});
  }
  handleClose(){
    this.setState({ show: false, modalContent: "" });
  }
  handleShow = (modalContent) => {
    this.setState({ show: true, modalContent: modalContent }, ()=>{
      //
    });
  }
  render() {
    const { modalContent } = this.state;
    return (
      <div className="container">
        <div className="static-modal">
            <Modal show={this.state.show} dialogClassName={modalContent  === 'table' ? "custom-modal" : ""} onHide={()=>this.handleClose()}>
              <ModalContent contentType={this.state.modalContent}/>
            </Modal>
          </div>
        <div className="row">
          <header className="App-header">
            <div className="App-title">Flu Vaccine Dashbaord</div>
          </header>
         </div> 
        <div className="row">
          <div style={{margin: 10}}>{this.state.crumbsList}</div>
          <div className="leaflet-container">
            <MapView handleShow={(modalContent)=>this.handleShow(modalContent)} breadCrumbs={(crumbs)=>this.breadCrumbs(crumbs)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
