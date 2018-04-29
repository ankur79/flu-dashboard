import React from 'react';
import { Image } from 'react-bootstrap';
import img from './unnamed.png';
class ModalChart extends React.Component{
    render(){
        return(
            <div>
                <Image src={img} responsive />;
            </div>
        )
    }
}

export default ModalChart;