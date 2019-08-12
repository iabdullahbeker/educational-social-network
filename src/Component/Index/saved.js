import React, { Component } from 'react';
import SavedPosts from '../Include/Saved/savedposts';
import InevLeft from './js/Inevleft.js';
import axios from 'axios';
import './css/index.css';
import cookie from 'react-cookies';

class Saved extends Component {

state ={
    posts:[],
      user:[],
      Group:[]
    }
    getInfoUser = () => {
      var id = cookie.load('userId');
  
      axios.get('http://uni-social.tk/api/v1/users/getById/' + id)
        .then(res => {
          this.setState({ user: res.data });
          console.log(res.data);
        })
    }
    //
  
    getGroup = (yearId) => {
      axios.get('http://uni-social.tk/api/v1/yearandsection/getById/' + yearId)
        .then(res => {
          console.log(res.data);
          this.setState({Group: res.data})})
    }

loadsaved = ()=>{
    
    axios.get(`http://uni-social.tk/api/v1/seved`)
    .then(res => {
      //console.log(res.data)
      this.getGroup(cookie.load('year'));
      const posts = res.data;
      this.setState({ posts });
    })
}
// get info user 
getInfoUser = () => {
  var id = cookie.load('userId');

  axios.get('http://uni-social.tk/api/v1/users/getById/'+id)
    .then(res => {
      this.setState({ user: res.data });
    })
}
//

onUnSave = (e,id)=>{
    var element = e.target.classList

    axios.get(`http://uni-social.tk/api/v1/seved/delete/${id}`)
    .then(res => {
        element.remove('saved');
        this.loadsaved();

    })
}

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
    })
  
  }

yearName = ()=>{
    return this.state.year;
}


componentDidMount() {
    this.loadsaved();
    this.getInfoUser();
  }
    render(){
        return (
            <React.Fragment>
                          <InevLeft  User={this.state.user} Group={this.state.Group} posts={this.state.posts} yearName = {this.yearName}/>

                          <div className="ccc center-r">
            <div className="center-w">
               <SavedPosts onUnSave = {this.onUnSave} deletePost={this.deletePost} posts={this.state.posts}/>
               </div>
               </div>
            </React.Fragment>
        );
    }
}

export default Saved;
