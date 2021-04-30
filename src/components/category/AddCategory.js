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
        this.saveOrUpdateCategory = this.saveOrUpdateCategory.bind(this);
        this.clickCancelButton = this.clickCancelButton.bind(this);
        this.state = {
            modal: false,
            id: this.props.match.params.id,
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
        this.loading = false;
        if(this.state.id === '_add'){
            return
        }else{
            CategoryDataService.get(this.state.id).then( (res) =>{
                let category = res.data;

                this.setState({
                    title: category.title,
                    description: category.description,
                    position: category.position,
                    status: category.status,
                    parent: category.parent,
                    language: category.language,
                });
            });
        } 
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


    saveOrUpdateCategory = (e) => {
        e.preventDefault();
        let category = {
            //categoryId: this.state.id, 
            title: this.state.title,
            description: this.state.description,
            position: this.state.position,
            status: this.state.status,
            parent: this.state.parent,
            language: this.state.language,
        };
        if(this.state.id === '_add'){
            CategoryDataService.create(category).then(res =>{
                this.props.history.push('/categories');
            });
        }else{
            category.categoryId = this.state.id;
            console.log(category);
            CategoryDataService.update(category).then(res =>{
                this.props.history.push('/categories');
            });
        }
    }

    clickCancelButton(){
        this.props.history.push('/categories');
    }

    retrieveCatagories() {
        CategoryDataService.getAll()
        .then(response => {
            this.setState({
                catagories: response.data
            });
        })
        .catch(e => {

            //console.log(e);
        });
    }


    getPageTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Category</h3>
        }else{
            return <h3 className="text-center">Update Category</h3>
        }
    }

    
    render() {
        const { catagories } = this.state;
        return (
            
            <div>
                {/* <form> */}
                    <ModalHeader>{this.getPageTitle()}</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md={8}>
                                <Card>
                                    <CardBody>
                                        <FormGroup>
                                            <Label for="title">Title</Label>
                                            <Input type="text" name="title" id="title" required
                                            value={this.state.title} onChange={this.changeTitleHandler}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description">Description</Label>
                                            <Input type="textarea" name="description" id="description" style={{height: 359}}
                                            value={this.state.description} onChange={this.changeDescriptionHandler} />
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
                                            value={this.state.position} onChange={this.changePositionHandler}>
                                                <option value=''>Select</option>
                                                <option value='header'>Header</option>
                                                <option value='footer'>Footer</option>
                                                <option value='side'>Side Panel</option>
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
                                            value={this.state.parent} onChange={this.changeParentHandler}>
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
                                            value={this.state.status} onChange={this.changeStatusHandler}>
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
                        <Button  color="primary" onClick= {this.saveOrUpdateCategory}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.clickCancelButton}>Cancel</Button>
                    </ModalFooter>

                {/* </form>       */}
            </div>
        )
    }
}