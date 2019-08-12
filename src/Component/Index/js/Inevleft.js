import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Input, Button, Row } from 'react-materialize';
import cookie from 'react-cookies';
import axios from 'axios';

const $ = window.$;

class InevLeft extends Component {
    //state = {ShowComplaint: true}

    state = {
        openComplaints: false,
        pending: false,
        complaint: '',
        question: ''
    }



    handleComplaint = (e) => {
        let complaint = e.target.value;
        this.setState({
            complaint
        })
    }

    submitComplaint = () => {
        var data = new FormData();
        data.append('user_id', cookie.load('userId'));
        data.append('content', this.state.complaint);
        axios.post(`http://uni-social.tk/api/v1/complaints/add`, data)
            .then(res => {
                console.log(res.data)
                $('.boxi-Complaint').hide();
            })
    }

    handleQuestion = (e) => {
        let question = e.target.value;
        this.setState({
            question
        })
    }

    submitQuestion = () => {
        var data = new FormData();
        data.append('user_id', cookie.load('userId'));
        data.append('content', this.state.question);
        axios.post(`http://uni-social.tk/api/v1/ask/add`, data)
            .then(res => {
                console.log(res.data)
                $('.boxi-Suggestion').hide();
            })
    }

    openPendingPosts = () => {

        var pending = this.state.pending;
        this.setState({
            pending: !pending
        })

    }

    // openPendingPosts

    render() {

        return (
            <React.Fragment>
                <div className="ccc left-r">
                    <div className="left-w left-home"  >

                        <div className="box-left-user">



                            {
                                this.props.User.cover != null ?
                                    <div className="u-poster" style={{ background: "url(http://uni-social.tk/files/uCover/i-s/" + this.props.User.cover + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div>
                                    :
                                    <div className="u-poster"></div>

                            }




                            <div className="u-photo">
                                {
                                    this.props.User.image != null ?
                                        <img src={'http://uni-social.tk/files/uImg/i-ss/' + this.props.User.image} />
                                        :
                                        <div className="u-photoNon2"></div>
                                }

                            </div>

                            <div className="u-name">
                                <h3>{this.props.User.name}</h3>
                            </div>

                            {/*<div className="u-city">6 October, Giza</div>*/}
                        </div>


                        {cookie.load('type') == 2 ?
                            <div className="box-group">
                                <div className="box-group-c">

                                    <NavLink to="/groups">
                                        <div className="box-group-cc">
                                            <div className="group-ico nl-ico-c"></div>
                                            <div className="group-name">{this.props.Group.name}</div>
                                        </div>
                                    </NavLink>

                                </div>
                            </div>
                            : null}
                        <div className="box-more">
                            <div className="more-title">More ...</div>

                            {cookie.load('type') == 2 ?
                                <div>
                                    <div className="box-group">
                                        <div className="box-group-c">
                                            <NavLink to="/saved">
                                                <div className="box-group-cc">
                                                    <div className="m-save-icon nl-ico-c"></div>
                                                    <div className="group-name">Saved</div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className="box-group">

                                        <div className="box-group-c">

                                            <div className="box-group-cc" id="questionCC">
                                                <div className="conversation-icon nl-ico-c"></div>
                                                <div className="group-name">Ask Question</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-group">

                                        <div className="box-group-c">

                                            <div className="box-group-cc" id="complaintCC">
                                                <div className="complaint-icon nl-ico-c"></div>
                                                <div className="group-name">Send Complaint</div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                :
                                cookie.load('type') == 3 ?
                                <div>
                                    <div className="box-group">
                                        <div className="box-group-c">
                                            <NavLink to="/question">
                                                <div className="box-group-cc">
                                                    <div className="conversation-icon nl-ico-c"></div>
                                                    <div className="group-name">Answer Questions</div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    </div>
                                    <div className="box-group">
                                    <div className="box-group-c">
                                        <NavLink to="/complaint">
                                            <div className="box-group-cc">
                                                <div className="complaint-icon nl-ico-c"></div>
                                                <div className="group-name">Show Complaint</div>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                                </div>
                                    : cookie.load('type') == 1 ?
                                        <div className="box-group">
                                            <div onClick={this.openPendingPosts} className="box-group-c">

                                                <div className="box-group-cc">
                                                    <div className="m-save-icon nl-ico-c"></div>
                                                    <div className="group-name ">Pending Posts</div>
                                                </div>

                                                {/* <div className="group-stat">{this.props.posts.length}</div> */}

                                            </div>
                                        </div>
                                        : null
                            }
                            
                        </div>

                    </div>
                </div>

                <div className="boxi-c boxi-Suggestion">
                    <div className="boxi-cc boxi-Suggestion-ccc"  >
                        <div className="boxi-head">
                            <div className="boxi-title">Ask Question</div>
                            <div className="boxi-close boxi-x">x</div>
                        </div>
                        <div className="boxi-center">
                            <div className="boxi-in">
                                <label>Title Your Question :</label>
                                <input type="text" name="" placeholder="..." />
                            </div>

                            <div className="boxi-in">
                                <label>Center Your Question :</label>
                                <textarea value={this.state.question} onChange={this.handleQuestion} placeholder="..."></textarea>
                            </div>
                        </div>

                        <div className="boxi-footer">
                            <div className="boxi-cancel boxi-x">cancel</div>
                            <input type="submit" onClick={this.submitQuestion} className="boxi-sub" value="Send" />

                        </div>
                    </div>
                </div>

                <div className="boxi-c boxi-Complaint" >
                    <div className="boxi-cc boxi-Complaint-ccc">
                        <div className="boxi-head">
                            <div className="boxi-title">Complaint</div>
                            <div className="boxi-close boxi-x">x</div>
                        </div>

                        <div className="boxi-center">
                            <div className="boxi-in">
                                <label>Select the complaint section :</label>
                                <select>
                                    <option>Doctor OR Demonstrator</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="boxi-in" >
                                <label>what's the problem ?</label>
                                <textarea value={this.state.complaint} onChange={this.handleComplaint} placeholder="type your complaint"></textarea>
                            </div>
                        </div>

                        <div className="boxi-footer">
                            <div className="boxi-cancel boxi-x">cancel</div>
                            <input type="submit" onClick={this.submitComplaint} className="boxi-sub" value="Send" />

                        </div>

                    </div>
                </div>

                
                <Modal
                    header='Pending Posts'
                    fixedFooter
                    open={this.state.pending}
                    actions={
                        <Button onClick={this.openPendingPosts}>Close!</Button>
                    }
                >
                    
                    {cookie.load('type') == 1 ? this.props.pendingPosts.length == 0 ? 'No Pending Posts' :
                        this.props.pendingPosts.map((post) => {
                            return post.status == 0 ?
                             <div key={post.id} className="post-h">
                                <div className="post">
                                    <div className="p-user">
                                        <div className="p-useri">
                                            <img src="/4up/ico/PixekCloudLock-TopArt-648594762.jpg" /></div>

                                        <div className="box-name">
                                            <div className="p-usern">{post.user.name}</div>

                                            <div className="p-usery">
                                                {/* <span className="p-usery1">10 hrs > </span> */}
                                                <span className="p-usery2">{post.yearandsection.name}</span>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="p-userp">
                                        <pre>
                                            {post.content}
                                        </pre>
                                    </div>

                                    <div className="box-soc">

                                        <div className="like">
                                            <div className='like-wrapper'>

                                                <a onClick={() => this.props.onAccept(post.id, post.yearandsection_id, post.content+"." )} className='like-button'>
                                                    Accept
    </a>

                                                <a onClick={() => this.props.onReject(post.id)} className='like-comment'>
                                                    Delete
    </a>

                                            </div>

                                        </div>

                                    </div>

                                </div>



                            </div>
                        :null }):null}


                </Modal>


            </React.Fragment>

        );
    }



}


$(function () {
    $('#questionCC').click(function () {
        $('.boxi-Suggestion').show();
    })
    $('.boxi-x').click(function () {
        $('.boxi-Suggestion').hide();
    })

    $('#complaintCC').click(function () {
        $('.boxi-Complaint').show();
    })
    $('.boxi-x').click(function () {
        $('.boxi-Complaint').hide();
    })


});

export default InevLeft;

