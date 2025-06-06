import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PhotosState } from "../../types";

const initialState: PhotosState = {
    photos: [
        { id: 0, previewUrl: null },
        { id: 1, previewUrl: null },
        { id: 2, previewUrl: null },
    ],
    taskId: null,
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPreview(state, action: PayloadAction<{ id: number; previewUrl: string }>) {
            const index = state.photos.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.photos[index].previewUrl = action.payload.previewUrl;
            }
        },
        setTaskId(state, action: PayloadAction<string>) {
            state.taskId = action.payload;
        },
        resetPreview(state, action: PayloadAction<number>) {
            const index = state.photos.findIndex(p => p.id === action.payload);
            if (index !== -1) {
                state.photos[index].previewUrl = null;
            }
        },
    },
});

export const { setPreview, setTaskId, resetPreview } = photosSlice.actions;
export default photosSlice.reducer;
