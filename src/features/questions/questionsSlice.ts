import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChildInfoFormState } from "../../types";

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
}

const validateChildInfo = (childInfo: ChildInfoFormState['childInfo']) => {
    return Object.values(childInfo).every((value) => value.trim() !== '');
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
            state.isAnswersCompleted = Object.keys(state.answers).length === 40;
        }
    },
})

export const { updateChildInfo, updateAnswer } = questionsSlice.actions;
export default questionsSlice.reducer;
