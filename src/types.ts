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
    answers: Record<string, string>;
    isAnswersCompleted: boolean;
}

export type ChildInfoKeys = 'childName' | 'childDOB' | 'childGender' | 'parentName';

export interface ChildInfoDetails {
    label: string;
    type: 'text' | 'date' | 'radio';
    key: ChildInfoKeys;
    options?: string[];
}

export type QuestionsOptions = 'Очень редко' | 'Редко' | 'Иногда' | 'Часто' | 'Всегда';

interface Questions {
    id: string;
    text: string;
    type: 'text' | 'radio';
    options?: QuestionsOptions[];
}
export interface QuestionsDetails {
    id: number;
    section: string;
    questions: Questions[];
}
