import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false
};

export const loaderSlice = createSlice({
    name: 'Loader',
    initialState,
    reducers: {
        showLoader: (state) => {
            state.isLoading = true;
        },
        hideLoader: (state) => {
            state.isLoading = false;
        }
    }
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;