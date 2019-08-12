import React, { Component } from 'react';
import InevLeft from './js/Inevleft.js';
import axios from 'axios';
import './css/index.css';
import cookie from 'react-cookies';
import Question from '../Include/Question/question';

class Questions extends Component {

state ={
    questions:[],
    user:[],
    answer : ''
    }
    getInfoUser = () => {
      var id = cookie.load('userId');
  
      axios.get('http://uni-social.tk/api/v1/users/getById/' + id)
        .then(res => {
          this.setState({ user: res.data });
        })
    }
    //
  

loadQuestions = ()=>{
    axios.get(`http://www.uni-social.tk/api/v1/ask`)
    .then(res => {
      //console.log(res.data)
      const questions = res.data;
      this.setState({ questions });
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

handleAnswer = (event,id)=>{
    if (event.key === 'Enter') {
        event.target.value = ''
        var comment = new FormData();
        comment.append('comment', this.state.answer);
        comment.append('user_id', cookie.load('userId'));
        comment.append('ask_id', id);
        axios.post(`http://www.uni-social.tk/api/v1/ask/addcommant`, comment)
          .then(res => {
          }).catch((error) => {
            this.setState({
              comment: ''
            })
            this.loadQuestions();
        })
      }
}

commentHandler = (e) => {
    this.setState({
      answer: e.target.value
    })
  }

componentDidMount() {
    this.loadQuestions();
    this.getInfoUser();
  }
    render(){
        return (
            <React.Fragment>
                          <InevLeft  User={this.state.user} questions={this.state.questions}/>

                          <div className="ccc center-r">
            <div className="center-w">
               <Question  comment={this.commentHandler} handleAnswer={this.handleAnswer} questions={this.state.questions}/>
               </div>
               </div>
            </React.Fragment>
        );
    }
}

export default Questions;
