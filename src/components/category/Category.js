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
    Modal, 
} from 'reactstrap';
import CategoryDataService from "../../services/category.service.js";
import { Loader } from '../../vibe/';
import AddCategory from "./AddCategory";

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.retrieveCatagories = this.retrieveCatagories.bind(this);
        this.deleteCategorye = this.deleteCategorye.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.addCategorye = this.addCategorye.bind(this);
        //this.saveCategory = this.saveCategory.bind(this);
        this.state = {
            modal: false,
            catagories: [],
        };

        this.toggle = this.toggle.bind(this);
        this.loading = true;
    }

    addCategorye(){
        this.props.history.push('/category/add/_add');
    }


    deleteCategorye(id){
        CategoryDataService.delete(id).then( res => {
            this.setState({catagories: this.state.catagories.filter(catagory => catagory.categoryId !== id)});
        });
    }
    
    editCategory(id){
        this.props.history.push(`/category/add/${id}`);
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
            //console.log(response.data);
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

    toggle() {
        this.props.history.push('/category/add/_add');
    }
    
    render() {
        //const { catagories} = this.state;
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.catagories.map(
                                        (catagory, i) =>
                            <tr key = {catagory.categoryId}>
                                <td>{++i}</td>
                                <td>{catagory.title}</td>
                                <td>{catagory.position}</td>
                                <td>{catagory.parent}</td>
                                <td>{catagory.language}</td>
                                <td>
                                    <Button onClick={ () => this.editCategory(catagory.categoryId)} color="primary" size="sm"><i className="fa fa-edit"></i></Button>{' '}
                                    <Button onClick={ () => {if(window.confirm('Delete the item?')) this.deleteCategorye(catagory.categoryId)}} color="danger"size="sm"><i className="fa fa-trash"></i></Button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </CardBody>
                </Card>

                <div>
                    <Modal className="submit-form" isOpen={this.state.modal} toggle={Category.toggle}>
                        <AddCategory></AddCategory>
                    </Modal>    
                </div>

            </div>
        )
    }
}