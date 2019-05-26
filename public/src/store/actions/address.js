export class AddressActions {
    static ADD_ADDRESS = 'ADD_ADDRESS';
    static CLEAR_ADDRESS = 'CLEAR_ADDRESS'

    static addAddress(payload){
        return {
            type: AddressActions.ADD_ADDRESS,
            payload,
        }
    }
    
    static clearAddress(payload){
        return{
            type: AddressActions.CLEAR_ADDRESS,
            payload,
        }
    }
}