import React, { Component } from "react";
import { SubIntro } from "../Sub_Intro";
import { withAuthorization } from "../Session";
import { connect } from "react-redux";
import { withFirebase } from "../Firebase";
import { AddFriendForm } from "../Add_Friend_Form";
import { FriendList } from "../Friends_List";

const INITIAL_STATE = {
  email: "",
  address: "",
  friends: [],
  name: "",
  uid: '',
  error: ""
};

class AddFriendsBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      address: nextProps.address
    });
  }

  componentWillMount() {
    const uid = this.props.firebase.getUser();
    this.setState({
      uid
    });
    this.props.firebase
      .getFriends(uid)
      .get()
      .then(doc => {
        const friends = doc.data().friends;
        if (friends) {
          this.setState({
            friends
          });
        } 
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error
        })
      });
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, address, friends, uid, name } = this.state;

   const friendAddress = `${address.street} ${address.district} ${address.city} ${address.district} 
    ${address.county}  ${address.state}  ${address.postalCode}  `.replace(/undefined/g, ''); 

    friends.push({ email, friendAddress, name });
    this.props.firebase
      .addFriend(uid)
      .set(
        {
          friends
        },
        { merge: true }
      )
      .then(() => {
        this.setState({
          address: "",
          email: "",
          name: "",
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  delete=(index)=>{
    const {friends, uid} =this.state
    friends.splice(index, 1)
    this.props.firebase
    .addFriend(uid)
      .set(
        {
          friends
        },
        { merge: true }
      )
      .then(() => {
        this.setState({
          address: "",
          email: "",
          name: "",
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <section id="maincontent">
        <SubIntro heading="Add Friend" />
        <div className="container">
          <div className="row-fluid">
            <div className="span12">
              <div className="span6">
                <AddFriendForm
                  formInputs={this.state}
                  onChange={this.onChange}
                  address={this.addressListener}
                  onSubmit={this.onSubmit}
                />
              </div>
              <div className="span6 ">
                <FriendList deleteButton={true} friends={this.state.friends} deleteFriend={this.delete} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const condition = authUser => !!authUser;

const AddFriendChild = withAuthorization(condition)(AddFriendsBase);

const mapStateToProps = state => {
  return {
    address: state.AddressReducers.address
  };
};

const AddFriends = connect(
  mapStateToProps,
  null
)(withFirebase(AddFriendChild));

export { AddFriends };
