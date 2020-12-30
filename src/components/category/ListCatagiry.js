import React from 'react';
import {

    Card,
    CardBody,
    Table,
} from 'reactstrap';

export default function AddCategory () {
    return (
        <div>
            <h3 className="m-b">Current Catagories</h3>
            
            <Card>
            <CardBody>
                
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Position</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>

                        
        </div>
    )
}