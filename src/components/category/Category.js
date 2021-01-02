import React, { Component } from "react";
import {
    Row,
    Col,
    CardHeader,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    Table,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import CategoryDataService from "../../services/category.service.js";
import { Loader } from '../../vibe/';
import AddCategry from "./AddCategory";
import ListCategory from "./ListCatagiry";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.retrieveCatagories = this.retrieveCatagories.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
        this.state = {
            modal: false,
            id: null,
            title: "",
            description: "", 
            published: false,
            parent:0,
            language:1,
            submitted: false
        };

        this.toggle = this.toggle.bind(this);
        this.loading = true;
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidMount() {
        this.retrieveCatagories();
        this.loading = false;
    }

    saveCategory() {
        console.log('Functin a dhukse');
        this.loading = true;
        var data = {
            title: this.state.title,
            description: this.state.description,
            parent: this.state.parent,
            published: this.state.published,
            language: 1,
        };
    
        CategoryDataService.create(data)
          .then(response => {
            this.setState({
              title: response.data.title,
              description: response.data.description,
              parent: response.data.parent,
              published: response.data.published,
              language: 1,
              submitted: true
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
            });
        
        this.retrieveCatagories();
        this.toggle();
        this.loading = false;
    }

    newCategory() {
        this.setState({
            id: null,
            title: "",
            description: "", 
            published: false,
            parent:0,
            language:1,
            submitted: false
        });
    }
    
    retrieveCatagories() {
        CategoryDataService.getAll()
        .then(response => {
        this.setState({
            catagories: response.data
        });
        console.log(response.data);
        })
        .catch(e => {
        console.log(e);
        });
    }

    
    renderLoader(){
        if(this.loading === true)
           return (
            <Col md={3} className='LoaderIcon'>
                <Loader type="bars" small />
            </Col>
           )
        else   
            return null;
     }



    render() {
        const { catagories} = this.state;
        return (
            <div>
                <h3 className="m-b">Current Catagories</h3>
                <Row>
                    { this.renderLoader() }
                    <Col md="2" style={{ margin: "0", padding: "0", marginLeft: "auto" }}>
                        <Button block color="primary" onClick={this.toggle} >Add New</Button>
                    </Col>
                </Row>
                
                
                        
                <hr />
                <Card>
                <CardBody>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Position</th>
                                <th>Parent</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {catagories && catagories.map((catagory, i) => (
                            <tr key = {catagory.categoryId}>
                                <td>{++i}</td>
                                <td>{catagory.title}</td>
                                <td>{catagory.position}</td>
                                <td>{catagory.parent}</td>
                                <td>{catagory.language}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>


            <Modal className="submit-form" isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add a new Category</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md={8}>
                                <Card>
                                    <CardBody>
                                        <FormGroup>
                                            <Label for="title">Title</Label>
                                            <Input type="text" name="title" id="title" required/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description">Description</Label>
                                            <Input type="textarea" name="description" id="description" style={{height: 358}} />
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
                                            <Input type="select" name="position" id="position" required>
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
                                            <Input type="select" name="parent" id="parent">
                                            <option defaultChecked>No Parent</option>
                                            {catagories && catagories.map((catagory, i) => (
                                                <option key = {catagory.categoryId} value={catagory.categoryId}>{catagory.title}</option>
                                            ))}
                                                
                                            </Input>
                                        </FormGroup>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody>
                                        <FormGroup>
                                            <Label for="exampleSelect4">Tags</Label>
                                            <Input type="text" name="select" id="exampleSelect4" />
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                                
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button  color="primary" onClick= {this.saveCategory}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                
            </Modal>

            </div>
        )
    }
}