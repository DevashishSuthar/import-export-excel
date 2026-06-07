import { configureStore } from '@reduxjs/toolkit';

import loaderSlice from '@/redux/Slices/LoaderSlice';

const store = configureStore({
    reducer: {
        loaderData: loaderSlice
    },
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export default store;