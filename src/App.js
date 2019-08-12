import React, { Component } from 'react';
import {BrowserRouter , Route} from 'react-router-dom';

import Header from './Component/Include/Header/header';
import Index from './Component/Index/index';
import Saved from './Component/Index/saved';
import Gropus from './Component/Groups/groups';
import Users from './Component/Users/users';
import Settings from './Component/Users/settings';
import Complaint from './Component/Index/Complaint';
import Question from './Component/Index/Question';
import './App.css';
import cookie from 'react-cookies';
import Login from './Component/Login/login';
import axios from 'axios';

import HeaderLogin from './Component/Include/Header/header-login';
 
class App extends Component {

  state= {
    userId:null,
    user:[]
  }
//this is life cycle

  componentWillMount() {
    this.setState({ userId: cookie.load('userId') });
    this.getInfoUser();
  }

  getInfoUser = () => {
    var id = cookie.load('userId');

    axios.get('http://uni-social.tk/api/v1/users/getById/'+id)
      .then(res => {
        this.setState({ user: res.data });
      })
  }

  onLogin =(userId,group,year,type,token)=> {
    //this.setState({ userId })
    cookie.save('userId', userId);
    cookie.save('group', group);
    cookie.save('year', year);
    cookie.save('type', type);
    this.getInfoUser();
    this.getCookie(token);

  }
 
  getCookie = (x)=>{
    var login = new FormData();
    login.append('tok', x);
      axios.post('http://uni-social.tk/esn/api/getC', login ).then(res => {
        if(res.data.status == 'true'){
        //  console.log(res.data);
          cookie.save('uid', res.data.uid);
          cookie.save('udat', res.data.udat);
          window.location = "/";
        }
  
      });
  }


  onLogout=()=> {
    cookie.remove('userId', { path: '/' });
    cookie.remove('group');
    cookie.remove('year');
    cookie.remove('type');
    cookie.remove('utoken');
    cookie.remove('uid');
    cookie.remove('udat');
    this.setState({
      userId:null
    })
  }

  render() {
    if(!this.state.userId){
      return(
        <React.Fragment>
              <HeaderLogin logout = {this.onLogout} />
              <Login onLogin = {this.onLogin}/>   
        </React.Fragment>       
       );
    }

    
    return (
      <BrowserRouter>
      <div className="App">
        <Header logout = {this.onLogout} User={this.state.user}/>
                    <div className="home-r">
                    <div className="home-w">
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/groups" component={Gropus} />
                    <Route exact path="/saved" component={Saved} />
                    <Route exact path="/complaint" component={Complaint} />
                    <Route exact path="/question" component={Question} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/" component={Index}   />
                    </div> 
                    </div> 
        </div>
        
      </BrowserRouter>

    );
  }
}

export default App;
