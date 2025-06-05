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
                                    {q.text}: <span className="required">*</span>
                                </label>

                                {q.type === 'radio' && q.options ? (
                                    <div className="radio-group">
                                        {q.options.map(option => (
                                            <label key={option}>
                                                <input
                                                    type="radio"
                                                    name={q.id}
                                                    value={option}
                                                    checked={answers[q.id] === option}
                                                    onChange={e => handleChange(q.id, e.target.value)}
                                                    required
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <input
                                        type={q.type}
                                            value={answers[q.id] || ''}
                                        onChange={e => handleChange(q.id, e.target.value)}
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
