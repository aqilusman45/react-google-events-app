import React from "react";

export const SubIntro = (props) => {
  return (
    <section id="subintro">
      <div className="container">
        <div className="row">
          <div className="span4">
          <h3>
            {props.heading}
          </h3>
          </div>
          <div className="span8">
          </div>
        </div>
      </div>
    </section>
  );
};
