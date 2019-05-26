import React from "react";

export const Menu = props => {
  const { menuItem } = props.formInputs
  return (
    <div>
      <h4>Menu</h4>
      <select name="menuItem" value={menuItem} onChange={props.onChange}>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option defaultValue value="coconut">
          Coconut
        </option>
        <option value="mango">Mango</option>
      </select>
    </div>
  );
};
