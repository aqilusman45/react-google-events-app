import React, { Component } from "react";
import { ChangePassword } from "../Change_Password";
import { AddressUpdate } from "../Address_Update";
import { withAuthorization } from "../Session";
import { SubIntro } from "../Sub_Intro";

class AccountSettingsBase extends Component {
  render() {
    return (
      <section id="maincontent">
        <SubIntro heading="Account Settings" />
        <div className="container">
          <div className="row-fluid">
            <div className="span12">
              <div className="row-fluid">
                <div className="span4">
                  <ChangePassword />
                </div>
                <div className="span4">
                  <h5>Update Address</h5>
                  <AddressUpdate />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const condition = authUser => !!authUser;

export const AccountSettings = withAuthorization(condition)(
  AccountSettingsBase
);
