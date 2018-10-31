const initialState = {
  products : [],
}

const SET_PRODUCTS = "SET_PRODUCTS";

export function setProducts (val) { return { type: SET_PRODUCTS, payload: val } };

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case SET_PRODUCTS : return Object.assign({}, state, { products : action.payload });
    default           : return state;
    
  }
}