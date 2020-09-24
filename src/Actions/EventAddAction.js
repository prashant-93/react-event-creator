import {EVENT_INFO} from '../Constants';

export function setEventData(value) {
    return {
        type: EVENT_INFO,
        payload: {
            value,
        },
    };
}
