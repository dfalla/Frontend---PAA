import { configureStore } from '@reduxjs/toolkit';
import { authSlice, studentSlice, calendarSlice, uiSlice } from './';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        student: studentSlice.reducer,
        ui: uiSlice.reducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})