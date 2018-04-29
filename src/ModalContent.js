import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalTable from './ModalTable';
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
                            <div><ModalTable/></div> :
                        contentType === 'chart' ?
                            <div>chart</div> :
                        contentType === 'metrics' ?
                            <div>metrics</div> :
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