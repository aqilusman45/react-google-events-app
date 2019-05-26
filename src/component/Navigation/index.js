import React from 'react';
import { withRouter } from 'react-router-dom';
import { AuthenticatedUser } from '../Session';
import {WithAuthNavBar} from '../NavLink_WithAuth';
import { WithoutAuthNavBar } from "../NavLink_WithoutAuth";


// import './styles.css';


const NavigationBar = () => {
    return (
          <header>
          {/* <!-- Navbar
          ================================================== --> */}
          <div className="cbp-af-header">
            <div className=" cbp-af-inner">
              <div className="container">
                <div className="row">
      
                  <div className="span4">
                    {/* <!-- logo --> */}
                    <div className="logo">
                      <h1><a href="index.html">Telefeast</a></h1>
                      {/* <!-- <img src="assets/img/logo.png" alt="" /> --> */}
                    </div>
                    {/* <!-- end logo --> */}
                  </div>
      
                  <div className="span8">
                    {/* <!-- top menu --> */}
                    <div className="navbar">
                      <div className="navbar-inner">
                        <nav>
                          <ul className="nav topnav">
                            <AuthenticatedUser.Consumer>
                        {
                            authUser=> authUser ? <WithAuthNavBar/> : <WithoutAuthNavBar/>
                        }
                    </AuthenticatedUser.Consumer>
                          </ul>
                        </nav>
                      </div>
                    </div>
                    {/* <!-- end menu --> */}
                  </div>
      
                </div>
              </div>
            </div>
          </div>
        </header>
    
    //++++++++++ Header End ++++++++++++++++



);
}

const Navigation = withRouter(NavigationBar);

export { Navigation };


