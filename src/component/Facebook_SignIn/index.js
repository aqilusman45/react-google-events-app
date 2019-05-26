import React, { Component } from 'react';
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
    username: '',
    address: [],
    email: '',
    uid: '',
    friends: [],
    error: '',
    calendarId:'',
}

class FacebookLoginBase extends Component {
    constructor(props) {
        super(props);
        this.state={...INITIAL_STATE};
    }

    onSubmit= event =>{
        event.preventDefault();
        this.props.firebase
        .doSignInwithFacebook()
        .then( authUser => {
            const {address , calendarId, friends } = this.state;
            const uid = authUser.user.uid
             return this.props.firebase
             .users(uid).set({
                    username: authUser.additionalUserInfo.profile.name,
                    uid,
                    address,
                    friends,
                    calendarId, 
                  }, {merge: true});
            })
            .then(() => {
                this.setState({
                    ...INITIAL_STATE
                });
                this.props.history.push(ROUTES.EVENTS);
            })
            .catch((error) => {
                this.setState({ error })
            })
    }

    render() { 
        const {error} = this.state        
        return ( 
            <div>
                <button onClick={this.onSubmit} className="fb facebook-login">
        {/* <img src={process.env.PUBLIC_URL + '/assets/images/facebook.png'} alt="" /> */}
        <i className="icon-facebook"></i> Login with Facebook
                </button>
                {error && <p>{error.message}</p>}
            </div>
         );
    }
}
 
const FacebookLogin = withRouter(withFirebase(FacebookLoginBase));

export {FacebookLogin};