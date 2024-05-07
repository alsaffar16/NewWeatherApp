import { UID } from "../actions/uid";


export type UIDAction = {
    type: string;
    id: string;
}
interface UIDState {
    uid: String
}


const intialState: UIDState = {
    uid: ""
};

const uidReducer = (state = intialState, action: UIDAction) => {
    switch (action.type) {
        case UID:
            return { ...state, uid: action.id };

        default:
            return state;
    }
};

export default uidReducer;
