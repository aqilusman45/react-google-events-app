import React, { Component } from 'react';
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
    username: '',
    address: [],
    email: '',
    uid: '',
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
            const {address , calendarId } = this.state;
            const uid = authUser.user.uid
             return this.props.firebase
             .users(uid).set({
                    username: authUser.additionalUserInfo.profile.name,
                    email: authUser.additionalUserInfo.profile.email,
                    uid,
                    address,
                    calendarId, 
                  }, {merge: true});
            })
            .then(() => {
                this.setState({
                    ...INITIAL_STATE
                });
                this.props.history.push(ROUTES.DASHBOARD);
            })
            .catch((error) => {
                this.setState({ error })
            })
    }

    render() { 
        const {error} = this.state        
        return ( 
            <div>
                <form onSubmit={this.onSubmit}>
                <button className="btn btn-default">
                    Sign In With Facebook
                </button>
                </form>
                {error && <p>{error.message}</p>}
            </div>
         );
    }
}
 
const FacebookLogin = withRouter(withFirebase(FacebookLoginBase));

export {FacebookLogin};