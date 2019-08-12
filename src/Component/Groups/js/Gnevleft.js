import React, { Component } from 'react';
import cookie from 'react-cookies';
class Gnevleft extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="g-poster"></div>

                <div className="ccc left-r">
                    <div className="left-w">

                        <div className="box-group-l">

                            <div className="box-left-user">

                                <div className="g-name">
                                    <h3>{}</h3>
                                </div>

                            </div>

                            <div className="box-options">
                                <div className="box-group">
                                    <div className="box-group-c">

                                        <div className="box-group-o bgo-b">
                                            <div className="group-ico"></div>
                                            <div className="group-name">All</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="box-group">
                                    <div className="box-group-c">

                                        <div className="box-group-o bgo-b">
                                            <div className="group-ico"></div>
                                            <div className="group-name">Photos</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="box-group">
                                    <div className="box-group-c">

                                        <div className="box-group-o bgo-b">
                                            <div className="group-ico"></div>
                                            <div className="group-name">Videos</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="box-group">
                                    <div className="box-group-c">

                                        <div className="box-group-o bgo-b">
                                            <div className="group-ico"></div>
                                            <div className="group-name">Files</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="box-group">
                                    <div className="box-group-c">

                                        <div className="box-group-o">
                                            <input type="text" className="box-group-in" placeholder="search in group ..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="box-more">

                            <div className="more-title">More ...</div>

                            <div className="box-group">
                                <div className="box-group-c">

                                    <div className="box-group-cc">
                                        <div className="group-ico"></div>
                                        <div className="group-name">Groups</div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-group">
                                <div className="box-group-c">

                                    <div className="box-group-cc">
                                        <div className="save-icon"></div>
                                        <div className="group-name">Saved</div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-group">
                                <div className="box-group-c">

                                    <div className="box-group-cc">
                                        <div className="conversation-icon "></div>
                                        <div className="group-name">Questions</div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-group">
                                <div className="box-group-c">

                                    <div className="box-group-cc">
                                        <div className="idea-icon"></div>
                                        <div className="group-name">Suggestion</div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-group">
                                <div className="box-group-c">

                                    <div className="box-group-cc">
                                        <div className="complaint-icon"></div>
                                        <div className="group-name">complaint</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </React.Fragment>

        );
    }

}

export default Gnevleft;

