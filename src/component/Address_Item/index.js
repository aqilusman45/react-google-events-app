import React, { Component } from 'react';

class AddressItem extends Component {
  render() {
    const { disabled } = this.props;
  
    const isDisabled = disabled === 'disabled';

    return (
        <div className="addressitem">
            <label className="">{this.props.label}</label>
                <input disabled={isDisabled}
                  type="text"
                  id={this.props.id}
                  defaultValue={this.props.value}
                  onChange={this.props.onChange}
                  className="form-control"
                  placeholder={this.props.placeholder} />
        </div>
      );
  }
}

export default AddressItem;
