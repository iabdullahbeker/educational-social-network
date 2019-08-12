import React, { Component } from 'react';
import InevLeft from './js/Inevleft.js';
import axios from 'axios';
import './css/index.css';
import cookie from 'react-cookies';
import Complaints from '../Include/Complaint/complaint';

class Complaint extends Component {

state ={
    complaints:[],
      user:[],
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
  
 

loadComplaints = ()=>{
    
    axios.get(`http://uni-social.tk/api/v1/complaints`)
    .then(res => {
      //console.log(res.data)
      const complaints = res.data;
      this.setState({ complaints });
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


componentDidMount() {
    this.loadComplaints();
    this.getInfoUser();
  }
    render(){
        return (
            <React.Fragment>
                          <InevLeft  User={this.state.user} complaints={this.state.complaints}/>

                          <div className="ccc center-r">
            <div className="center-w">
               <Complaints complaints={this.state.complaints}/>
               </div>
               </div>
            </React.Fragment>
        );
    }
}

export default Complaint;
