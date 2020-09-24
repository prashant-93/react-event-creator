import {createStore} from "redux";
import reducersList from "../Reducers";

const storeInitialState = {
    eventInfo: []
};

if(localStorage.getItem('event_list')) {
    storeInitialState.eventInfo = [...JSON.parse(localStorage.getItem('event_list'))];
}

let defaultStore = createStore(reducersList, storeInitialState);
export default defaultStore;
