import { CalendarActions } from "../actions/calendar";


const INITIAL_STATE ={
    accessToken: '',
}

export const  CalendarReducers = ( state = {...INITIAL_STATE}, action)=>{
    switch (action.type) {
        case CalendarActions.ACCESS_TOKEN:
            return Object.assign({}, state , {accessToken : action.payload})
        default:
            return state
    }
}