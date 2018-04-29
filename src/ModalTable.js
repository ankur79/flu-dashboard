import React from 'react';
import { Table } from 'react-bootstrap';
import csvjson from './csvjson.json';

class ModalTable extends React.Component{
    render(){
        return(
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        {
                            Object.keys(csvjson[0]).map((item, index) => <th key={index}>{item}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        csvjson.map((item, index) => {
                            return(
                                <tr key={index}>
                                    {
                                        Object.values(item).map((item, index) => {
                                            return(
                                                <td key={index}>{item}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        )
    }
}

export default ModalTable;