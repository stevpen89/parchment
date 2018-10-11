const initialState = {
  crazyExists  : false,
  binaryExists : false,
  singleExists : false,
  crazyID      : 0,
  binaryID     : 0,
  singleID     : 0,
  saved        : false
}

const SET_CRAZY     = "SET_CRAZY";
const SET_BINARY    = "SET_BINARY";
const SET_SINGLE    = "SET_SINGLE";
const SET_CRAZY_ID  = "SET_CRAZY_ID";
const SET_BINARY_ID = "SET_BINARY_ID";
const SET_SINGLE_ID = "SET_SINGLE_ID";
const SAVED_MESSAGE = "SAVED_MESSAGE";

export function setCrazy     (val) { return { type: SET_CRAZY,     payload: val } };
export function setBinary    (val) { return { type: SET_BINARY,    payload: val } };
export function setSingle    (val) { return { type: SET_SINGLE,    payload: val } };
export function setCrazyID   (val) { return { type: SET_CRAZY_ID,  payload: val } };
export function setBinaryID  (val) { return { type: SET_BINARY_ID, payload: val } };
export function setSingleID  (val) { return { type: SET_SINGLE_ID, payload: val } };
export function savedMessage ()    { return { type: SAVED_MESSAGE } }

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case SET_CRAZY     : return Object.assign({}, state, { crazyExists  : action.payload });
    case SET_BINARY    : return Object.assign({}, state, { binaryExists : action.payload });
    case SET_SINGLE    : return Object.assign({}, state, { singleExists : action.payload });
    case SET_CRAZY_ID  : return Object.assign({}, state, { crazyID      : action.payload });
    case SET_BINARY_ID : return Object.assign({}, state, { binaryID     : action.payload });
    case SET_SINGLE_ID : return Object.assign({}, state, { singleID     : action.payload });
    case SAVED_MESSAGE : return Object.assign({}, state, { saved        : !state.saved   });
    default : return state;
    
  }
}