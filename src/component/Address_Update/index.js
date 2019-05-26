import React from 'react';
import { AddressForm } from "../Address_Form";
import { withFirebase } from "../Firebase";
import { connect } from "react-redux";

const INITIAL_STATE = {
    address: '',
    error: '',
}

class AddressUpdateBase extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            address : nextProps.address,
        })
    }


    onSubmit = (event) => {
        event.preventDefault();
        let {address} = this.state;

        const Address = `${address.street} ${address.district} ${address.city} ${address.district} 
        ${address.county}  ${address.state}  ${address.postalCode}  `.replace(/undefined/g, ''); 
    
        const uid =   this.props.firebase.auth.currentUser.uid           
        this.props.firebase.setAddress(uid).set({
                    address : Address,
                  }, {merge:true})
            .then(() => {
                this.setState({
                    address: '',
                    error: 'Address Updated Successfully'
                });
            })
            .catch((error) => {
                this.setState({ error })
            })
    }

    render() {
        const {address ,error} = this.state;
        const isDisabled = address === '' ;
        return (
            <div className="span12">
                <form  onSubmit={this.onSubmit}>
                <AddressForm/>
                <button  className="btn btn-outline-secondary" disabled={isDisabled} >
                    Update Address
                </button>
                </form>
                {
                        error ? <p>{error}</p> : <p></p>
                }
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        address : state.AddressReducers.address
    }
}



const AddressUpdate = connect(mapStateToProps, null)(withFirebase(AddressUpdateBase));

export { AddressUpdate };