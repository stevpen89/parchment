const initialState = {
  user_id      : null,
  user_name    : null,
  user_email   : null,
  auth_id      : null,
  auth_picture : null,
  user_admin   : null
}

const SET_USER    = "SET_USER";
const DELETE_USER = "DELETE_USER";

export function setUser(val) { return { type: SET_USER, payload: val } }
export function deleteUser() { return { type: DELETE_USER } }

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case SET_USER    : return Object.assign({}, state, action.payload)
    case DELETE_USER : return Object.assign({}, state, {
      user_id      : null,
      user_name    : null,
      user_email   : null,
      auth_id      : null,
      auth_picture : null,
      user_admin   : null,
    })
    default : return state;
    
  }
}