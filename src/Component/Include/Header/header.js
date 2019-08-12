import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import './header.css';
import Dropdown, { DropdownTrigger, DropdownContent} from 'react-simple-dropdown';
 

const $ = window.$;


 class Header extends Component{
 
 
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
                    <input  className="inputcc" placeholder="search ..." />
                    <span className="icosearch"></span>
                </div>

            </div>

            <div className="h-right">

                <NavLink to="/" className="cc ihome" >
                    <i className="ico icohome"></i>
                </NavLink>

                <Dropdown>
                    <DropdownTrigger>
                    <div className="cc u-cc" id="notfCC"> <i className="ico iconotf"></i> <div className="notnum">7</div> </div>

                    </DropdownTrigger>
                    <DropdownContent>
                     <div className="mun-cc mun-notf">
                        <div className="arrow-up arrow-up-notf"></div>
                        <div className="mun-tit">Notifications</div>
                            <ul className="scroll-1">
                            <li><a href="#">
                                <div className="mun-n-cc">
                                    <div className="mun-nt"><img src="4up/ico/mosalah.png" /></div>
                                    <div className="mun-nr">
                                        <div className="mnr-nru">
                                            <samp>
                                            <span className="mnr-un">Mohamed Salah</span>
                                            <span className="mnr-t"> likes your comment: "‎هو حوار الرحلات المؤهوله للمريخ مكلف‎..."</span>
                                            </samp>
                                            <span   className="mnr-tt">1d</span>
                                        </div>
                                        <div className="mun-n-i"><img src="4up/ico/language.jpg" /></div>

                                    </div>
                                </div>

                                </a>
                            </li>

                            <li><a href="#">
                                <div className="mun-n-cc">
                                    <div className="mun-nt"><img src="4up/ico/PixekCloudLock-TopArt-648594762.jpg" /></div>
                                    <div className="mun-nr">
                                        <div className="mnr-nru">
                                            <samp>
                                            <span className="mnr-un">Mohamed Farag</span>
                                            <span className="mnr-t"> commented on your photo.</span>
                                            </samp>
                                            <span   className="mnr-tt">1d</span>
                                        </div>
                                        <div className="mun-n-i"><img src="4up/ico/Engineering.jpg" /></div>

                                    </div>
                                </div>

                                </a>
                            </li>

                            <li><a href="#">
                                <div className="mun-n-cc">
                                    <div className="mun-nt"><img src="4up/ico/mosalah.png" /></div>
                                    <div className="mun-nr">
                                        <div className="mnr-nru">
                                            <samp>
                                            <span className="mnr-un">Mohamed Salah</span>
                                            <span className="mnr-t"> commented on your photo.</span>
                                            </samp>
                                            <span   className="mnr-tt">1d</span>
                                        </div>
                                        <div className="mun-n-i"><img src="4up/ico/Engineering.jpg" /></div>

                                    </div>
                                </div>

                                </a>
                            </li>

                            <li><a href="#">
                                <div className="mun-n-cc">
                                    <div className="mun-nt"><img src="4up/ico/mosalah.png" /></div>
                                    <div className="mun-nr">
                                        <div className="mnr-nru">
                                            <samp>
                                            <span className="mnr-un">Mohamed Salah</span>
                                            <span className="mnr-t"> commented on your photo.</span>
                                            </samp>
                                            <span   className="mnr-tt">1d</span>
                                        </div>
                                        <div className="mun-n-i"><img src="4up/ico/Economics.jpg" /></div>

                                    </div>
                                </div>

                                </a>
                            </li>

                            <li><a href="#">
                                <div className="mun-n-cc">
                                    <div className="mun-nt"><img src="4up/ico/mosalah.png" /></div>
                                    <div className="mun-nr">
                                        <div className="mnr-nru">
                                            <samp>
                                            <span className="mnr-un">Mohamed Salah</span>
                                            <span className="mnr-t"> commented on your photo.</span>
                                            </samp>
                                            <span   className="mnr-tt">1d</span>
                                        </div>
                                        <div className="mun-n-i"><img src="4up/ico/Social-Service.jpg" /></div>

                                    </div>
                                </div>

                                </a>
                            </li>

                            <li><a href="#">
                                <div className="mun-n-cc">
                                    <div className="mun-nt"><img src="4up/ico/mosalah.png" /></div>
                                    <div className="mun-nr">
                                        <div className="mnr-nru">
                                            <samp>
                                            <span className="mnr-un">Mohamed Salah</span>
                                            <span className="mnr-t"> commented on your photo.</span>
                                            </samp>
                                            <span   className="mnr-tt">1d</span>
                                        </div>
                                        <div className="mun-n-i"><img src="4up/ico/logo1.png" /></div>

                                    </div>
                                </div>

                                </a>
                            </li>

                            <li><a href="#">
                                <div className="mun-n-cc">
                                    <div className="mun-nt"><img src="4up/ico/mosalah.png" /></div>
                                    <div className="mun-nr">
                                        <div className="mnr-nru">
                                            <samp>
                                            <span className="mnr-un">Mohamed Salah</span>
                                            <span className="mnr-t"> commented on your photo.</span>
                                            </samp>
                                            <span   className="mnr-tt">1d</span>
                                        </div>
                                        <div className="mun-n-i"><img src="4up/ico/Engineering.jpg" /></div>

                                    </div>
                                </div>

                                </a>
                            </li>
                            <div className="mn-lood">loding ...</div>

                        </ul>
                    </div>
                    </DropdownContent>
                </Dropdown>

                <Dropdown>
                    <DropdownTrigger>
                    <div className="cc u-cc" id="helpCC">
                    <i className="ico icohelp"></i>
                    </div>
                    </DropdownTrigger>
                    <DropdownContent>
                    <div className="mun-cc mun-h">
                        <div className="arrow-up arrow-up-h"></div>
                            <div className="mun-center">
                                <div className="mun-h-in">
                                    <div className="mun-h-in-c"><input type="text" name="" placeholder="how can we help ?" /></div>
                                </div>

                                <div className="mun-h-cc">
                                <ul>
                                <li><a href="#">Profile</a></li>
                                <li><a href="/settings">Settings</a></li>
                                <li><a href="#">LogOut</a></li>
                                </ul>
                                <div className="mun-h-o"><i className="mun-ico ico-problem"></i><span>Report a Problem</span></div>
                                </div>

                            </div>
                     </div>
                    </DropdownContent>
                </Dropdown>

                <Dropdown>
                    <DropdownTrigger>
                    <div className="user" id="userCC" >
                    {console.log('image !')}
                    {console.log(this.props.User.image)}
                     {
                             this.props.User.image != null ?
                             <div className="u-photoNon1" style={{ background: "url(http://uni-social.tk/files/uImg/i-ss/"+this.props.User.image+ ")"}}></div>                       

                             : 
                            <div className="u-photoNon1"></div>                       
                     }

                    </div>
                    </DropdownTrigger>
                    <DropdownContent>
                        <div className="mun-cc mun-u">
                            <div className="arrow-up arrow-up-u"></div>
                            <div className="mun-center">
                                <ul>
                                <li><NavLink to="/users">Profile</NavLink></li>
                                <li><NavLink to="/settings">Settings</NavLink></li>
                                <li><a onClick={this.props.logout}>LogOut</a></li>
                                </ul>
                            </div>
                        </div>
                    </DropdownContent>
                </Dropdown>
               




            </div>
           








        </div>
    </div>
</header>
         </React.Fragment>

    );  }
  
}


 
export default Header;

