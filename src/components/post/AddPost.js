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
        // this.savePost = this.savePost.bind(this);
        this.clickCancelButton = this.clickCancelButton.bind(this);
        // this.onDrop = this.onDrop.bind(this);
        this.state = {
            modal: false,
            id: this.props.match.params.id,
            title: '',
            description: '', 
            tags: '',
            status: 0,
            language:1,
            primaryPicture: '',
            // pictures: [],
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
            PostDataService.get(this.state.id).then( (res) =>{
                let post = res.data;
                this.setState({
                    title: post.title,
                    description: post.description,
                    category: post.category,
                    status: post.status,
                    tags: post.tags,
                    language: post.language,
                    primaryPicture: post.primaryPicture,
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
    changeCategoryHandler= (event) => {
        this.setState({category: event.target.value});
    }
    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }
    changeTagsHandler= (event) => {
        this.setState({tags: event.target.value});
    }

    changePrimaryPictureHandler= (event) => {
        this.setState({primaryPicture: event.target.value});
    }

    // onDrop(picture) {
    //     this.setState({
    //         pictures: this.state.pictures.concat(picture),
    //     });
    // }

    // savePost = (e) => {
    //     e.preventDefault();
    //     let post = {
    //         title: this.state.title,
    //         description: this.state.description,
    //         category: this.state.category,
    //         status: this.state.status,
    //         tags: this.state.tags,
    //         language: this.state.language,
    //         primaryPicture: this.state.primaryPicture,
    //     };
        
    //     PostDataService.create(post).then(res =>{
    //         this.props.history.push('/posts');
    //         //console.log(post);
    //     });  
    // }


    saveOrUpdatePost = (e) => {
        e.preventDefault();
        let post = {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            status: this.state.status,
            tags: this.state.tags,
            language: this.state.language,
            primaryPicture: this.state.primaryPicture,
        };
        if(this.state.id === '_add'){
            PostDataService.create(post).then(res =>{
                this.props.history.push('/posts');
            });
        }else{
            post.id = this.state.id;
            PostDataService.update(post).then(res =>{
                this.props.history.push('/posts');
            });
        }
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

    getPageTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Post</h3>
        }else{
            return <h3 className="text-center">Update Post</h3>
        }
    }

    clickCancelButton(){
        this.props.history.push('/posts');
    }

    
    render() {
        const { catagories } = this.state;
        var ttParagraph = 'Please use <p> YOUR PARAGRAPH </p> for paragraph';
        var ttBold = 'Please use <b> THE BOLD TITLE </b> for Bold';
        var ttImage = 'Please use <img src ="YOUR IMAGE LINK" ></img> for inserting image ';
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
                                    <small className="text-muted">{ttParagraph}<br></br> {ttBold}<br></br> {ttImage}</small>
                                    <p> </p>
                                    <Input type="textarea" name="description" id="description" style={{height: 550}}
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
                                    <Label for="parent">Category</Label>
                                    <Input type="select" name="category" id="category"
                                    value={this.state.category} onChange={this.changeCategoryHandler}>
                                    <option defaultChecked value='0'>Miscellaneous</option>
                                    {catagories && catagories.map((pCatagory) => (
                                        <option key = {pCatagory.categoryId} value={pCatagory.categoryId}> { pCatagory.title } </option>
                                    ))}
                                    </Input>
                                </FormGroup>
                                </div>
                            </CardBody>
                        </Card>
                        {/* <Card>
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
                        </Card> */}
                        <Card>
                            <CardHeader>Image Link</CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Input type="text" name="primaryPicture" id="primaryPicture" 
                                    defaultValue={this.state.primaryPicture} onChange={this.changePrimaryPictureHandler}/>
                                </FormGroup>
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
                                    <Label for="position">Status</Label>
                                    <Input type="select" name="status" id="status" required
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

                <Button  color="primary" onClick= {this.saveOrUpdatePost}>Save</Button>{' '}
                <Button color="secondary" onClick={this.clickCancelButton}>Cancel</Button>       
            </div>
        )
    }
}