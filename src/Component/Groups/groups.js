import React, {Component} from 'react';
import Gnevleft from './js/Gnevleft.js';
import Gnevright from './js/Gnevright.js';
import GetPosts from '../Include/GetPosts/getposts.js';
import axios from 'axios';
import AddPost from '../Include/AddPost/addpost.js';


import './css/groups.css';
import cookie from 'react-cookies';

 class Groups extends Component{
   
  state ={
    posts : [],
    post : '',
    updatedPost :'',
    year:'',
    section:'',
    comment:'',
    user:[],
    ads: [],

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
  notificationToast = (message)=>{
    window.Materialize.toast(message, 3000);
  }
//*

//*delete Posts
  deletePostsFromArray = (index)=>{
    var posts = this.state.posts;
    posts.splice(index ,1 )
    this.setState({
      posts
    })
  }

  deletePost = (id,index)=>{

    axios.get(`http://uni-social.tk/api/v1/post/delete/`+id)
    .then(res => {
      this.deletePostsFromArray(index);
      this.notificationToast("Post Deleted.");
    })
  
  }
  //*
  //*update posts
  //update current state of post to the new value
    updateState=(e)=>{
      this.setState({
        updatedPost:e.target.value
      })
    }

    updatePost = (id)=>{
      var post = new FormData();
        post.append('content', this.state.updatedPost);
        post.append('user_id', 2);
        post.append('yearandsection_id', 1);

    axios.post(`http://uni-social.tk/api/v1/post/update/`+id, post )
    .then(res => {
      this.getPosts();
      this.notificationToast("Post Updated");
    })
    }

    getAds = () => {
      const data = {'udat': cookie.load('udat'), 'uid': cookie.load('uid') };
      axios.post(`http://uni-social.tk/esn/api/getPosterUser`, data).then(res => {
          this.setState({ ads: res.data });
        })
    }

    //*
//get post from database

componentDidMount() {
  if(cookie.load('type') !== "2")
       window.location = "/";
  this.getInfoUser();
  this.getPosts();
  this.getAds();
}

getPosts = () => {
  var data = new FormData();
  data.append('uid', cookie.load('uid'));
  data.append('udat', cookie.load('udat'));
  axios.post(`http://uni-social.tk/esn/api/getposts`, data)
    .then(res => {
      const posts = res.data;
      this.setState({ posts });
    })
}

 

  
//update post variable in state to the current text 
postHandler = (e) =>{
    this.setState({
        post:e.target.value
    })
}
 

commentHandler = (e) =>{
  this.setState({
      comment:e.target.value
  })
}

  
getData = (data) => {
  this.child.current.getPosts();     
}



addComment = (event,post_id) =>{
  if (event.key === 'Enter') {

  var comment = new FormData();
        comment.append('comment', this.state.comment);
        comment.append('user_id', cookie.load('userId'));
        comment.append('post_id', post_id);

    axios.post(`http://www.uni-social.tk/api/v1/post/addcommant`, comment )
    .then(res => {

    this.getPosts();
    this.setState({
      comment:''
    }) 
  })
  }
}

//*
  //*
    render(){ 
      if(!cookie.load('userId'))
      {
        window.location = "/";
      }
        return(
        <React.Fragment>
          
          <Gnevleft />
          <div className="ccc center-r">
            <div className="center-w">
            <AddPost  sendData={this.getData} change = {this.postHandler} Page='g' User={this.state.user} value = {this.state.post} />
            <GetPosts ref={this.child}  LodingPosts={this.getData}    User={this.state.user} Page='g'  comment={this.commentHandler} value={this.state.comment} onComment={this.addComment} sectionName={this.sectionName} yearName={this.yearName} deletePost={this.deletePost}  />
            </div>
        </div>
          <Gnevright  ads={this.state.ads} />
         </React.Fragment>

        ); }
  
}

export default Groups;

