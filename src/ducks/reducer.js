const initialState = {
  user_id      : 1,
  user_name    : 'Steven Penfield',
  user_email   : null,
  auth_id      : null,
  auth_picture : 'https://lh4.googleusercontent.com/-WtSvKjFYiXM/AAAAAAAAAAI/AAAAAAAAAHc/fXzUoy8H42A/photo.jpg',
  user_admin   : null,
  saved        : false
}

const SET_USER      = "SET_USER";
const DELETE_USER   = "DELETE_USER";
const SAVED_MESSAGE = "SAVED_MESSAGE";

export function setUser(val)   { return { type: SET_USER, payload: val } }
export function deleteUser()   { return { type: DELETE_USER } }
export function savedMessage() { return { type: SAVED_MESSAGE } }

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case SET_USER    : return Object.assign({}, state, action.payload)
    case DELETE_USER : return Object.assign({}, state, {
      user_id      : null,
      user_name    : null,
      user_email   : null,
      auth_id      : null,
      auth_picture : null,
      user_admin   : null
    })
    case SAVED_MESSAGE : return Object.assign({}, state, {saved: !state.saved})
    default : return state;
    
  }
}