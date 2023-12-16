import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { adminbaseURL, userURL } from '../../Base/Constent'

export const getProducts = createAsyncThunk('admin/products', async () => {
    const response = await axios.get(`${adminbaseURL}/allproducts`, { withCredentials: true });
    console.log(response.data,"In productSlice");
    return response.data;  // access the data property of the response
});
export const getProductsHome = createAsyncThunk('home/products', async () => {
    const response = await axios.get(`${userURL}/get/allproducts`, { withCredentials: true });
    console.log(response.data,"In productSlice home");
    return response.data;  // access the data property of the response
});



export const uploadProduct = createAsyncThunk('products/upload', async (formData) => {
    try {
        const res = await axios.post(`${adminbaseURL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw Error(error.response?.data?.msg || "Upload failed");
    }
});

export const editProduct = createAsyncThunk('products/edit', async (formData) => {
    try {
      const res = await axios.put(`${adminbaseURL}/product/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      throw Error(error.response?.data?.msg || 'Edit failed');
    }
  });
  


const productSlice = createSlice({
    name:'products',
    initialState:{
        products:[],
        error: null,
        updateId: null,
    },
    reducers:{
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(uploadProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload.details;
                state.error = null;
            })
            .addCase(uploadProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload
                state.error = null;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getProductsHome.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductsHome.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload
                state.error = null;
            })
            .addCase(getProductsHome.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        }
})


export const {setProducts, setUpdateId} = productSlice.actions;
export const selectUpdateId = (state) => state.products.updateId;


export default productSlice.reducer;