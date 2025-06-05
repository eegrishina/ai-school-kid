export interface UploadedPhoto {
    id: number;
    previewUrl: string | null;
}

export interface PhotosState {
    photos: UploadedPhoto[];
    taskId: string | null;
}

export interface ChildInfo {
    childName: string;
    childDOB: string;
    childGender: string;
    parentName: string;
}

export interface ChildInfoFormState {
    childInfo: ChildInfo;
    isChildInfoValid: boolean;
}

export type ChildInfoKeys = 'childName' | 'childDOB' | 'childGender' | 'parentName';

export interface ChildInfoDetails {
    label: string;
    type: 'text' | 'date' | 'radio';
    key: ChildInfoKeys;
    options?: string[];
}
