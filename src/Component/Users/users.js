import React, {Component} from 'react';
import UnevLeft from './js/Unevleft.js';
import UnevRight from './js/Unevright.js';
import GetPosts from '../Include/GetPosts/getposts.js';
import axios from 'axios';
 

import './css/users.css';
import cookie from 'react-cookies';
const $ = window.$;



 class Users extends Component{

 
state = {
  posts: [],
  post: '',
  updatedPost: '',
  comment: '',
  year:'',
  ads: [],
  user: [],
  Group:[],
  UpCoverLoding:false,
  UpCoverLoding2:false,
  CoverPhoto:'',
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

getGroup = (yearId) => {
  axios.get('http://uni-social.tk/api/v1/yearandsection/getById/' + yearId)
    .then(res => {
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

 

componentDidMount() {
  this.getPosts();
  this.getAds();
  this.getInfoUser();
}


getPosts = () => {
  var data = new FormData();
  data.append('uid', cookie.load('uid'));
  data.append('udat', cookie.load('udat'));
  axios.post(`http://uni-social.tk/esn/api/getposts`, data)
    .then(res => {
      this.getGroup(cookie.load('year'));
      console.log(res.data)
      const posts = res.data;
      this.setState({ posts });
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

    axios.post(`http://www.uni-social.tk/api/v1/post/addcommant`, comment)
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
  post.append('user_id', user_id);
  post.append('content', content);

  //post.append('yearandsection_id', cookie.load('year'));

  axios.post(`http://uni-social.tk/api/v1/post/update/` + id, post)
    .then(res => {
      this.getPosts();
      this.notificationToast("Post Accepted");
    })
}

 

getAds = () => {
  const data = {'udat': cookie.load('udat'), 'uid': cookie.load('uid') };
  axios.post(`http://uni-social.tk/esn/api/getPosterUser`, data).then(res => {
      this.setState({ ads: res.data });
    })
}



onReject = (id) => {

  axios.get(`http://uni-social.tk/api/v1/post/delete/` + id)
    .then(res => {
      this.getPosts();
      this.notificationToast("Post Rejected.");
    })

}

// onTest = ()=>{

//   var post = new FormData();
//       post.append('email', 'a@gmail.com');
//       post.append('password', 'a');

//   axios.post(`
//   http://uni-social.tk/api/v1/users/login`, post )
//   .then(res => {
//    console.log(res.data)   
//   }) 

// }
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

  yearName = ()=>{
    switch(this.state.year){
        case "1":return "First Year";
        case "2":return "Second Year";
        case "3":return "Third Year";
        case "4":return "Fourth Year";
        default: return ".";
    }
}

 




// up cover 
upCoverOpen = () => {
  document.getElementById('inCover').click();
}


upCover = (e) => {
  this.setState({UpCoverLoding2: true});
  this.setState({UpCoverLoding: true});
 
    let file = e.target.files[0];
    var data = new FormData();
    data.append('file', file);
    data.append('typefile', 'userCover');
    data.append('uid', cookie.load('uid'));
    data.append('udat', cookie.load('udat'));

    axios.post('http://uni-social.tk/esn/api/up', data).then(res => {

      if (res.data.status == true) {
        const fileName = res.data.file.fileName;
        this.setState({ CoverPhoto: fileName });
        console.log(this.state.CoverPhoto);

        $('.user-cover-cc').css("background-image", "url(http://uni-social.tk/files/uCover/i-s/"+fileName+")");  
        this.setState({UpCoverLoding2: false});

      }
    });

}

changeCover = () =>{
  this.setState({UpCoverLoding2: true});


  var data = new FormData();
  data.append('uCover', this.state.CoverPhoto);
  data.append('uid', cookie.load('uid'));
  data.append('udat', cookie.load('udat'));

  axios.post('http://uni-social.tk/esn/api/changeCover', data).then(res => {

    if (res.data == true) {
 
      this.setState({UpCoverLoding2: false,UpCoverLoding: false});

    }
  });

}

render(){ 
      if(!cookie.load('userId'))
      {
        window.location = "/";
      }
        return(
        <React.Fragment>
          
      <div class="home-r">
        <div class="home-w">

        <div class="ccc home-cc ">
            <div class="ccc home-ccc">
                   <div class="user-cover-c">
                   {console.log(this.state.user.cover)}
                   {
                            this.state.user.cover != null ?
                            
                             <div className="user-cover-cc ii" style={{ background: "url(http://uni-social.tk/files/uCover/i-s/"+this.state.user.cover+ ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
                             :

                             this.state.UpCoverLoding2 == false ?
                             <div className="user-cover-cc"></div> 
                             :   
                             <div className="user-cover-cc"><div class="lodingcover"></div></div> 
                                                
                   }

                     {this.state.UpCoverLoding == false && this.state.UpCoverLoding2 == false ?
                      <div class="change-cover-c"><div class="change-cover" onClick={this.upCoverOpen}>
                        <i class="ico-cover"></i> <p>Update Cover Photo</p>
                      </div></div>
                      :
                      this.state.UpCoverLoding2 == false ?
                      <div class="change-cover-c"><div class="change-cover-sub" onClick={this.changeCover}>
                       Save Change
                      </div></div>
                      :null
                      
                      }

                      <input type="file" name="file" onChange={this.upCover} id="inCover" style={{ display: "none" }} />


                   </div>

          <UnevLeft yearName={this.yearName} User={this.state.user} />
          <div className="ccc center-r center-margin">
            <div className="center-w ">
            <GetPosts Page='u' User={this.state.user} yearName={this.yearName} deletePost = {this.deletePost} updateState = {this.updateState}  updatePost={this.updatePost} posts={this.state.posts} />


            </div>
        </div>
        </div>
          <UnevRight ads={this.state.ads}/>
         
          </div>
 
 </div>
 </div>
         </React.Fragment>

        ); }
  
}

export default Users;

