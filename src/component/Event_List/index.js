import React, { Component } from 'react';

class EventList extends Component {
  render() { 
    
    return ( 
      <table className="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Event Name</th>
        <th>Attendees</th>
      </tr>
    </thead>
    <tbody>
     {
       this.props.events.map((event , index)=>{
         return(
          <tr key={index}>
          <td>{index + 1}</td>
          <td>{event.summary}</td>
          <td>{
            event.attendees ? event.attendees.map((item,index)=> <p key={index}>{item.email}</p>):
            null
          }</td>
          <td>
            <button className="btn btn-outline-secondary" onClick={()=>this.props.viewDetails(index)}>
              View Details
            </button>
          </td>
          <td>
            <button className="btn btn-outline-secondary" onClick={()=>this.props.editEvent(index)}>
              Edit Event
            </button>
          </td>
          <td>
            <button className="btn btn-outline-secondary" onClick={()=>this.props.deleteEvent(index)}>
              Delete Event
            </button>
          </td>
          <td>
            <button className="btn btn-outline-secondary" onClick={()=>this.props.orderParty(index)}>
              Order Party!
            </button>
          </td>
        </tr>
         )
       })
     }
    </tbody>
  </table>
)}
}
 
export {EventList};
