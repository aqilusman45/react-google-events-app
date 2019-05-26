import React from "react";

export const AlertBox = props => {
  return (
    <div className="alert alert-success">
      <button type="button" className="close" data-dismiss="alert">
        ×
      </button>
      <p className="alertmessage">{props.message}</p>
    </div>
  );
};
