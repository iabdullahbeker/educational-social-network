import React from 'react';
import './login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const $ = window.$;
class Login extends React.Component{

    state = {
        username : '',
        password :'',
        logged : false
    }
    notificationToast = (message)=>{
        window.Materialize.toast(message, 3000);
      }

	  onSubmit = (e)=>{
        e.preventDefault();
        var login = new FormData();
        login.append('identification', this.state.username);
        login.append('password', this.state.password);
		//post.append('yearandsection_id', cookie.load('year'));
		console.log(this.state.username,this.state.password);
		
    axios.post('http://uni-social.tk/api/v1/users/login', login )
    .then(res => {
        if(res.data.identification == this.state.username){
            console.log('done')
            this.props.onLogin(res.data.id,res.data.group,res.data.yearandsection_id,res.data.group_id,res.data.api_token);
			this.setState({logged:true})
		   }
		   else
		   
           toast.error("Login Failed Please check your data");

        });
}
    usernameHandler = (e)=>{
        this.setState({
            username:e.target.value
        })
    }
    passwordHandler = (e)=>{
        this.setState({
            password:e.target.value
        })
    }
    render(){
        return(
            <React.Fragment> 
          <ToastContainer />

    <div className="home-r">
       
        <section className="head2-c">
       	    <div className="home-w head2-cc">
        	   <div className="l8 left">
        	    <div className="head2-box1 wow pulse" data-wow-duration="1s" data-wow-delay="0s">
        	    <h1>UniSocial</h1>
        	            	    
        	    
        	    <p>One place for all students</p>
        	    
<ul>
        	        <li><i className="icoh icofast"></i>Fast</li>
        	    	<li><i className="icoh icoorg"></i>Organizer</li>
        	    	<li><i className="icoh icoeasy"></i>easy to use</li>
        	    </ul>
        	    <p>You can share information and get it in a very organized way. You can communicate with colleagues, teachers, and manage the university easily. Register now and be aware of everything that happens right away.</p>
        	   </div>
        	   
        	   
			   </div>
        	 
        	 	<div className="l4 left">
        	 	   <div className="head2-box2 wow pulse" data-wow-duration="1s" data-wow-delay="0s">
        	 	   
					<form id="formLogin" onSubmit={this.onSubmit}>
				     <div className="form-box-cc">
				      <div className="uni-logo"></div>
					  <input className="box-in top10" onChange={this.usernameHandler} placeholder="User Id" id="userid" type="text" />
					  <input className="box-in" onChange={this.passwordHandler} placeholder="Password" id="userid" type="password" />
					  <button type="submit" className="box-sub">Login</button>
					  </div>
					 
					 
					</form>
     	 	        
     	 	        
      	 	        
       	 	       </div>
       	 	        
        	 	</div>
        	 	
        	 
        </div>
        
   
      </section>
      
        <section className="uni-box">
        	<div className="sec-head"><h1>Culture & Science City</h1></div>
 
        	<div className="home-w unis-c">
        		<div className="uni-cc wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0s" >
        			<div className="unicc-img"><img src="/4up/ico/computer-science.jpg" /></div>
        			
        			<div className="unicc-cc">
        			<div className="unicc-name"><h3>Higher Institute of Computer Science</h3></div>
        			<div className="unicc-des"><p>The bachelor degree is equivalent to the degree granted by the Egyptian universities subject to the Law of Organizing Universities No. 49 of 1972 and its executive regulations of the faculties of computers and information systems in the corresponding disciplines.</p>
        			
        			<div className="unicc-more wow bounceIn" data-wow-duration="1s" data-wow-delay="1s" >more info...</div></div>
        			</div>
        			
        		</div>
        		
        		
        		
        	
			</div>
        	
        </section>
        </div>
                
        <footer>
        <div className="home-w">
			<div className="Fr-cc">
				<ul>
					<li><a href="#">UniSocial</a></li>
					<li><a href="#">Help</a></li>
					<li><a href="#">call us</a></li>
					<li><a href="#">Languages</a></li>
					<li><a href="#">Privacy policy</a></li>
				</ul>
			</div>
        </div>
        
        </footer>


	
            </React.Fragment>
        );
    }
}

$(function(){
	$('#newAccount').click(function(){
		$('#formSignup').show();
		$('#formLogin').hide();
		return false;
	})	
	$('#newLogin').click(function(){
		$('#formSignup').hide();
		$('#formLogin').show();
		return false;
	})	
	$('#nexStep2').click(function(){
		$('#step1').hide();
		$('#step2').show();
		return false;
	})
 

})	







export  default Login;