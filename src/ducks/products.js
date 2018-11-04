const initialState = {
  products : [],
  userCart : [ { details:
    { product_sku: 3,
      product_name: 'Personalized Missionary Journal',
      product_tags: [Object],
      product_image: 'https://images.unsplash.com/photo-1540889539617-6236fa68e2f0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=64923c5e7a9e7b435b9058949a2cb5d8&auto=format&fit=crop&w=400&q=80',
      product_thumbs: [Object],
      product_desc: 'ultra fuzzy soft lorem ipsum blanket waifu...',
      product_price: 12.99,
      o1: '["title","subtitle","date"]' },
   info: { title: 'hi', subtitle: 'hi', date: 'hi' } },
 { details:
    { product_sku: 3,
      product_name: 'Personalized Missionary Journal',
      product_tags: [Object],
      product_image: 'https://images.unsplash.com/photo-1540889539617-6236fa68e2f0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=64923c5e7a9e7b435b9058949a2cb5d8&auto=format&fit=crop&w=400&q=80',
      product_thumbs: [Object],
      product_desc: 'ultra fuzzy soft lorem ipsum blanket waifu...',
      product_price: 12.99,
      o1: '["title","subtitle","date"]' },
   info: { title: 'ho', subtitle: 'ho', date: 'ho' } },
 { details:
    { product_sku: 3,
      product_name: 'Personalized Missionary Journal',
      product_tags: [Object],
      product_image: 'https://images.unsplash.com/photo-1540889539617-6236fa68e2f0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=64aWQiOjEyMDd9&s=64923c5e7a9e7b435b9058949a2cb5d8&auto=format&fit=crop&w=400&q=80',
      product_thumbs: [Object],
      product_desc: 'ultra fuzzy soft lorem ipsum blanket waifu...',
      product_price: 12.99,
      o1: '["title","subtitle","date"]' },
   info: { title: 'he', subtitle: 'he', date: 'he' } } ]
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