import { AddressActions } from "../actions/address";


const INITIAL_STATE ={
    address: '',
}

export const  AddressReducers = ( state = {...INITIAL_STATE}, action)=>{
    switch (action.type) {
        case AddressActions.ADD_ADDRESS:
        state.address = action.payload;
            return {...state}
        case AddressActions.CLEAR_ADDRESS:
        state.address = '';
            return {...state}
        default:
            return state
    }
}