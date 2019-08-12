import React, {Component} from 'react';
//import './getposts.css';
import {Modal,Toast,Input} from 'react-materialize';
import Button from 'react-materialize/lib/Button';
import Row from 'react-materialize/lib/Row';
import cookie from 'react-cookies';
import Dropdown, { DropdownTrigger, DropdownContent} from 'react-simple-dropdown';

import axios from 'axios';

 class GetPosts extends Component{
   
    state= {
        userId:cookie.load('userId')
      }


    render(){ 
 

        var posts = this.props.posts;
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
    
        return(
        <React.Fragment>
            {console.log(posts)}
            { posts.length == 0 ? '' :
                posts.map((post,index) => {

                return post.user.id == cookie.load('userId') ?
                 <div key={post.id} className="post-h">
    <div className="post">

        <div className="p-user">
            <div className="p-useri">
                <img src="/4up/ico/PixekCloudLock-TopArt-648594762.jpg" /></div>

            <div className="box-name">
                <div className="p-usern">{post.user.name}</div>
                
                <div className="p-usery">
                    <span className="p-usery1">10 hrs > </span>
                    <span className="p-usery2">Year 1.</span>
                    <span className="p-usery3">Sec 1</span>
                </div>
            </div>
             {  post.post.user_id == cookie.load('userId')?     
            <div className="p-option-c noselect">
                <Dropdown>
                <DropdownTrigger><span className="p-option "   id={post.post.id}>...</span></DropdownTrigger>
                <DropdownContent>
                <div className="p-muni">
                <ul>
                <li onClick ={()=>this.props.deletePost(post.post.id,index)}><a>delete</a></li>
                </ul>
                </div>
                </DropdownContent>
                </Dropdown>
            </div>
            :null
            }
    {/*
          <Modal
                header='Post'
                fixedFooter
                
                >
                <Input type='textarea' defaultValue={post.content} rows="6" onChange={this.props.updateState} />
                <Row>
                <Button onClick ={()=>this.props.updatePost(post.id)}>Update</Button>
                <Button onClick ={()=>this.props.deletePost(post.id,index)}>Delete</Button>
                </Row>
          </Modal>
          */}
        </div>

        <div className="p-userp">
            <pre>
                {post.post.content}
            </pre>
        </div>

        <div className="box-soc">

            <div className="like" >
                <div className='like-wrapper'>
                    <a className='like-button ' id={'l_post'+post.id} onClick={(e) => { this.Like(e, post.id)}}>
                       {/*<span className='likenum'>8</span>*/}
                        <span className='like-icon'>
                            <div className='heart-animation-1'></div>
                            <div className='heart-animation-2'></div>
                        </span>Like
                    </a>

                    <a className='comment-button' id={'c_post'+post.id} onClick={this.Comment}>
                        <span className='comment-icon'>
                    <div className='heart-animation-1'></div>
                    <div className='heart-animation-2'></div>
                  </span> Comment
                    </a>

                    <a className='save-button saved' id={post.id} onClick={(e) => { this.props.onUnSave(e, post.id)}}>
                        <span className='save-icon'>
                    <div className='heart-animation-1'></div>
                    <div className='heart-animation-2'></div>
                  </span> Save
                    </a>

                </div>

            </div>

        </div>

    </div>

    <div className="comments-h">

        <div className="comment">
            <div className="com-c">
                <div className="com-uimg"><img src="/4up/ico/PixekCloudLock-TopArt-648594762.jpg" /></div>
                <div className="com-in">
                    <input type="text"  onChange={this.props.comment} onKeyPress={(e) => {
                       
                        this.props.onComment(e, post.id)
                       
                    }}
                name="comment" placeholder="Write a comment ..." />
                </div>
            </div>

        </div>
        {
            post.postcomment ?
            post.postcomment.map(comment=>{
                return  <div className="comment" key={comment.id}>
                <div className="com-c">
                    <div className="com-uimg"><img src="/4up/ico/mosalah.png" /></div>
                    <div className="com-cc">
                        <div className="com-uname"><a href="#">Mohamed Salah</a> </div>
                        <div className="com-utext">
                            <p>{comment.comment}</p>
                        </div>
                        <div className="com-umenu">
                            <div className="com-like com-mm"><i className="com-ico like-i"></i> <span>15</span></div>
                            <div className="com-Reply "><i className="com-ico reply-i"></i> <span>8</span></div>
                            <div className="com-time"><span>. 7hrs</span></div>
                        </div>
                    </div>
                </div>
    
            </div> 
            })
            :null
        }
       

    </div>

</div>
:null
}
)}

 </React.Fragment>

        ); }
  
}

 

export default GetPosts;

