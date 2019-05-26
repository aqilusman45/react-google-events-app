import { createStore, combineReducers } from "redux";
import { AddressReducers } from "./reducers/address";

const allReducers = combineReducers({
  AddressReducers,
});

export const CreateStore = createStore(allReducers);
