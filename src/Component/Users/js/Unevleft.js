import React, {Component} from 'react';

import axios from 'axios';
import cookie from 'react-cookies';

const $ = window.$;



 class UnevLeft extends Component{



    state = {
        UpImageLoding:false,
        UpImageLoding2:false,
        UpImageDon:false,
        ImagePhoto:''
      }
    
     // image
     
     upImgeOpen = () =>{
        document.getElementById('inimage').click();
      
       }
      
       upImage = (e) => {
        this.setState({UpImageLoding2: true});
        this.setState({UpImageLoding: true});
       
          let file = e.target.files[0];
          var data = new FormData();
          data.append('file', file);
          data.append('typefile', 'userImg');
          data.append('uid', cookie.load('uid'));
          data.append('udat', cookie.load('udat'));
          axios.post('http://uni-social.tk/esn/api/up', data).then(res => {
      
            if (res.data.status == true) {
              const fileName = res.data.file.fileName;
              this.setState({ ImagePhoto: fileName });
      
              $('.u-photoNon3').css("background-image", "url(http://uni-social.tk/files/uImg/i-ss/"+fileName+")");  

              this.setState({UpImageLoding: false});
      
            }
          });
      
      }


      changeImag = () =>{
        this.setState({UpImageLoding: true});
      
      
        var data = new FormData();
        data.append('uImag', this.state.ImagePhoto);
        data.append('uid', cookie.load('uid'));
        data.append('udat', cookie.load('udat'));
        axios.post('http://uni-social.tk/esn/api/changeImag', data).then(res => {
      
          if (res.data == true) {
       
            this.setState({UpImageLoding2: false,UpImageDon: true,UpImageLoding: false});
            window.location.reload();

          }
        });
      
      }


    render(){ 
        return(
        <React.Fragment>
<div className="ccc left-r nevleft-margin " >
    <div className="left-w">

        <div className="box-left-user">
        <div className="u-photo-c">

            <div className="u-photo">
                     {
                            this.props.User.image != null  && this.state.UpImageLoding2 == false && this.state.UpImageDon == false?
                            <img src={'http://uni-social.tk/files/uImg/i-ss/'+this.props.User.image} />
                             : 
                            <div className={"u-photoNon3 "+ (this.state.UpImageLoding2 == true && this.state.UpImageLoding == false ? 'checkup' :null)}></div>                       
                     }
            </div>
                      {this.state.UpImageLoding2 == false?
                       <div class="change-imge-c"><div class="change-imge" onClick={this.upImgeOpen}>
                        <i class="ico-imge"></i> <p>Update</p>
                       </div></div>
                      :
                      this.state.UpImageLoding == false ? 
                      <div class="save-imge-c"><div class="save-imge" onClick={this.changeImag}>
                        <p>Save</p>
                        <div class="save-imge-arrow"></div>
                     </div></div>
                     :null

                      }

                      {this.state.UpImageLoding == true ? 
                       <div class="lodingImg-c"><div class="lodingImg"></div></div>
                      :null}

                      <input type="file" name="file" onChange={this.upImage} id="inimage" style={{ display: "none" }} />

                     
                      </div>


            <div className="u-name">
                <h3>{this.props.User.name}</h3>
            </div>

{/*            <div className="u-city">6 October, Giza</div> */}
        </div>
  
  
    <div className="box-u-more">
        <div className="box-um-c">
        <span className="box-um-ico puplic"></span>
        <span className="box-um-t">culture & science city</span>
        </div>

        <div className="box-um-c">
        <span className="box-um-ico puplic"></span>
        <span className="box-um-t">Computer Science</span>
        </div>



        <div className="box-um-c">
        <span className="box-um-ico puplic"></span>
        <span className="box-um-t">{this.props.yearName()}</span>
        </div>
    </div>

    </div>
</div>      
        </React.Fragment>

        ); }
  
}

export default UnevLeft;

