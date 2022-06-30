import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productServices from "./productServices";

const initialState = {
    products: [],
    isLoading: false,
    offset: 10,
    formData: {name: '', category: ''}
}
// --------- get all products ----------
export const getProducts = createAsyncThunk('product/getProducts', async({query}) => {
    try {
        return await productServices.getProducts(query)
    } catch (error) {
        console.log(error)
    }
})
// --------- get new products ----------
export const getNewProducts = createAsyncThunk('products/getNewProducts', async({query}) => {
    try {
        return await productServices.getProducts(query)
    } catch (error) {
        console.log(error)
    }
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        search: (state, {payload}) => {
            state.formData = payload
            state.offset = 10
        },
        reset: (state) => {
            state.formData = {name: '', category: ''}
            state.isLoading = false
            state.offset = 10
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, state => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading= false
                state.products = action.payload.products
            })
            .addCase(getNewProducts.fulfilled, (state, action) => {
                if(action?.payload.products.length){
                    state.offset = state.offset + 10
                    state.products = [...state.products, ...action.payload.products]
                }
            })
    }
})

export const {search, reset} = productSlice.actions
export default productSlice.reducer