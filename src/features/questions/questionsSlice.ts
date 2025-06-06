import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChildInfo, ChildInfoFormState, EmotionalState } from "../../types";

const initialState: ChildInfoFormState = {
    childInfo: {
        childName: '',
        childDOB: '',
        childGender: 'Мужской',
        parentName: '',
    },
    isChildInfoValid: false,
    answers: {},
    isAnswersCompleted: false,
    emotionalState: null,
}

const validateChildInfo = (childInfo: ChildInfo): boolean => {
    return Object.values(childInfo).every((value) => value.trim() !== '');
};

const validateAnswersAndEmotion = (answers: Record<string, string>, emotionalState: EmotionalState | null): boolean => {
    return Object.keys(answers).length === 40 && emotionalState !== null;
};

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        updateChildInfo: (
            state,
            action: PayloadAction<{ key: keyof ChildInfoFormState['childInfo']; value: string }>
        ) => {
            state.childInfo[action.payload.key] = action.payload.value;
            state.isChildInfoValid = validateChildInfo(state.childInfo);
        },
        updateAnswer: (
            state,
            action: PayloadAction<{ id: string; answer: string }>
        ) => {
            state.answers[action.payload.id] = action.payload.answer;
            state.isAnswersCompleted = validateAnswersAndEmotion(state.answers, state.emotionalState);
        },
        setEmotionalState: (state, action: PayloadAction<EmotionalState>) => {
            state.emotionalState = action.payload;
            state.isAnswersCompleted = validateAnswersAndEmotion(state.answers, state.emotionalState);
        },
    },
})

export const { updateChildInfo, updateAnswer, setEmotionalState } = questionsSlice.actions;
export default questionsSlice.reducer;
