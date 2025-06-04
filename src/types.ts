export interface UploadedPhoto {
    id: number;
    previewUrl: string | null;
}

export interface PhotosState {
    photos: UploadedPhoto[];
    taskId: string | null;
}
