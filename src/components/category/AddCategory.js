import React from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Label,
    Input,
    Button,
    Table,
} from 'reactstrap';

export default function AddCategory () {
    return (
        <div>
            <h3 className="m-b">Add a new Category</h3>
            <Row>
                <Col md={8}>
                    <Card>
                        <CardBody>
                            <FormGroup>
                                <Label for="exampleText">Title</Label>
                                <Input type="text" name="text" id="exampleText" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Description</Label>
                                <Input type="textarea" name="text" id="exampleText2" style={{height: 300}} />
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    {/* <Button block className="m-b">Position of the Category</Button> */}
                    <Card>
                        <CardHeader>Position of the Category</CardHeader>
                        <CardBody>
                            {/* <div>
                                <strong>Status:</strong> Draft
                                </div>
                            <hr />
                            <div>
                                <strong>Word Count:</strong> 329
                            </div> */}
                            <hr />
                            <div>
                            <FormGroup>
                                <Label for="exampleSelectMulti">Place</Label>
                                <Input type="select" name="select" id="exampleSelect3">
                                    <option>Header</option>
                                    <option>Footer</option>
                                    <option>Header and Footer</option>
                                    <option defaultChecked>Unpublished</option>
                                </Input>
                            </FormGroup>
                            </div>
                            <hr />
                            <Button block color="primary">Publish</Button>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Tags</CardHeader>
                        <CardBody>
                            <FormGroup>
                                <Input type="text" name="select" id="exampleSelect4" />
                            </FormGroup>
                            <Button>Add</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>                
        </div>
    )
}