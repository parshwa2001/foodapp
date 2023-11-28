import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartData: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        SET_CART: (state, action) => {
            //   state.cartData = action.payload;
            state.cartData.push(action.payload);
        },
        UNSET_CART: (state) => {
            state.cartData = [];
        },
        CLEAR_CART: (state) => {
            state = initialState;
        },
        REMOVE_ITEM: (state, action) => {
            const itemIdToRemove = action.payload;
            const updatedCartData = state.cartData.filter(item => String(item._id) !== itemIdToRemove);
            state.cartData = updatedCartData;
        },



    },
});

export const { SET_CART, UNSET_CART, CLEAR_CART, REMOVE_ITEM } =
    cartSlice.actions;
export const cartReducer = cartSlice.reducer;
