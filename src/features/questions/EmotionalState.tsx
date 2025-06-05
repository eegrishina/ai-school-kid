import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setEmotionalState } from './questionsSlice';
import type { EmotionalState } from '../../types';
import { EmotionalStateSelectorStl } from "./EmotionalState.styled";

const emojiOptions: { emoji: string; label: EmotionalState }[] = [
    { emoji: '😢', label: 'Грустное' },
    { emoji: '😬', label: 'Взволнованное' },
    { emoji: '😌', label: 'Спокойное' },
    { emoji: '😊', label: 'Радостное' },
    { emoji: '🤩', label: 'Воодушевленное' },
];

export default function EmotionalStateSelector() {
    const dispatch = useAppDispatch();
    const selected = useAppSelector((state) => state.questions.emotionalState);

    const handleSelect = (label: EmotionalState) => {
        dispatch(setEmotionalState(label));
    };

    return (
        <EmotionalStateSelectorStl>
            <h2>Какое сейчас у ребенка эмоциональное состояние?</h2>
            <div className="emoji-options">
                {emojiOptions.map(({ emoji, label }) => (
                    <div key={label}>
                        <button
                            className={`emoji-btn ${selected === label ? 'selected' : ''}`}
                            onClick={() => handleSelect(label)}
                            type="button"
                        >
                            <span role="img" aria-label={label}>
                                {emoji}
                            </span>
                        </button>
                        <div className="emoji-label">{label}</div>
                    </div>
                ))}
            </div>
        </EmotionalStateSelectorStl>
    );
}
