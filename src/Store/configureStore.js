import {createStore} from "redux";
import reducersList from "../Reducers";

const storeInitialState = {
    loginData: null
};

let defaultStore = createStore(reducersList, storeInitialState);
export default defaultStore;
