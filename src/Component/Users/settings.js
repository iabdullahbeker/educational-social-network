import React, {Component} from 'react';
import axios from 'axios';


import './css/settings.css';
import cookie from 'react-cookies';

const $ = window.$;

 class Users extends Component{

 
  state ={
    posts : [],
    post : '',
    updatedPost :'',
    year:''
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

        
          <div class="setting-c">
              <div class="setting-cc">
                  <div class="set-title">Account settings ...</div>
                  <div class="set-center">

                  	  <div class="boxs">
                          <div class="boxs-title" id="showboxEmail">Email </div>
                          <div class="boxs-center" id="boxEmail">
                          	<input type="text" value="a@gmail.com" name="email" />
                          	<input type="submit" value="save" />
                          </div>
                      </div>

                      <div class="boxs">
                          <div class="boxs-title" id="showboxPass">Password </div>
                          <div class="boxs-center" id="boxPass">
                          	<input type="text" placeholder="Current password" name="password1" />
                          	<input type="text" placeholder="new password" name="password2" />
                          	<input type="text" placeholder="Retype new password" name="password3"/>
                          	<input type="submit" value="save" />
                          </div>
                      </div>
                  </div>
              </div>

              
          </div>
       
    </div>
    </div>
         </React.Fragment>

        ); }
  
}

$(function(){
  $('#showboxPass').click(function(){
    $("#boxEmail").hide();
    $("#boxPass").toggle();
  })
  $('#showboxEmail').click(function(){
    $("#boxEmail").toggle();
    $("#boxPass").hide();

  })

})

export default Users;

