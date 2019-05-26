import React, { Component } from "react";

class FriendList extends Component {
  render() {
    return (
      <div>
        <h1>Friends List</h1>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {this.props.friends ? this.props.friends.map((item, index) => {              
              return (
                <tr key={index+1}>
                  <td>{index + 1}</td>
                  <td className="list-group-item">
                    {item.email}
                  </td>
                  <td>
                    {item.name}
                  </td>
                  <td>
                    {`${item.friendAddress}`}
                  </td>
                  <td className="list-group-item">
                    {
                    this.props.deleteButton ?  <button className="btn btn-outline-secondary" onClick={()=> this.props.deleteFriend(index)}>
                      Delete 
                  </button> : null
                    }
                  </td>
                  <td className="list-group-item">
                    {
                      this.props.addEmail ? <button className="btn btn-outline-secondary" 
                      onClick={(event)=>this.props.addEmail(event, index)}>
                        Invite
                      </button>:null
                    }
                  </td>
                </tr>
              );
            }) : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export { FriendList };
