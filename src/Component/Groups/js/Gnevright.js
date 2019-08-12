import React, { Component } from 'react';
class Gnevright extends Component {
    constructor(props) {
        super(props);
    
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
       }

    state = {
 
        numMaxPhotos: '',
        showModel: false,
        photosC: '',
 
      }



      showImgs = (index, photos) => {
        if (index >= 0 && index < photos.length) {
    
          this.setState({ showModel: true });
          var previous = index - 1;
          var next = index + 1;
          var length = photos.length - 1;
          var photosC = (
            <div className="slidePhotos" id="slidePhotos" ref={this.setWrapperRef}>
              <div className={"previous " + (index == 0 ? 'nomore' : 'more')} onClick={() => { this.showImgs(previous, photos) }} ><i className="arrowleft"></i></div>
              <div className="slidePhotos-c" id="slidePhotos">
                <div className="siledimg"> <img src={"http://uni-social.tk/files/posts/i-s/" + photos[index].fileName} /> </div>
              </div>
              <div className={"next " + (length == index ? 'nomore' : 'more')} onClick={() => { this.showImgs(next, photos) }}><i className="arrowright"></i></div>
            </div>
          );
    
          this.setState({ photosC: photosC });
        }
    
      }



      CloseshowImgs = () => {
        this.setState({ showModel: false });
    
      }
    
    
    
      componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    
    
      setWrapperRef(node) {
        this.wrapperRef = node;
      }
    
    
      handleClickOutside(event) {
        if (this.state.showModel && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
          this.setState({ showModel: false });
        }
      }

    render(){ 
        return(
        <React.Fragment>
  <div className="ccc right-r">
    <div className="right-w">
             
    <div className={'modelover ' + (this.state.showModel ? 'modelShow' : null)}>
          <div className="CloseSlidePhotos" id="CloseslidePhotos" onClick={this.CloseshowImgs}>x</div>


          {this.state.photosC}

        </div>


        <div className="box-ads">
            <div className="box-title">Advertisement.</div>

            <div className="box-allAds scroll-1">
            {
                this.props.ads.map((post,index) => 
                    
                    <div key={index} className="ads-cc">
                    <span>{post.postTime} > {post.section[0].sectionName}</span>

                    <div key={index} className="ads-center">

                    <p>{post.postContent}</p>

                    <div className="p_photos">
                      {
                        post.Photos[0] != '' ? (
                          post.Photos.map((img, index) => (
                            img.fileType == 1 ? (

                                post.countPhotos >= 2 ?
                                this.state.numMaxPhotos = 2
                                :
                                this.state.numMaxPhotos = post.countPhotos,

                            index <= 1 ?
                              (
                                post.countPhotos > 2 && index == 1 ?
                                

                                  <div className={'p_moreimge ' + post.Photos[0].filespace}>
                                    <div className={'p_showimg ' + post.Photos[0].filespace + ' p_num' + this.state.numMaxPhotos + ' p_i' + index}>
                                      <div className={'p_imgs_' + index}>
                                        <a onClick={() => { this.showImgs(index, post.Photos) }} className={'a-' + index}>
                                          <img src={'http://uni-social.tk/files/posts/i-s/' + img.fileName} />
                                          <div className="p_moreimge_count">+{post.countPhotos - 2}</div>

                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  :

                                  <div className={'p_showimg ' + post.Photos[0].filespace + ' p_num' + this.state.numMaxPhotos + ' p_i' + index}>
                                    <div className={'p_imgs_' + index}>
                                      <a onClick={() => { this.showImgs(index, post.Photos) }} className={'a-' + index}>
                                        <img src={'http://uni-social.tk/files/posts/i-s/' + img.fileName} />
                                      </a>
                                    </div>
                                  </div>

                              ) : null
                          
                          
                              ):

                              img.fileType == 2 ? 
                              (
                              <div className={'p_showimg v' + post.Photos[0].filespace + ' num' + this.state.numMaxPhotos + ' i' + index}>
                              <div className={'imgs_' + this.state.numMaxPhotos}>
                              <a   className={'a-' + index}>

                              <video controls='1' loop='1'  >
                              <source src={'http://uni-social.tk/files/videos/' + img.fileName}  type='video/mp4' />
                              </video>

                              </a>
                              </div>
                              </div>
                             ):

                            img.fileType == 3 ? 
                            (
                            <div className={'showFiles' + post.Photos[0].filespace + ' num' + this.state.numMaxPhotos + ' i' + index}>
                            <div className={'showFiles-c'}>

                            <div className="shF-l">
                            <div className={'shF-ico ' + img.fileBType}></div>

                            <div className="shF-l-cc">
                            <div className="shF-name">{img.fileBName}</div>
                            <div className="shF-type" >{img.fileBType}</div>
                            </div>
                           </div>

                            <div className="shF-r">
                            <a target='_blank'  href={'http://uni-social.tk/files/files/'+img.fileName} >
                            <div className="shF-down-ico"></div>
                            </a>
                            </div>


                            </div>
                            </div>
                          ):null


                            

                          ))
                        ) : null


                      }
                    </div>
                      </div>

                    </div>
                )
            }
                


            </div>
        </div>

        <div className="box-doctos">
            <div className="box-title">Doctor’s</div>
            <div className="box-notifs scroll-1">

                <div className="box-notif">

                    <div className="box-notif-c">
                        <div className="n-useri"><img src="/4up/ico/doctor3.jpg" /></div>

                        <div className="box-ut">

                            <span className="n-usern">Salah Shaban</span>
                            <div className="box-tt">
                            {/*
                                <div className="box-tt-type n-active"></div>
                                <div className="box-tt-time">Active Now</div>
                            */}
                            </div>
                        </div>
                    </div>
                    <div className="box-ttObT">
                        <div className="box-tt-obtion">...</div>
                    </div>

                </div>

                <div className="box-notif">

                    <div className="box-notif-c">
                        <div className="n-useri"><img src="/4up/ico/doctor1.jpg" /></div>

                        <div className="box-ut">

                            <span className="n-usern">Mona Hashemi</span>
                
                        </div>
                    </div>
                    <div className="box-ttObT">
                        <div className="box-tt-obtion">...</div>
                    </div>
                </div>

                <div className="box-notif">

                    <div className="box-notif-c">
                        <div className="n-useri"><img src="/4up/ico/doctor3.jpg" /></div>

                        <div className="box-ut">

                            <span className="n-usern">sherif mohamed</span>
               
                        </div>
                    </div>
                    <div className="box-ttObT">
                        <div className="box-tt-obtion">...</div>
                    </div>

                </div>

                <div className="box-notif">

                    <div className="box-notif-c">
                        <div className="n-useri"><img src="/4up/ico/doctor2.jpg" /></div>

                        <div className="box-ut">

                            <span className="n-usern">Noha Ramadan</span>
          
                        </div>
                    </div>
                    <div className="box-ttObT">
                        <div className="box-tt-obtion">...</div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>        
        </React.Fragment>

        ); }
  
}

export default Gnevright;

