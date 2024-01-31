import { configureStore } from "@reduxjs/toolkit";
import dmjSlice from "./dmjSlice";

const store = configureStore({
    reducer: {
        product: dmjSlice
    }
})


export default store