import { configureStore } from '@reduxjs/toolkit';
import photosReducer from '../features/images/imagesSlice';
import formReducer from '../features/questions/questionsSlice';

export const store = configureStore({
    reducer: {
        photos: photosReducer,
        questions: formReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
