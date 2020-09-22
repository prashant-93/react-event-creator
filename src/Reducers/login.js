import { LOGIN_INFO } from '../Constants';

export default function Login(state = null, action) {
    switch (action.type) {
        case LOGIN_INFO:
            return action.payload.value;
        default:
            return state;
    }
}
