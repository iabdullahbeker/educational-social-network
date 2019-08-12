import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import './header.css';


 class HeaderLogin extends Component{
    render(){ return( 
        
        <React.Fragment>
  <header>
    <div className="h-r">
        <div className="h-w">

            <div className="h-left">
                <div className="cc home">
                    <i className="ico icologo"></i>
                </div>

                <div className="inputSer">
                    <input className="inputcc" placeholder="search ..." />
                    <span className="icosearch"></span>
                </div>

            </div>

            <div className="h-right"> 
                   <div className="hr-muni">...</div>
             </div>
            
         </div>   
    </div>
</header>
         </React.Fragment>

    );  }
  
}

 
export default HeaderLogin;

