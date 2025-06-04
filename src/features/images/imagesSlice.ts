import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PhotosState } from "../../types";

const initialState: PhotosState = {
    photos: [
        { id: 0, file: null, previewUrl: null },
        { id: 1, file: null, previewUrl: null },
        { id: 2, file: null, previewUrl: null },
    ],
    taskId: null,
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        uploadPhoto(state, action: PayloadAction<{ id: number; file: File; previewUrl: string }>) {
            const index = state.photos.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.photos[index] = {
                    id: action.payload.id,
                    file: action.payload.file,
                    previewUrl: action.payload.previewUrl,
                };
            }
        },
        setTaskId(state, action: PayloadAction<string>) {
            state.taskId = action.payload;
        },
        resetPhoto(state, action: PayloadAction<number>) {
            const index = state.photos.findIndex(p => p.id === action.payload);
            if (index !== -1) {
                state.photos[index] = { id: action.payload, file: null, previewUrl: null };
            }
        },
    },
});

export const { uploadPhoto, setTaskId, resetPhoto } = photosSlice.actions;
export default photosSlice.reducer;
