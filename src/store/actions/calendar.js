export class CalendarActions {
    static ACCESS_TOKEN = 'ACCESS_TOKEN';

    static getAccessToken(payload){
        return {
            type: CalendarActions.ACCESS_TOKEN,
            payload,
        }
    }
}