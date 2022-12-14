// import { createContext, useReducer } from "react";

// import { createAction } from "../utils/reducer/reducer.utils";

// const addCartItem = (cartItems, productToAdd) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productToAdd.id
//   );
//   if (existingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }
//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };


// const removeCartItem = (cartItems, cartItemToRemove) => {
//   // find the cart item to remove
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === cartItemToRemove.id
//   );
//   // check if quantity is equal to 1, if it is remove that item from the cart
//   if (existingCartItem.quantity === 1) {
//     return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
//   }
//   // return back cartitems with matching cart item with reduced quantity
//   return cartItems.map((cartItem) =>
//     cartItem.id === cartItemToRemove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   );
// };


// const removeAllFromCart = (cartItems, cartItemToClear) => {
//   const existingCartItem = cartItems.find((cartItem) =>
//     cartItem.id === cartItemToClear.id
//   );
//   return cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id);
// }

// export const CartContext = createContext({
//   isCartOpen: false,
//   setisCartOpen: () => { },
//   cartItems: [],
//   // setCartItems: () => { },
//   addItemToCart: () => { },
//   removeItemFromCart: () => { },
//   cartCount: 0,
//   cartTotal: 0,
//   clearItemFromCart: () => { },
// });

// const CART_ACTION_TYPES = {
//   SET_CART_ITEMS: 'SET_CART_ITEMS',
//   SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
// }

// const INITIAL_STATE = {
//   isCartOpen: false,
//   cartItems: [],
//   cartCount: 0,
//   cartTotal: 0,
// }

// const cartReducer = (state, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case CART_ACTION_TYPES.SET_CART_ITEMS:
//       return {
//         ...state,
//         ...payload
//       }
//     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//       return {
//         ...state,
//         isCartOpen: payload,
//       }
//     default:
//       throw new Error(`Unhandler type of ${type} in cartReducer`)
//   }
// };

// export const CartProvider = ({ children }) => {

//   const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
//   const { cartItems, cartTotal, cartCount, isCartOpen } = state;


//   const updateCartItemsReducer = (newCartItems) => {
//     const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

//     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
//     const NewIsCartOpen = setIsCartOpen();

//     dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount, isCartOpen: NewIsCartOpen }));
//   };

//   const addItemToCart = (product) => {
//     const newCartItems = addCartItem(cartItems, product);
//     updateCartItemsReducer(newCartItems);
//   }
//   const removeItemFromCart = (cartItemToRemove) => {
//     const newCartItems = removeCartItem(cartItems, cartItemToRemove);
//     updateCartItemsReducer(newCartItems);
//   }
//   const clearItemFromCart = (cartItemToClear) => {
//     const newCartItems = removeAllFromCart(cartItems, cartItemToClear);
//     updateCartItemsReducer(newCartItems);
//   }
//   const setIsCartOpen = (bool) => {
//     dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
//     // console.log(bool);
//   }
//   const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal, };
//   return (
//     <CartContext.Provider value={value}> {children}</CartContext.Provider>
//   )
// };





