import { createSlice } from "@reduxjs/toolkit";

// const addToCart = localStorage.getItem(addtocart)

const initialState = {
    search: 'd',
    totalPrice: '',
    totalDis: '',
    totalAmount: '',
    amount: [],
    product: [],
    amount: 0,
    price: 0,
    discount: 0,
    quantity: 0,
    productVariantId: 0,
    orderId: 0,
}

const productSlice = createSlice({
    name: "dmj",
    initialState,
    reducers: {
        addSearch: (state, payload) => {
            state.search = payload
        },
        addPrice: (state, payload) => {
            state.totalPrice = payload
        },
        addDiscount: (state, payload) => {
            state.totalDis = payload
        },
        addTotalAmount: (state, payload) => {
            state.totalAmount = payload
        },
        updateAmount: (state, payload) => {
            state.amount = payload
        },
        updateProduct: (state, payload) => {
            state.product = payload
        },
        setProductData: (state, action) => {
            // Update state properties with the data from the action payload
            state.amount = parseFloat(action.payload.amount);
            state.price = parseFloat(action.payload.price);
            state.discount = parseFloat(action.payload.discount);
            state.quantity = parseInt(action.payload.quantity);
            state.productVariantId = parseInt(action.payload.productVariantId);
            state.orderId = parseInt(action.payload.orderId);
        },
    }

});


export const { addSearch, updateAmount, updateProduct,setProductData } = productSlice.actions

export default productSlice.reducer;