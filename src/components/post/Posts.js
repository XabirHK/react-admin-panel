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
        //this.saveCategory = this.saveCategory.bind(this);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
        this.loading = true;
    }

    componentDidMount() {
        this.retrievePosts();
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
        this.props.history.push('/post/add');
    }
    
    render() {
        const { posts} = this.state;
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
                                <th>Title</th>
                                <th>Position</th>
                                <th>Parent</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts && posts.map((post, i) => (
                            <tr key = {post.postId}>
                                <td>{++i}</td>
                                <td>{post.title}</td>
                                <td>{post.category}</td>
                                <td>{post.status}</td>
                                <td>{post.language}</td>
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