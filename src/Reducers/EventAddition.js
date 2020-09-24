import { EVENT_INFO } from '../Constants';

export default function EventAddition(state = null, action) {
    switch (action.type) {
        case EVENT_INFO:
            return action.payload.value;
        default:
            return state;
    }
}
