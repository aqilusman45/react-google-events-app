import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Link } from "react-router-dom";

export const Footer = ()=>(
    <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="span3">
          <div className="widget">
            {/* <!-- logo --> */}
            <div className="footerlogo">
              <h6><a href="index.html">Telefeast</a></h6>
              {/* <!-- <img src="assets/img/logo.png" alt="" /> --> */}
            </div>
            {/* <!-- end logo --> */}
            <address>
				<strong>Plato business company, Inc.</strong><br/>
				 4455 Great building Ave, Suite A10<br/>
				 San Francisco, CA 94107<br/>
				<abbr title="Phone">P:</abbr> (123) 456-7890 </address>
          </div>
        </div>
        <div className="span3">
          <div className="widget">
            <h5>Browse pages</h5>
            <ul className="list list-ok">
              <li><Link to={ROUTES.PRIVACY_POLICY} >Privacy Policy</Link></li>
              <li><Link to={ROUTES.TERMS_CONDITIONS}>Terms & Conditions</Link></li>
              <li><Link to={ROUTES.SIGNIN}>Sign In</Link></li>
              <li><Link to={ROUTES.SIGNUP}>Sign Up</Link></li>
              <li><Link to={ROUTES.FORGET_PASSWORD}>Forgot Password</Link></li>
            </ul>
          </div>
        </div>
        <div className="span3">
          <div className="widget">
            <h5>Flickr photostream</h5>
            <div className="flickr_badge">
            
              <script type="text/javascript" src="http://www.flickr.com/badge_code_v2.gne?count=8&amp;display=random&amp;size=s&amp;layout=x&amp;source=user&amp;user=34178660@N03"></script>
            
            </div>
            <div className="clear"></div>
          </div>
        </div>
        <div className="span3">
          <div className="widget">
            <h5>Keep updated</h5>
            <p>
              Enter your email to subcribe newsletter
            </p>
            <form>
              <div className="input-append">
                <input className="span2" id="appendedInputButton" type="text"/>
                <button className="btn btn-color" type="submit">Subscribe</button>
              </div>
            </form>
            <ul className="social-network">
              <li><a href="#"><i className="icon-bg-light icon-facebook icon-circled icon-1x"></i></a></li>
              <li><a href="#" title="Twitter"><i className="icon-bg-light icon-twitter icon-circled icon-1x"></i></a></li>
              <li><a href="#" title="Linkedin"><i className="icon-bg-light icon-linkedin icon-circled icon-1x"></i></a></li>
              <li><a href="#" title="Pinterest"><i className="icon-bg-light icon-pinterest icon-circled icon-1x"></i></a></li>
              <li><a href="#" title="Google plus"><i className="icon-bg-light icon-google-plus icon-circled icon-1x"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="span6">
            <p>
              &copy; Plato - All right reserved
            </p>
          </div>
          <div className="span6">
            <div className="pull-right">
              <div className="credits">
                {/* <!--
                  All the links in the footer should remain intact.
                  You can delete the links only if you purchased the pro version.
                  Licensing information: https://bootstrapmade.com/license/
                  Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=Plato
                --> */}
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

)