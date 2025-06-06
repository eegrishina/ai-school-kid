import { useAppDispatch } from "../../hooks/useAppDispatch";
import { AllQuestionsStl } from "./AllQuestions.styled";
import rawQuestionsFields from '../../data/questions.json';
import type { QuestionsDetails } from "../../types";
import { updateAnswer } from "./questionsSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

const questionsFields: QuestionsDetails[] = rawQuestionsFields as QuestionsDetails[]

export default function AllQuestions() {
    const dispatch = useAppDispatch();
    const answers = useAppSelector(state => state.questions.answers);

    const handleChange = (id: string, answer: string) => {
        dispatch(updateAnswer({ id, answer }));
    };

    return (
        <AllQuestionsStl>
            {questionsFields.map(({ id, section, questions }: QuestionsDetails) => (
                <div key={id}>
                    <h2>Раздел {id}. {section}</h2>
                    <div className="questions-block">
                        {questions.map((q) => (
                            <div key={q.id} className="questions-blockooo">
                                <label>
                                    {q.text}:<span className="required">*</span>
                                </label>
                                {q.type === 'radio' && q.options ? (
                                    <div className="radio-group">
                                        {q.options.map(option => (
                                            <label key={option} className="custom-radio">
                                                <input
                                                    type="radio"
                                                    name={q.id}
                                                    value={option}
                                                    checked={answers[q.id] === option}
                                                    onChange={e => handleChange(q.id, e.target.value)}
                                                    required
                                                />
                                                <span className="radio-mark" />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <textarea
                                        value={answers[q.id] || ''}
                                        onInput={(e) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            target.style.height = 'auto';
                                            target.style.height = `${target.scrollHeight}px`;
                                            const fixText = target.value.replace(/<[^>]*>?/gm, '');
                                            handleChange(q.id, fixText);
                                        }}
                                        required
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </AllQuestionsStl>
    )
}
