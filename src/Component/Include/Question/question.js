import React, {Component} from 'react';
//import './getposts.css';
import cookie from 'react-cookies';
import Dropdown, { DropdownTrigger, DropdownContent} from 'react-simple-dropdown';

import axios from 'axios';

 class Question extends Component{
   
    render(){ 
 

        var posts = this.props.questions;
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
            { posts.length == 0 ? loading :
                posts.map((post,index) => {

                return <div key={post.id} className="post-h">
    <div className="post">
        <div className="p-user">
            <div className="p-useri">
                <img src={"http://uni-social.tk/files/uImg/i-ss/"+post.user.image} /></div>

            <div className="box-name">
                <div className="p-usern">{post.user.name}</div>
                
                <div className="p-usery">
                    <span className="p-usery1">10 hrs > </span>
                    <span className="p-usery2">Year 1.</span>
                    <span className="p-usery3">Sec 1</span>
                </div>
            </div>
           
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
                {post.content}
            </pre>
        </div>

        <div className="comments-h">

<div className="comment">
    <div className="com-c">
        <div className="com-uimg">
                 {
                    // this.props.User.image != null ?
                    // <img src={'http://uni-social.tk/files/uImg/i-ss/'+this.props.User.image} />
                    //  : 
                    //  <img src="http://localhost/4up/ico/user0.jpg" />
                 }
     </div>
        <div className="com-in">
            <input type="text"  onChange={this.props.comment} onKeyPress={(e) => {
               
                this.props.handleAnswer(e, post.id)
               
            }}
        name="comment" placeholder="Write a Answer ..." />
        </div>
    </div>

</div>
{
    post.askcomment ?
    post.askcomment.map((comment,index)=>{
        return  <div className="comment" key={index}>
        <div className="com-c">
            <div className="com-uimg">
            {/* {
                   comment.user[0].userImg != null ?
                    <img src={'http://uni-social.tk/files/uImg/i-ss/'+comment.user.userImg} />
                     : 
                      <img src="http://localhost/4up/ico/user0.jpg" />
          } */}
          </div>
            <div className="com-cc">
                <div className="com-uname"><a href="#">Abdullah</a> </div>
                <div className="com-utext">
                    <p>{comment.comment}</p>
                </div>
                <div className="com-umenu">
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

</div>
}
)}

 </React.Fragment>

        ); }
  
}

 

export default Question;

