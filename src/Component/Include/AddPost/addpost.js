/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
//import ReactDOM from 'react-dom';

import './addpost.css';
import cookie from 'react-cookies';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 

const $ = window.$;
 
 
class AddPost extends Component {
  
 

  state = {
    postCenter: '',
    name: '',
    ShowAddPost: false,
    postPhotos: [],
    ShowSub:false,
    activebuttom:false,
    showloading:false,
    ShowSubOpen:false,
    ShowSubT:false
  }


  // choose post section 

  getsubSec = () =>{
   var checkboxes = document.getElementsByName('sec[]');

   var vals = "";
   for (var i=0, n=checkboxes.length;i<n;i++) 
   {
       if (checkboxes[i].checked) 
       {
        vals +=checkboxes[i].value+',';
       }
  }
  return vals;     
}
  
  ShowSubOpen = (e) =>{
    if(e.target.value >0 && e.target.value <= 2){
      this.setState({ ShowSubOpen: true }); 
      this.setState({ ShowSubT: false }); 
    }else if(e.target.value >2){
      this.setState({ ShowSubOpen: true }); 
      this.setState({ ShowSubT: true }); 
    }else{
      this.setState({ ShowSubOpen: false });
      this.setState({ ShowSub: false });
      this.setState({ ShowSubT: false });
      
    }
    this.ActiveBottom();
  }
  
  ShowSub = () =>{
    this.setState({ ShowSub: true }, function () {
      this.ActiveBottom();
 });
    
    
  }

  ShowSubclose = () =>{
    this.setState({ ShowSub: false }, function () {
      this.ActiveBottom();
 });
 
  }
   
/////////// 

// up videos

upVideos = (e) => {
  this.setState({ postPhotos: [] });
  $('#upimgs2').html('');

  this.setState({ activebuttom: false });

  const div = document.createElement("div");
    div.className = "upimgs-c upimgs"+0;
    document.getElementById("upimgs2").appendChild(div);
 
 
    let file = e.target.files[0];
    console.log(file);
    var data = new FormData();
    data.append('file', file);
    data.append('typefile', 'videos');
    
    data.append('uid', cookie.load('uid'));
    data.append('udat', cookie.load('udat'));

    axios.post('http://uni-social.tk/esn/api/upFiles', data).then(res => {

      if (res.data.status == true) {
        const fileName = res.data.file.fileName;
        const fileType = res.data.file.fileType;
        const obj = { 'fileName': fileName, 'fileType': fileType };
        const newArray = this.state.postPhotos.slice(); // Create a copy
        newArray.push(obj); // Push the object

        this.setState({ postPhotos: newArray });
        $('.upimgs'+0).css("background-image", "url(http://localhost/4up/ico/upvideos.png)");  

        this.ActiveBottom();

      }
    });
 

}

upVedOpen = () => {
  document.getElementById('inVed').click();
}

//////////////////////
upFile = (e) => {
  this.setState({ postPhotos: [] });
  $('#upimgs2').html('');

  this.setState({ activebuttom: false });

  const div = document.createElement("div");
    div.className = "upimgs-c upimgs"+0;
    document.getElementById("upimgs2").appendChild(div);
 
 
    let file = e.target.files[0];
    console.log(file);
    var data = new FormData();
    data.append('file', file);
    data.append('typefile', 'files');
    
    data.append('uid', cookie.load('uid'));
    data.append('udat', cookie.load('udat'));

    axios.post('http://uni-social.tk/esn/api/upFiles', data).then(res => {

      if (res.data.status == true) {
        const fileName = res.data.file.fileName;
        const fileType = res.data.file.fileType;
        const fileBName= res.data.file.fileBName;
        const fileBType= res.data.file.fileBType;
        
        const obj = { 'fileName': fileName, 'fileType': fileType, 'fileBName': fileBName, 'fileBType': fileBType };
        const newArray = this.state.postPhotos.slice(); // Create a copy
        newArray.push(obj); // Push the object

        this.setState({ postPhotos: newArray });
        $('.upimgs'+0).css("background-image", "url(http://localhost/4up/ico/upfiles.png)");  

        this.ActiveBottom();

      }
    });
 

}

upFilOpen = () => {
  document.getElementById('inFil').click();
}


// up imges 
  upImgOpen = () => {
    document.getElementById('inImg').click();
  }
  

  
  upPhotos = (e) => {
    this.setState({ postPhotos: [] });
    $('#upimgs2').html('');

    for (let i = 0; i < e.target.files.length; i++) {
      const div = document.createElement("div");
      div.className = "upimgs-c upimgs"+i;
      document.getElementById("upimgs2").appendChild(div);
    }

    var countArray = e.target.files.length-1;
    for (let i = 0; i < e.target.files.length; i++) {
      this.setState({ activebuttom: false });

      let file = e.target.files[i];
      var data = new FormData();
      data.append('file', file);
      data.append('typefile', 'post');
      data.append('uid', cookie.load('uid'));
      data.append('udat', cookie.load('udat'));

      axios.post('http://uni-social.tk/esn/api/up', data).then(res => {

        if (res.data.status == true) {
          const fileName = res.data.file.fileName;
          const filespace = res.data.file.filespace;
          const fileType  = res.data.file.fileType;
          const obj = { 'fileName': fileName, 'filespace': filespace, 'fileType': fileType };
          const newArray = this.state.postPhotos.slice(); // Create a copy
          newArray.push(obj); // Push the object

          this.setState({ postPhotos: newArray });
          $('.upimgs'+i).css("background-image", "url(http://uni-social.tk/files/posts/i-ss/"+fileName+")");  

          if(countArray == i)this.ActiveBottom();


        }
      });

    }
  }

  ////////

  
  changeTextarea = (e) => {
    this.setState({ postCenter: e.target.value });
    console.log(this.state.postCenter);
    this.ActiveBottom();

    this.multilineTextarea.style.height = 'auto';
    this.multilineTextarea.style.height = this.multilineTextarea.scrollHeight + 'px';
  }

  getSelectYear = () =>{
    let selectYear =  document.getElementsByName('selectYear')[0].value;
    return selectYear;
  }

  getSelectT= () =>{
    if(this.state.ShowSubT == true){
    let selectYear =  document.getElementsByName('selectT')[0].value;
    return selectYear;
  }
  }

  NewPost = () => {
    let checkboxes = '';
    let selectYear = '';
    let selectT  ='';

    
    if(this.state.activebuttom == false) return false;
    if(this.props.User.group_id == 1 || this.props.User.group_id == 3){
    checkboxes = this.getsubSec();
    selectYear = this.getSelectYear();
    selectT    = this.getSelectT();
    } 

    this.setState({ showloading: true, activebuttom:false})

 
    const data = { 'content': this.state.postCenter, 'sec': checkboxes, 'selectYear': selectYear ,'photos': this.state.postPhotos, 'udat': cookie.load('udat'), 'uid': cookie.load('uid'), 't': selectT,'p':this.props.Page};
    axios.post(`http://uni-social.tk/esn/api/addpost`, data)
      .then(res => {
        if(res.data == true){
        $('#upimgs2').html('');
        // window.Materialize.toast("Your post has been submitted , please wait until it be accepted", 400000);
        this.getposts('getPost');
        cookie.load('type')=== "2" ?
        toast.info("Your post has been submitted , please wait until it be accepted")
        :
        toast.info("Your post has been Added")
        this.setState({ showloading: false, activebuttom:false,ShowAddPost:false,ShowSubOpen:false,postCenter: '',postPhotos: []});
                
      }else{
        this.setState({ showloading: false, activebuttom:true})
      }
      })
       

 
  }


  toggelAddPost = () => {
    this.setState({ShowAddPost: true})
  }


  getposts = (e) => {
    this.demoMethod(e);

  }
  ActiveBottom = () => {

    let checkboxes = '';
    let selectYear = '';
    let postCenter =  document.getElementsByName('postCenter')[0].value.trim();

    if(this.props.User.group_id == 1 || this.props.User.group_id == 3){
     checkboxes = this.getsubSec();
     selectYear = this.getSelectYear();
    }


    if(selectYear == 0 && (postCenter !='' || this.state.postPhotos !='') 
      || (selectYear !=0 && checkboxes !='' &&  this.state.ShowSub==true) && (postCenter !='' || this.state.postPhotos !='')
      || (selectYear !=0 &&  this.state.ShowSub==false) && (postCenter !='' || this.state.postPhotos !='')
      || (this.props.User.group_id !=1) && (postCenter !='' || this.state.postPhotos !='') 
      ){
        this.setState({activebuttom: true})
    }else{
      this.setState({activebuttom: false})

    }
    
  }

 
 

  componentDidMount () {
    if (this.multilineTextarea) {
      this.multilineTextarea.style.height = 'auto';
    }
  }

  demoMethod(){
    this.props.sendData('getPost');
  }


  render() {
  
    return (
      <React.Fragment>
          <ToastContainer />
        <div className="newstatus" >
          {!this.state.ShowAddPost ?
            <div className="newpost0" onClick={this.toggelAddPost} id="newpost-0">
              <div className="newpost0-c">
                <div className="newpost0-cc">
                  <div className="newpost0-puseri">
                  {
                            this.props.User.image != null ?
                            <div className="u-photoNon4-1" style={{ background: "url(http://uni-social.tk/files/uImg/i-ss/"+this.props.User.image+ ")"}}></div>                       

                             : 
                            <div className="u-photoNon4-1" ></div>                       
                  }
                  </div>

                  <div className="newpost0-puseri">
                  {cookie.load('type') == 3 ?
                       <p>Add Posters</p>
                  :
                       <p>Do you have anything you would like to add?</p>
                  }
                  </div>
                </div>

                <div className="newpost0-muni">
                  <a className="photo-icon newpost0-AddImg" onClick={this.upImgOpen}></a>
                </div>
              </div>
            </div>
            : null}

          {this.state.ShowAddPost ?
            <div className="newpost1" id="newpost-1">

              <div className="newpost1-c">

                <div className="newpost1-cc">
                  <div className="box-user">
                    <div className="p-user">
                      <div className="p-useri">
                        {
                            this.props.User.image != null ?
                            <div className="u-photoNon4" style={{ background: "url(http://uni-social.tk/files/uImg/i-ss/"+this.props.User.image+ ")"}}></div>                       

                             : 
                            <div className="u-photoNon4"></div>                       
                        }

                      </div>

                      <div className="box-name">
                        <div className="p-usern">{this.props.User.name}</div>
                        <div className="p-usery">
                          <span className="p-usery1">now </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="box-text">
                    <textarea   onChange={this.changeTextarea} ref={ref => this.multilineTextarea = ref} value={this.state.postCenter} name="postCenter" className="new-teaxa" id="teaxarea" placeholder="Do you have anything you would like to add?"></textarea>
                  </div>
 
                  <div  id="upimgs2"></div>

 



                </div>

                <div className="box-muni">
                  <div className="box-newsh-c">
                    <a className='bn-AddImg' onClick={this.upImgOpen}><span className='photo-icon'></span> photo</a>
                    <input type="file" name="file" multiple onChange={this.upPhotos} id="inImg" style={{ display: "none" }} />


                    <a className='bn-AddVid' onClick={this.upVedOpen}><span className='video-icon'></span> video</a>
                    <input type="file"  name="file" accept="video/*"  onChange={this.upVideos} id="inVed" style={{ display: "none" }} />

                    <a className='bn-AddVid' onClick={this.upFilOpen}><span className='file-icon'></span> file</a>
                    <input type="file"  name="file" accept=".pdf,.doc,.docx,.txt"  onChange={this.upFile} id="inFil" style={{ display: "none" }} />


                  </div>

 {this.props.User.group_id == 1 || this.props.User.group_id == 3 ?

//-----------------------------------------------
 <div className="selectYear">

                  <div className="category">
                    <select id="main_category"  name="selectYear"  onChange={this.ShowSubOpen} className="main_category smallselect right">
                      <option value="0" >Computer Science</option>
                      <option value="1" >First Year</option>
                      <option value="2" >Second Year</option>
                      <option value="3" >Third Year</option>
                      <option value="4" >Fourth Year</option>
                    </select>
                   </div>
 

{this.state.ShowSubT ?
                   <div className="category">
                    <select id="main_category"  name="selectT" className="main_category smallselect right">
                      <option value="0">cs & is</option>
                      <option value="cs" >cs</option>
                      <option value="is" >is</option>
                    </select>
                   </div>
:null}



{this.state.ShowSubOpen ?

!this.state.ShowSub ?
<div className="sub_copen noselect" onClick={this.ShowSub}>+ Post in sections</div>
:
<div className="sub_copen noselect" onClick={this.ShowSubclose}>+ Post in all year</div>

:null
}


{this.state.ShowSub ?
 <div className="sub_c">

    <div className="sub_cc noselect">
    <input name="sec[]" type="checkbox"   id="inlineCheckbox1" value="1" onClick={this.ActiveBottom}  />
    <label  for="inlineCheckbox1">Sec 1</label>
    </div>

    <div className="sub_cc noselect">
    <input name="sec[]" type="checkbox"   id="inlineCheckbox2" value="2" onClick={this.ActiveBottom} />
    <label  for="inlineCheckbox2">Sec 2</label>
    </div>

    <div className="sub_cc noselect">
    <input name="sec[]"   type="checkbox"   id="inlineCheckbox3" value="3" onClick={this.ActiveBottom} />
    <label  for="inlineCheckbox3">Sec 3</label>
    </div>

    <div className="sub_cc noselect">
    <input name="sec[]" type="checkbox"   id="inlineCheckbox4" value="4" onClick={this.ActiveBottom} />
    <label  for="inlineCheckbox4">Sec 4</label>
    </div>

</div>
:null}

</div>

:null
}

                  <a onClick={this.NewPost}  className={"bn-share " + (this.state.activebuttom ? 'active' :null)}>
                  <p className={(this.state.showloading ? 'but_hidding' :null)}>share</p>
                  <p className={"loading " + (!this.state.showloading ? 'but_hidding' :null)}></p>
                  </a>

                </div>

              </div>

            </div>
            : null}
        </div>

      </React.Fragment>

    );
  }

}

  

 

 
export default AddPost;

