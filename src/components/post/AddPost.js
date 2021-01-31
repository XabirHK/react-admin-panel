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
import ImageUploader from 'react-images-upload';

import CategoryDataService from "../../services/category.service.js";
import PostDataService from "../../services/post.service.js";

export default class AddPost extends Component {
    constructor(props) {
        super(props);
        this.retrieveCatagories = this.retrieveCatagories.bind(this);
        this.savePost = this.savePost.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            modal: false,
            id: null,
            title: '',
            description: '', 
            tags: '',
            status: 0,
            language:1,
            pictures: [],
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
    changeCategoryHandler= (event) => {
        this.setState({category: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }
    changeTagsHandler= (event) => {
        this.setState({tags: event.target.value});
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    savePost = (e) => {
        console.log('save post e dhukse');
        e.preventDefault();
        let post = {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            status: this.state.status,
            tags: this.state.tags,
            language: this.state.language,
            primaryPicture: this.state.pictures[0]['name'],
        };
        
        PostDataService.create(post).then(res =>{
            this.props.history.push('/posts');
            //console.log(post);
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
                                    <Input type="textarea" name="description" id="description" style={{height: 645}}
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
                                    <Label for="category">Category</Label>
                                    <Input type="select" name="category" id="category"
                                    defaultValue={this.state.parent} onChange={this.changeCategoryHandler}>
                                    <option defaultChecked value='0'>Miscellaneous</option>
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
                                    <Label for="picture">Image</Label>
                                    <ImageUploader
                                        withIcon={false}
                                        withPreview={true}
                                        singleImage={true}
                                        buttonText='Choose images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                    />
                                </FormGroup>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Tags</CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Input type="text" name="tags" id="tags" 
                                    defaultValue={this.state.tags} onChange={this.changeTagsHandler}/>
                                </FormGroup>
                            </CardBody>
                        </Card>
                        
                        <Card>
                            <CardBody>
                                <div>
                                <FormGroup>
                                    <Label for="status">Status</Label>
                                    <Input type="select" name="status" id="status" required
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

                <Button  color="primary" onClick= {this.savePost}>Save</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>       
            </div>
        )
    }
}