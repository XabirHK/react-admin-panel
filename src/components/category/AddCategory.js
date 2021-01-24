import React, { Component } from 'react';
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
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import Category from './Category';
import CategoryDataService from "../../services/category.service.js";

export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.retrieveCatagories = this.retrieveCatagories.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
        this.state = {
            modal: false,
            id: null,
            title: '',
            description: '', 
            position: '',
            status: 0,
            parent: 0,
            language:1,
            submitted: false
        };

        // Category.toggle = Category.toggle.bind(Category.toggle);
        //Category.loading = true;
    }

    componentDidMount() {
        this.retrieveCatagories();
        //this.loading = false;
    }
    
    changeTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }
    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }
    changePositionHandler= (event) => {
        this.setState({position: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }
    changeParentHandler= (event) => {
        this.setState({parent: event.target.value});
    }


    saveCategory = (e) => {
        e.preventDefault();
        let catagory = {
            title: this.state.title,
            description: this.state.description,
            position: this.state.position,
            status: this.state.status,
            parent: this.state.parent,
            language: this.state.language,
        };
        
        CategoryDataService.create(catagory).then(res =>{
            this.props.history.push('/category');
        });
        
    }

    retrieveCatagories() {
        CategoryDataService.getAll()
        .then(response => {
            this.setState({
                catagories: response.data
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    
    render() {
        const { catagories } = this.state;
        return (
            
            <div>
                <ModalHeader toggle={this.toggle}>Add a new Category</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={8}>
                            <Card>
                                <CardBody>
                                    <FormGroup>
                                        <Label for="title">Title</Label>
                                        <Input type="text" name="title" id="title" required
                                        defaultValue={this.state.title} onChange={this.changeTitleHandler}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="description">Description</Label>
                                        <Input type="textarea" name="description" id="description" style={{height: 359}}
                                        defaultValue={this.state.description} onChange={this.changeDescriptionHandler} />
                                    </FormGroup>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4}>
                            {/* <Button block className="m-b">Position of the Category</Button> */}
                            <Card>
                                <CardBody>
                                    <div>
                                    <FormGroup>
                                        <Label for="position">Place</Label>
                                        <Input type="select" name="position" id="position" required
                                        defaultValue={this.state.position} onChange={this.changePositionHandler}>
                                            <option value='header'>Header</option>
                                            <option value='footer'>Footer</option>
                                            <option value='side'>Side Panel</option>
                                            <option value='null' defaultChecked>Unpublished</option>
                                        </Input>
                                    </FormGroup>
                                    </div>
                                </CardBody>
                            </Card>
                            
                            <Card>
                                <CardBody>
                                    <div>
                                    <FormGroup>
                                        <Label for="parent">Parent</Label>
                                        <Input type="select" name="parent" id="parent"
                                        defaultValue={this.state.parent} onChange={this.changeParentHandler}>
                                        <option defaultChecked value='0'>No Parent</option>
                                        {catagories && catagories.map((catagory) => (
                                            <option key = {catagory.categoryId} value={catagory.categoryId}> { catagory.title } </option>
                                        ))}
                                        </Input>
                                    </FormGroup>
                                    </div>
                                </CardBody>
                            </Card>

                            <Card>
                                <CardBody>
                                    <div>
                                    <FormGroup>
                                        <Label for="position">Status</Label>
                                        <Input type="select" name="status" id="position" required
                                        defaultValue={this.state.status} onChange={this.changeStatusHandler}>
                                            <option value='1'>Enabled</option>
                                            <option value='0'>Disabled</option>
                                        </Input>
                                    </FormGroup>
                                    </div>
                                </CardBody>
                            </Card>                
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button  color="primary" onClick= {this.saveCategory}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>  
                    
                       
            </div>
        )
    }
}