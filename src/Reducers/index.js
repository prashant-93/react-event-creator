import {combineReducers} from "redux";
import EventAddition from "./EventAddition";

const reducersList = combineReducers({
    eventInfo: EventAddition
});

export default reducersList;
