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
import PostDataService from "../../services/post.service.js";
import { Loader } from '../../vibe/';
//import AddCategory from "./AddCategory";

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.retrievePosts = this.retrievePosts.bind(this);
        this.retrieveCatagories = this.retrieveCatagories.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.state = {
            modal: false,
            posts: []
        };

        this.toggle = this.toggle.bind(this);
        this.loading = true;
    }

    componentDidMount() {
        this.retrievePosts();
        this.retrieveCatagories();
        this.loading = false;
    }

    retrievePosts() {
        PostDataService.getAll()
        .then(response => {
        this.setState({
            posts: response.data
        });
            //console.log(response.data);
        })
        .catch(e => {
            console.log(e);
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

    deletePost(id){
        console.log('delete post id ' + id);
        PostDataService.delete(id).then( res => {
            this.setState({posts: this.state.posts.filter(post => post.id !== id)});
        });
    }
    
    editPost(id){
        this.props.history.push(`/post/add/${id}`);
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
        this.props.history.push('/post/add/_add');
    }
    
    render() {
        const { catagories } = this.state;
        return (
            <div>
                <h3 className="m-b">Current Posts</h3>
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
                                <th className="w-25">Title</th>
                                <th>Category</th>
                                {/* <th>Image Link</th> */}
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.state.posts.map(
                                        (post, i) =>
                            <tr key = {post.id}>
                                <td>{++i}</td>
                                <td>{post.title}</td>
                                <td>{catagories && catagories.map((pCatagory) => (
                                        pCatagory.categoryId == post.category ?  pCatagory.title : ''
                                    ))}</td>
                                {/* <td>{post.primaryPicture}</td> */}
                                <td>{post.status == 1 ? 'Enabled' : 'Disabled'  }</td>
                                <td>
                                <Button onClick={ () => this.editPost(post.id)} color="primary" size="sm"><i className="fa fa-edit"></i></Button>{' '}
                                <Button onClick={ () => {if(window.confirm('Delete the item?')) this.deletePost(post.id)}} color="danger"size="sm"><i className="fa fa-trash"></i></Button>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </CardBody>
                </Card>

            </div>
        )
    }
}