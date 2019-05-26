import React, { Component } from 'react';
import AddressItem from '../Address_Item';

class AddressInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    console.log(evt);
    this.props.onChange(evt);
  }

  render() {
    return (

      <div className="card"><div className="card-body">
      <AddressItem disabled="disabled" label="Street" id="street" value={this.props.street} onChange={this.handleChange} placeholder="" />
      <AddressItem disabled="disabled" label="City" id="city" value={this.props.city} onChange={this.handleChange} placeholder="" />
      <AddressItem disabled="disabled" label="State" id="state" value={this.props.state} onChange={this.handleChange} placeholder="" />
      <AddressItem disabled="disabled" label="Postal Code" id="postalCode" value={this.props.postalCode} onChange={this.handleChange} placeholder="" />
      <AddressItem disabled="disabled" label="Country" id="country" value={this.props.country} onChange={this.handleChange} placeholder="" />
      </div></div>
    );
  }
}

export default AddressInput;
