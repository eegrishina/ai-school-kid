export interface UploadedPhoto {
    id: number;
    file: File | null;
    previewUrl: string | null;
}

export interface PhotosState {
    photos: UploadedPhoto[];
    taskId: string | null;
}
  