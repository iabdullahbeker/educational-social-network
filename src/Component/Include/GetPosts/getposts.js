import React, { Component } from 'react';
import './getposts.css';
import { Modal, Toast, Input } from 'react-materialize';
import Button from 'react-materialize/lib/Button';
import Row from 'react-materialize/lib/Row';
import cookie from 'react-cookies';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import axios from 'axios';
import { toast } from 'react-toastify';
const $ = window.$;

class GetPosts extends Component {

  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.getPosts();
  }

  state = {
    userId: cookie.load('userId'),
    showloading2: false,
    ShowSubOpen2: false,
    ShowSubT2: false,
    numMaxPhotos: '',
    showModel: false,
    photosC: '',
    posts: [],
    getLoading: true,
    Searchfillter: false,
    comment:''
  }

  commentHandler = (e) => {
    this.setState({
      comment: e.target.value
    })
  }
  ShowSubOpen2 = (e) => {

    if (e.target.value > 0 && e.target.value <= 2) {
      this.setState({ ShowSubOpen2: true });
      this.setState({ ShowSubT2: false });
    } else if (e.target.value > 2) {
      this.setState({ ShowSubOpen2: true });
      this.setState({ ShowSubT2: true });
    } else {
      this.setState({ ShowSubOpen2: false });
      this.setState({ ShowSub2: false });
      this.setState({ ShowSubT2: false });
      this.getPosts();

    }
  }

  ShowSub2 = () => {
    this.setState({ ShowSub2: !this.state.ShowSub2 });


  }


  getSelectYear = () => {
    let selectYear = document.getElementsByName('selectYear')[0].value;
    return selectYear;
  }

  getSelectT = () => {
    if (this.state.ShowSubT == true) {
      let selectYear = document.getElementsByName('selectT')[0].value;
      return selectYear;

    }
  }

  getsubSec = () => {
    var checkboxes = document.getElementsByName('sec[]');

    var vals = "";
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      if (checkboxes[i].checked) {
        vals += checkboxes[i].value + ',';
      }
    }
    return vals;

  }

  //function 


  onSave = (e, post_id) => {
    var element = document.getElementById('s_post' + post_id);
    var save = new FormData();
    save.append('post_id', post_id);
    save.append('uid', cookie.load('uid'));
    save.append('udat', cookie.load('udat'));

    axios.post(`http://uni-social.tk/esn/api/save`, save)
      .then(res => {
        if (res.data)
        element.classList.add('saved');
        else
        element.classList.remove('saved');

      })
  }

  onLike = (e, post_id) => {
    var number = document.getElementById('ln_post' + post_id);
    var element = document.getElementById('l_post' + post_id);
    var save = new FormData();
    save.append('post_id', post_id);
    save.append('uid', cookie.load('uid'));
    save.append('udat', cookie.load('udat'));


    axios.post(`http://uni-social.tk/esn/api/like`, save)
      .then(res => {
        if (res.data) {
          element.classList.add('liked');
          number.innerHTML++;
        }

        else {
          element.classList.remove('liked');
          console.log(number.val);
          number.innerHTML--;
        }

      })
  }

  Searchfillter = () => {

    this.setState({ Searchfillter: !this.state.Searchfillter });
    if(!this.state.Searchfillter){
      this.setState({ ShowSubOpen2: false });
      this.setState({ ShowSub2: false });
      this.setState({ ShowSubT2: false });
    }
 
 
  }
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
        toast.warn('Post has been deleted!');
        this.deletePostsFromArray(index);
      })

  }
  //*

  getPosts = () => {

    let checkboxes = '';
    let selectYear = '';
    let selectT = '';
    let p = '';

    if (this.props.User.group_id == 1 || this.props.User.group_id == 3) {
      checkboxes = this.getsubSec();
      selectYear = this.getSelectYear();
      selectT = this.getSelectT();
    } else {
      p = this.props.Page
    }

    this.setState({ getLoading: true });
    const data = { 'selectYear': selectYear, 'sec': checkboxes, 't': selectT, 'p': p, 'udat': cookie.load('udat'), 'uid': cookie.load('uid') };
    axios.post(`http://uni-social.tk/esn/api/getposts`, data)
      .then(res => {
        this.setState({ posts: res.data });
        this.setState({ getLoading: false });
      })
  }

  getComments = ()=>{
    let checkboxes = '';
    let selectYear = '';
    let selectT = '';
    let p = '';

    if (this.props.User.group_id == 1) {
      checkboxes = this.getsubSec();
      selectYear = this.getSelectYear();
      selectT = this.getSelectT();
    } else {
      p = this.props.Page
    }
    const data = { 'selectYear': selectYear, 'sec': checkboxes, 't': selectT, 'p': p, 'udat': cookie.load('udat'), 'uid': cookie.load('uid') };
    axios.post(`http://uni-social.tk/esn/api/getposts`, data)
    .then(res => {
      this.setState({ posts: res.data });
    })
  }



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
          this.getComments();
        })
      this.setState({
        comment: ''
      })
    }
  }


  showImgs = (index, photos) => {
    if (index >= 0 && index < photos.length) {

      this.setState({ showModel: true });
      var previous = index - 1;
      var next = index + 1;
      var length = photos.length - 1;
      var photosC = (
        <div className="slidePhotos" id="slidePhotos" ref={this.setWrapperRef}>
          <div className={"previous " + (index == 0 ? 'nomore' : 'more')} onClick={() => { this.showImgs(previous, photos) }} ><i className="arrowleft"></i></div>
          <div className="slidePhotos-c" id="slidePhotos">
            <div className="siledimg"> <img src={"http://uni-social.tk/files/posts/i-s/" + photos[index].fileName} /> </div>
          </div>
          <div className={"next " + (length == index ? 'nomore' : 'more')} onClick={() => { this.showImgs(next, photos) }}><i className="arrowright"></i></div>
        </div>
      );

      this.setState({ photosC: photosC });
    }

  }

  showComments = (x) =>{
   console.log(x);
    $('#comments_'+x).show();  

  }


  CloseshowImgs = () => {
    this.setState({ showModel: false });

  }



  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }


  setWrapperRef(node) {
    this.wrapperRef = node;
  }


  handleClickOutside(event) {
    if (this.state.showModel && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showModel: false });
    }
  }


  render() {




    var posts = '';
    posts = this.state.posts;
    var loading =
      <div className='timeline'>
        <div className='animated-bg'>
          <div className='p01'></div>
          <div className='p02'></div>
          <div className='p04'></div>
          <div className='p05'></div>
          <div className='p06'></div>
          <div className='p07'></div>
          <div className='p08'></div>
          <div className='p09'></div>
          <div className='p11'></div>
          <div className='p12'></div>
          <div className='p13'></div>
          <div className='p14'></div>
          <div className='fp15'></div>
        </div>
      </div>;

    return (
      <React.Fragment>



        <div className={'modelover ' + (this.state.showModel ? 'modelShow' : null)}>
          <div className="CloseSlidePhotos" id="CloseslidePhotos" onClick={this.CloseshowImgs}>x</div>


          {this.state.photosC}

        </div>

        {!this.state.Searchfillter && (this.props.User.group_id == 1 || this.props.User.group_id == 3) ?
          <div className="Searchfillter0" onClick={this.Searchfillter}><span class="icosearchf"></span></div>
          : null
        }

        {this.state.Searchfillter && (this.props.User.group_id == 1 || this.props.User.group_id == 3) ?
          <div className="filtterSerch">
            <div className="ClosefiltterSerch" onClick={this.Searchfillter}>x</div>
            <div className="selectYear2">

              <div className="category">
                <select id="main_category" name="selectYear" onChange={this.ShowSubOpen2} className="main_category smallselect right">
                  <option value="0" >Computer Science</option>
                  <option value="1" >First Year</option>
                  <option value="2" >Second Year</option>
                  <option value="3" >Third Year</option>
                  <option value="4" >Fourth Year</option>
                </select>
              </div>


              {this.state.ShowSubT2 ?
                <div className="category">
                  <select id="main_category" name="selectT" className="main_category smallselect right">
                    <option value="0">cs & is</option>
                    <option value="cs" >cs</option>
                    <option value="is" >is</option>
                  </select>
                </div>
                : null}



              {this.state.ShowSubOpen2 ?

                !this.state.ShowSub ?
                  <div className="sub_copen sub_copen2 noselect" onClick={this.ShowSub2}>+ Get posts From Sections</div>
                  :
                  <div className="sub_copen sub_copen2 noselect" onClick={this.ShowSub2}>+ Get Post From All Year</div>


                : null
              }




              {this.state.ShowSub2 ?
                <div className="sub_c">

                  <div className="sub_cc noselect">
                    <input name="sec[]" type="checkbox" id="inlineCheckbox1" value="1" onClick={this.ActiveBottom} />
                    <label for="inlineCheckbox1">Sec 1</label>
                  </div>

                  <div className="sub_cc noselect">
                    <input name="sec[]" type="checkbox" id="inlineCheckbox2" value="2" onClick={this.ActiveBottom} />
                    <label for="inlineCheckbox2">Sec 2</label>
                  </div>

                  <div className="sub_cc noselect">
                    <input name="sec[]" type="checkbox" id="inlineCheckbox3" value="3" onClick={this.ActiveBottom} />
                    <label for="inlineCheckbox3">Sec 3</label>
                  </div>

                  <div className="sub_cc noselect">
                    <input name="sec[]" type="checkbox" id="inlineCheckbox4" value="4" onClick={this.ActiveBottom} />
                    <label for="inlineCheckbox4">Sec 4</label>
                  </div>

                </div>
                : null}

              {this.state.ShowSubOpen2 ?
                <div className="Searchfillter" onClick={this.getPosts}>
                  {this.state.getLoading ? <p>loading ...</p> : <p><span class="icosearchf"></span>Search</p>}
                </div>

                : null}

            </div>

          </div>

          : null
        }

{cookie.load('type') != 3 ?
this.state.getLoading ? loading :
          posts.map((post, index) => {
            return post.postStatus != 0 ?
              
                <div key={post.postId} className="post-h">
                  <div className="post">

                    <div className="p-user">
                      <div className="p-useri">
                        {
                          post.user[0].userImg != null ?
                            <img src={'http://uni-social.tk/files/uImg/i-ss/' + post.user[0].userImg} />
                            :
                            <img src="http://localhost/4up/ico/user0.jpg" />
                        }

                      </div>

                      <div className="box-name">
                        <div className="p-usern">{post.user[0].userName}</div>

                        <div className="p-usery">
                          <span className="p-usery1">{post.postTime}> </span>
                          <span className="p-usery2">{post.section[0].sectionName}.</span>
                        </div>
                      </div>
                      {post.user[0].userId == cookie.load('userId') || cookie.load('type') == 1 ? <div className="p-option-c noselect">
                        <Dropdown>
                          <DropdownTrigger><span className="p-option " id={post.postId}>...</span></DropdownTrigger>
                          <DropdownContent>
                            <div className="p-muni">
                              <ul>
                                <li onClick={() => this.deletePost(post.postId, index)}><a>delete</a></li>
                              </ul>
                            </div>
                          </DropdownContent>
                        </Dropdown>
                      </div>

                        : null}
                      {/*
          <Modal
                header='Post'
                fixedFooter
                
                >
                <Input type='textarea' defaultValue={post.content} rows="6" onChange={this.props.updateState} />
                <Row>
                <Button onClick ={()=>this.props.updatePost(post.postId)}>Update</Button>
                <Button onClick ={()=>this.props.deletePost(post.postId,index)}>Delete</Button>
                </Row>
          </Modal>
          */}
                    </div>

                    <div className="p-userp">
                      <pre>
                        {post.postContent}
                      </pre>
                    </div>

                    <div className="p-photos">
                      {
                        post.Photos[0] != '' ? (
                          post.Photos.map((img, index) => (
                            img.fileType == 1 ? (

                            post.countPhotos >= 4 ?
                              this.state.numMaxPhotos = 4
                              :
                              this.state.numMaxPhotos = post.countPhotos,

                            index <= 3 ?
                              (
                                post.countPhotos > 4 && index == 3 ?

                                  <div className={'moreimge ' + post.Photos[0].filespace}>
                                    <div className={'showimg ' + post.Photos[0].filespace + ' num' + this.state.numMaxPhotos + ' i' + index}>
                                      <div className={'imgs_' + this.state.numMaxPhotos}>
                                        <a onClick={() => { this.showImgs(index, post.Photos) }} className={'a-' + index}>
                                          <img src={'http://uni-social.tk/files/posts/i-s/' + img.fileName} />
                                          <div className="moreimge_count">+{post.countPhotos - 4}</div>

                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  :

                                  <div className={'showimg ' + post.Photos[0].filespace + ' num' + this.state.numMaxPhotos + ' i' + index}>
                                    <div className={'imgs_' + this.state.numMaxPhotos}>
                                      <a onClick={() => { this.showImgs(index, post.Photos) }} className={'a-' + index}>
                                        <img src={'http://uni-social.tk/files/posts/i-s/' + img.fileName} />
                                      </a>
                                    </div>
                                  </div>

                              ) : null
                          
                          
                              ):

                              img.fileType == 2 ? 
                              (
                              <div className={'showimg v' + post.Photos[0].filespace + ' num' + this.state.numMaxPhotos + ' i' + index}>
                              <div className={'imgs_' + this.state.numMaxPhotos}>
                              <a   className={'a-' + index}>

                              <video controls='1' loop='1'  >
                              <source src={'http://uni-social.tk/files/videos/' + img.fileName}  type='video/mp4' />
                              </video>

                              </a>
                              </div>
                              </div>
                             ):

                            img.fileType == 3 ? 
                            (
                            <div className={'showFiles' + post.Photos[0].filespace + ' num' + this.state.numMaxPhotos + ' i' + index}>
                            <div className={'showFiles-c'}>

                            <div className="shF-l">
                            <div className={'shF-ico ' + img.fileBType}></div>

                            <div className="shF-l-cc">
                            <div className="shF-name">{img.fileBName}</div>
                            <div className="shF-type" >{img.fileBType}</div>
                            </div>
                           </div>

                            <div className="shF-r">
                            <a target='_blank'  href={'http://uni-social.tk/files/files/'+img.fileName} >
                            <div className="shF-down-ico"></div>
                            </a>
                            </div>


                            </div>
                            </div>
                          ):null


                            

                          ))
                        ) : null


                      }
                    </div>

                    <div className="box-soc">

                      <div className="like" >
                        <div className='like-wrapper'>

                          <a className={"like-button " + (post.userLike ? 'liked' : null)} id={'l_post' + post.postId} onClick={(e) => { this.onLike(e, post.postId) }}>
                            {<span id={'ln_post' + post.postId} className='likenum'>{post.countLike != 0 ? post.countLike : null}</span>}
                            <span className='like-icon'>
                              <div className='heart-animation-1'></div>
                              <div className='heart-animation-2'></div>
                            </span>Like
                         </a>


                          <a className={"comment-button " + (post.userLike ? 'liked' : 'oo')} id={'c_post' + post.postId}  onClick={() => { this.showComments(post.postId) }}>
                          {<span id={'C_post' + post.postId} className='Commentsnum'>{post.Comments.length != 0 ? post.Comments.length : null}</span>}

                            <span className='comment-icon'>
                              <div className='heart-animation-1'></div>
                              <div className='heart-animation-2'></div>
                            </span> Comment
                    </a>


                          <a className={"save-button " + (post.userSave ? 'saved' : null)} id={'s_post' + post.postId} onClick={(e) => { this.onSave(e, post.postId) }}>
                            <span className='save-icon'>
                              <div className='heart-animation-1'></div>
                              <div className='heart-animation-2'></div>
                            </span> Save
                   </a>

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className={"comments-h "+this.props.Page}  id={'comments_' + post.postId} >

                    <div className="comment">
                      <div className="com-c">
                        <div className="com-uimg">
                          {
                            this.props.User.image != null ?
                              <img src={'http://uni-social.tk/files/uImg/i-ss/' + this.props.User.image} />
                              :
                              <img src="http://localhost/4up/ico/user0.jpg" />
                          }
                        </div>
                        <div className="com-in">
                          <input type="text" onChange={this.commentHandler} onKeyPress={(e) => {

                            this.addComment(e, post.postId)

                          }}
                            name="comment" placeholder="Write a comment ..." />
                        </div>
                      </div>

                    </div>
                    {
                      post.Comments ?
                        post.Comments.map((comment, index) => {
                          return <div className="comment" key={index}>
                            <div className="com-c">
                              <div className="com-uimg">
                                {
                                  comment.user[0].userImg != null ?
                                    <img src={'http://uni-social.tk/files/uImg/i-ss/' + comment.user[0].userImg} />
                                    :
                                    <img src="http://localhost/4up/ico/user0.jpg" />
                                }
                              </div>
                              <div className="com-cc">
                                <div className="com-uname"><a href="#">{comment.user[0].userName}</a> </div>
                                <div className="com-utext">
                                  <p>{comment.commentContent}</p>
                                </div>

                                {/*
                                <div className="com-umenu">
                                  <div className="com-like com-mm"><i className="com-ico like-i"></i> <span>15</span></div>
                                  <div className="com-Reply "><i className="com-ico reply-i"></i> <span>8</span></div>
                                  <div className="com-time"><span>. 7hrs</span></div>
                                </div>
                                */}

                               </div>

                              </div>

                            </div>

                        })
                        : null
                    }


                  </div>

                </div>

                : null
          })
:null}



{/* -----------------------------------   sec*/}

{cookie.load('type') == 3 ?
this.state.getLoading ? loading :
          posts.map((post, index) => {
            return post.postStatus != 0 ?
              
                <div key={post.postId} className="post-h">
                  <div className="post">

                    <div className="p-user">
                      <div className="p-useri">
                        {
                          post.user[0].userImg != null ?
                            <img src={'http://uni-social.tk/files/uImg/i-ss/' + post.user[0].userImg} />
                            :
                            <img src="http://localhost/4up/ico/user0.jpg" />
                        }

                      </div>

                      <div className="box-name">
                        <div className="p-usern">{post.user[0].userName}</div>

                        <div className="p-usery">
                          <span className="p-usery1">{post.postTime}> </span>
                          <span className="p-usery2">{post.section[0].sectionName}.</span>
                        </div>
                      </div>
                      {post.user[0].userId == cookie.load('userId') || cookie.load('type') == 1 ? <div className="p-option-c noselect">
                        <Dropdown>
                          <DropdownTrigger><span className="p-option " id={post.postId}>...</span></DropdownTrigger>
                          <DropdownContent>
                            <div className="p-muni">
                              <ul>
                                <li onClick={() => this.deletePost(post.postId, index)}><a>delete</a></li>
                              </ul>
                            </div>
                          </DropdownContent>
                        </Dropdown>
                      </div>

                        : null}
                      {/*
          <Modal
                header='Post'
                fixedFooter
                
                >
                <Input type='textarea' defaultValue={post.content} rows="6" onChange={this.props.updateState} />
                <Row>
                <Button onClick ={()=>this.props.updatePost(post.postId)}>Update</Button>
                <Button onClick ={()=>this.props.deletePost(post.postId,index)}>Delete</Button>
                </Row>
          </Modal>
          */}
                    </div>

                    <div className="p-userp">
                      <pre>
                        {post.postContent}
                      </pre>
                    </div>

                    <div className="p-photos">
                      {
                        post.Photos[0] != '' ? (
                          post.Photos.map((img, index) => (
                            img.fileType == 1 ? (

                            post.countPhotos >= 4 ?
                              this.state.numMaxPhotos = 4
                              :
                              this.state.numMaxPhotos = post.countPhotos,

                            index <= 3 ?
                              (
                                post.countPhotos > 4 && index == 3 ?

                                  <div className={'moreimge ' + post.Photos[0].filespace}>
                                    <div className={'showimg ' + post.Photos[0].filespace + ' num' + this.state.numMaxPhotos + ' i' + index}>
                                      <div className={'imgs_' + this.state.numMaxPhotos}>
                                        <a onClick={() => { this.showImgs(index, post.Photos) }} className={'a-' + index}>
                                          <img src={'http://uni-social.tk/files/posts/i-s/' + img.fileName} />
                                          <div className="moreimge_count">+{post.countPhotos - 4}</div>

                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  :

                                  <div className={'showimg ' + post.Photos[0].filespace + ' num' + this.state.numMaxPhotos + ' i' + index}>
                                    <div className={'imgs_' + this.state.numMaxPhotos}>
                                      <a onClick={() => { this.showImgs(index, post.Photos) }} className={'a-' + index}>
                                        <img src={'http://uni-social.tk/files/posts/i-s/' + img.fileName} />
                                      </a>
                                    </div>
                                  </div>

                              ) : null
                          
                          
                              ):

                              img.fileType == 2 ? 
                              (
                              <div className={'showimg v' + post.Photos[0].filespace + ' num' + this.state.numMaxPhotos + ' i' + index}>
                              <div className={'imgs_' + this.state.numMaxPhotos}>
                              <a   className={'a-' + index}>

                              <video controls='1' loop='1'  >
                              <source src={'http://uni-social.tk/files/videos/' + img.fileName}  type='video/mp4' />
                              </video>

                              </a>
                              </div>
                              </div>
                             ):

                            img.fileType == 3 ? 
                            (
                            <div className={'showFiles' + post.Photos[0].filespace + ' num' + this.state.numMaxPhotos + ' i' + index}>
                            <div className={'showFiles-c'}>

                            <div className="shF-l">
                            <div className={'shF-ico ' + img.fileBType}></div>

                            <div className="shF-l-cc">
                            <div className="shF-name">{img.fileBName}</div>
                            <div className="shF-type" >{img.fileBType}</div>
                            </div>
                           </div>

                            <div className="shF-r">
                            <a target='_blank'  href={'http://uni-social.tk/files/files/'+img.fileName} >
                            <div className="shF-down-ico"></div>
                            </a>
                            </div>


                            </div>
                            </div>
                          ):null


                            

                          ))
                        ) : null


                      }
                    </div>
 

                  </div>
 
                </div>

                : null
})
:null}



      </React.Fragment>

    );
  }

}




export default GetPosts;

