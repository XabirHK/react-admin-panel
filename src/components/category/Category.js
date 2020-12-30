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

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.retrieveCatagories = this.retrieveCatagories.bind(this);
        this.state = {
            modal: false
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
                
                <Modal style={{witdth:"1200px"}} isOpen={this.state.modal} toggle={this.toggle}>
                        {/* <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter> */}
                    
                </Modal>
                        
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
            </div>
        )
    }
}