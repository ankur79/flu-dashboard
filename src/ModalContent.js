import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalTable from './ModalTable';
import ModalChart from './ModalChart';
import csvjson from './csvjson.json';
import metrics from './metrics.json';
class ModalContent extends React.Component{
    render(){
        const { contentType } = this.props;
        return (
            <React.Fragment>
                <Modal.Header closeButton>
                <Modal.Title>{contentType.toUpperCase()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        contentType === 'table' ?
                            <div><ModalTable data={csvjson}/></div> :
                        contentType === 'chart' ?
                            <div><ModalChart/></div> :
                        contentType === 'metrics' ?
                            <div><ModalTable data={metrics}/></div> :
                        ""
                    }
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </React.Fragment>
        )
    }
}

export default ModalContent;