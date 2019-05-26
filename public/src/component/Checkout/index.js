import React, { Component } from "react";
import { CreditCard } from "../CheckOut_CreditCard";
import { withAuthorization } from "../Session";
import { SubIntro } from "../Sub_Intro";
import { withRouter } from "react-router-dom";
import { EventInfo } from "../Event_Info";
import { OrderInfo } from "../Order_Info";
import { Menu } from "../Checkout_Menu";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

const INITIAL_STATE = {
  success: "",
  name: "",
  number: "",
  month: "",
  year: "",
  ccv: "",
  date: "",
  time: "",
  menuItem: ""
};

class CheckoutBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const { name, number, month, year, ccv, date, time, menuItem } = this.state;
    const customerevent = this.props.location.state.event;
    this.props.firebase
      .addOrder()
      .set(
        {
          creditCard: {
            name,
            number,
            month,
            year,
            ccv
          },
          orderDetails: {
            date,
            time,
            menuItem
          },
          eventDetails: {
            customer: customerevent.creator,
            title: customerevent.summary,
            location: customerevent.location,
            startDate: customerevent.start,
            endDate: customerevent.end
          }
        },
        { merge: true }
      )
      .then(() => {
        this.setState({
          success: "Order Placed Successfully"
        });
      })
      .then(() => {
        setTimeout(()=>{
          this.props.history.push(ROUTES.DASHBOARD)
        }, 2000);
      })
      .catch(error => {
        this.setState({
          error
        });
      });
  };

  
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (this.props.location.state === undefined) {
      this.props.history.push(ROUTES.EVENTS);
      return null;
    } else {
      const { success } = this.state;
      return (
        <section id="maincontent">
          <SubIntro heading="One-Page Checkout" />
          <div className="container">
            <div className="row-fluid">
            {success && <h1>{success}</h1>}
              <form onSubmit={this.onSubmit}>
                <div className="span4">
                  <EventInfo
                    formInputs={this.props.location.state.event}
                    readOnly
                  />
                </div>
                <div className="span4">
                  <OrderInfo formInputs={this.state} onChange={this.onChange} />
                  <Menu formInputs={this.state} onChange={this.onChange} />
                </div>
                <div className="span4">
                  <CreditCard
                    formInputs={this.state}
                    onChange={this.onChange}
                  />
                  <button className="btn btn-default">Place Order</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      );
    }
  }
}

const condition = authUser => !!authUser;

const CheckoutChild = compose(
  withRouter,
  withFirebase
)(CheckoutBase);

export const Checkout = withAuthorization(condition)(CheckoutChild);
