import React, { Component } from 'react';
import InevLeft from './js/Inevleft.js';
import InevRight from './js/Inevright.js';
import GetPosts from '../Include/GetPosts/getposts.js';
import axios from 'axios';
import AddPost from '../Include/AddPost/addpost.js';
import './css/index.css';
import cookie from 'react-cookies';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Index extends Component {

  state = {
    posts: [],
    post: '',
    updatedPost: '',
    comment: '',
    ads: [],
    user: [],
    Group:[],
    pending:[]
  }
 
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

 

  // get info user 
  getInfoUser = () => {
    var id = cookie.load('userId');

    axios.get('http://uni-social.tk/api/v1/users/getById/'+id)
      .then(res => {
        this.setState({ user: res.data });
        console.log(res.data);
      })
  }
//

  getGroup = (yearId) => {
    axios.get('http://uni-social.tk/api/v1/yearandsection/getById/' + yearId)
      .then(res => {
        cookie.save('studentYearName', res.data.name);
        this.setState({Group: res.data})})
  }
  //*show toast message 
  notificationToast = (message) => {
    window.Materialize.toast(message, 3000);
  }
  //*

  //*delete Posts
  deletePostsFromArray = (index) => {
    var posts = this.state.posts;
    posts.splice(index, 1)
    this.setState({
      posts
    })
  }

  deletePost = (id, index) => {

    axios.get(`http://uni-social.tk/api/v1/post/delete/` + id)
      .then(res => {
        this.deletePostsFromArray(index);
      })

  }
  //*
  //*update posts
  //update current state of post to the new value
  updateState = (e) => {
    this.setState({
      updatedPost: e.target.value
    })
  }

  updatePost = (id) => {
    var post = new FormData();
    post.append('content', this.state.updatedPost);
    post.append('user_id', cookie.load('userId'));
    //post.append('yearandsection_id', cookie.load('year'));

    axios.post(`http://uni-social.tk/api/v1/post/update/` + id, post)
      .then(res => {
        this.getPosts();
        this.notificationToast("Post Updated");
      })
  }
  //*
  //get post from database

  getAds = () => {
    const data = {'udat': cookie.load('udat'), 'uid': cookie.load('uid') };
    axios.post(`http://uni-social.tk/esn/api/getPosterUser`, data).then(res => {
        this.setState({ ads: res.data });
      })
  }

  componentDidMount() {
    this.getPosts();
    this.getAds();
    this.getInfoUser();
    this.getPendingPosts();
  }

  
//http://localhost/esn/api/getposts
//
  getPosts = () => {
    var data = new FormData();
    data.append('uid', cookie.load('uid'));
    data.append('udat', cookie.load('udat'));
    data.append('p', 'h');
    axios.post(`http://uni-social.tk/esn/api/getposts`, data)
      .then(res => {
        this.getGroup(cookie.load('year'));
        console.log(res.data)
        this.setState({ posts:res.data });
      })
  }
  //*
 
  //Add Post to database


  addComment = (event, post_id) => {
    if (event.key === 'Enter') {
      event.target.value = ''
      var comment = new FormData();
      comment.append('comment', this.state.comment);
      comment.append('user_id', cookie.load('userId'));
      comment.append('post_id', post_id);

      axios.post(`http://uni-social.tk/api/v1/post/addcommant`, comment)
        .then(res => {

        }).catch((error) => {
          this.setState({
            comment: ''
          })
          this.getPosts();
        })
      this.setState({
        comment: ''
      })
    }
  }

  onAccept = (id, user_id, content) => {
    // alert('alert')
    var post = new FormData();
    post.append('status', 1);
    post.append('yearandsection_id', user_id);
    post.append('content', content );

    //post.append('yearandsection_id', cookie.load('year'));

    axios.post(`http://uni-social.tk/api/v1/post/update/` + id, post)
      .then(res => {
        this.getPendingPosts();
        toast.success("Post Accepted");
      })
  }

 

  getPendingPosts = ()=>{

    axios.get('http://uni-social.tk/api/v1/post')
      .then(res => {
        this.setState({ pending: res.data });
      })
    
  }



  onReject = (id) => {

    axios.get(`http://uni-social.tk/api/v1/post/delete/` + id)
      .then(res => {
        this.getPendingPosts();
        toast.warn("Post Rejected");
      })

  }

  
  getData = (data) => {
    this.child.current.getPosts();     
  }

 

  //update post variable in state to the current text 
  postHandler = (e) => {
    this.setState({
      post: e.target.value
    })
  }

  commentHandler = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  //*

  //set Year 

  // accept posts



  render() {
    return (
      <React.Fragment>

        <InevLeft onAccept={this.onAccept} User={this.state.user} Group={this.state.Group} onReject={this.onReject} pendingPosts={this.state.pending} yearName={this.yearName} sectionName={this.sectionName} />
        <div className="ccc center-r">
          <div className="center-w">

             <AddPost sendData={this.getData} getPost={this.getPosts} Page='h' User={this.state.user} change={this.postHandler} value={this.state.post} />
            <GetPosts ref={this.child}  LodingPosts={this.getData}  Group={this.state.Group}  User={this.state.user} Page='h'  comment={this.commentHandler} value={this.state.comment} onComment={this.addComment} sectionName={this.sectionName} yearName={this.yearName} deletePost={this.deletePost}  />

          </div>
        </div>

        <InevRight ads={this.state.ads} />


      </React.Fragment>

    );
  }

}

export default Index;

