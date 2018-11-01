const initialState = {
  products : [],
  userCart : []
}

const SET_PRODUCTS = "SET_PRODUCTS";
const SET_CART = "SET_CART";

export function setProducts (val) { return { type: SET_PRODUCTS, payload: val } };
export function setCart (val) { return { type: SET_CART, payload: val } };

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case SET_PRODUCTS : return Object.assign({}, state, { products : action.payload });
    case SET_CART     : return Object.assign({}, state, { userCart : action.payload });
    default           : return state;
    
  }
}