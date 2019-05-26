import React, { Component } from 'react';
import AddressSuggest from '../Address_Suggest';
import AddressInput from '../Address_Input';
import { withFirebase  } from "../Firebase";
import { AddressActions } from "../../store/actions/address";
import { connect } from "react-redux";
import axios from 'axios';

class AddressFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.onQuery = this.onQuery.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onQuery(evt) {
    const query = evt.target.value;

    if (!query.length > 0) {
      this.setState(this.getInitialState());
      return;
    }

    const self = this;
    axios.get('https://autocomplete.geocoder.api.here.com/6.2/suggest.json',
      {'params': {
        'app_id':  process.env.REACT_APP_ADDRESS_API,
        'app_code': process.env.REACT_APP_ADDRESS_CODE,
        'query': query,
        'maxresults': 1,
      }}).then(function (response) {
          if (response.data.suggestions.length > 0) {
            const id = response.data.suggestions[0].locationId;
            const address = response.data.suggestions[0].address;
            self.setState({
              'address' : address,
              'query' : query,
              'locationId': id
            })
            return address;
          } else {
            const state = self.getInitialState();
            self.setState(state);
          }
      })
      .then((address)=>{
          this.props.add(address);
          this.onCheck();
      })
      .catch((er)=>{
        console.log(er);
        
      })
  }

  getInitialState() {
    return {
      'address': {
        'street': '',
        'city': '',
        'state': '',
        'postalCode': '',
        'country': ''
      },
      'query': '',
      'locationId': '',
      'isChecked': false,
      'coords': {}
    }
  }



  onCheck(evt) {
    let params = {
      'app_id':  process.env.REACT_APP_ADDRESS_API,
      'app_code': process.env.REACT_APP_ADDRESS_CODE,
    }

    if (this.state.locationId.length > 0) {
      params['locationId'] = this.state.locationId;
    } else {
      params['searchtext'] = this.state.address.street
        + this.state.address.city
        + this.state.address.state
        + this.state.address.postalCode
        + this.state.address.country;
    }

    const self = this;
    axios.get('https://geocoder.api.here.com/6.2/geocode.json',
      {'params': params }
      ).then(function (response) {
        const view = response.data.Response.View
        if (view.length > 0 && view[0].Result.length > 0) {
          const location = view[0].Result[0].Location;

          self.setState({
            'isChecked': 'true',
            'locationId': '',
            'query': location.Address.Label,
            'address': {
              'street': location.Address.HouseNumber + ' ' + location.Address.Street,
              'city': location.Address.City,
              'state': location.Address.State,
              'postalCode': location.Address.PostalCode,
              'country': location.Address.Country
            },
            'coords': {
              'lat': location.DisplayPosition.Latitude,
              'lon': location.DisplayPosition.Longitude
            }
          });
        } else {
          self.setState({
            'isChecked': true,
            'coords': null,
          })
        }

      })
      .catch(function (error) {
        console.log('caught failed query');
        self.setState({
          'isChecked': true,
          'coords': null,
        });
      });
  }


  onClear(evt) {
    evt.preventDefault();
    const state = this.getInitialState();
    this.props.clear(this.state.address);
    this.setState(state);
  }

  onAddressChange(evt) {
    evt.preventDefault();
    const id = evt.target.id
    const val = evt.target.value
    let state = this.state
    state.address[id] = val;
    this.setState(state);
  }

  alert() {
    if (!this.state.isChecked) {
      return;
    }

    if (this.state.coords === null) {
      return (
        <div className="alert alert-warning" role="alert">
          <b>Invalid.</b> The address is not recognized.
        </div>
      );
    } else {
      return (
        <div className="alert alert-success" role="alert">
          <b>Valid Address.</b>  Location is {this.state.coords.lat}, {this.state.coords.lon}.
        </div>
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address === '') {
      const state = this.getInitialState();
      this.setState(state);
    }
    
  }

  render() {
    let result = this.alert();
    return (
        <div>
          <AddressSuggest
            query={this.state.query}
            onChange={this.onQuery}
            />
          <AddressInput
            street={this.state.address.street}
            city={this.state.address.city}
            state={this.state.address.state}
            postalCode={this.state.address.postalCode}
            country={this.state.address.country}
            onChange={this.onAddressChange}
            />
          <br/>
          { result }
          {/* <button className="btn btn-outline-secondary" onClick={this.onClear}>Clear</button> */}
        </div>
      );
  }
}



const mapDispatchToProps = dispatch =>{
  return {
      add: (address)=> dispatch(AddressActions.addAddress(address)),
      clear: (address)=> dispatch(AddressActions.clearAddress(address)),
  }
}

const mapStateToProps = state => {
  return {
    address: state.AddressReducers.address
  };
};


const AddressForm = connect(mapStateToProps , mapDispatchToProps)(withFirebase(AddressFormBase))

export {AddressForm};
