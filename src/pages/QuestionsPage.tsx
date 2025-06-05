import styled from 'styled-components';
import Button from "../components/Button";
import handIcon from "../assets/hand.svg";
import flagIcon from "../assets/flag.svg";
import ChildInfoForm from "../features/questions/ChildInfo";
import { useAppSelector } from "../hooks/useAppSelector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllQuestions from "../features/questions/AllQuestions";
import EmotionalStateSelector from "../features/questions/EmotionalState";
import Wrapper from "../components/Wrapper";
import Progress from "../components/Progress";

export default function QuestionsPage() {
    const navigate = useNavigate();
    const childDetails = useAppSelector((state) => state.questions.childInfo);
    const isChildInfoValid = useAppSelector((state) => state.questions.isChildInfoValid);
    const isAnswersCompleted = useAppSelector((state) => state.questions.isAnswersCompleted);
    const answers = useAppSelector(state => state.questions.answers);
    const taskId = useAppSelector((state) => state.photos.taskId);
    const emoji = useAppSelector((state) => state.questions.emotionalState);
    const [error, setError] = useState<string | null>(null);
    const step = 2;

    const handleSubmit = async () => {
        if (!isChildInfoValid && !isAnswersCompleted) return;

        try {
            const response = await fetch('https://sirius-draw-test-94500a1b4a2f.herokuapp.com/submit-survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task_id: taskId,
                    survey: {
                        ...childDetails,
                        ...answers,
                        emotionalState: emoji,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                const message = errorData?.detail?.[0]?.msg || 'Произошла ошибка при отправке формы.';
                setError(message);
                return;
            }

            navigate('/result');
        } catch (error) {
            console.error('Upload images failed', error);
            setError('Произошла ошибка при отправке формы.');
        }
    };

    return (
        <Wrapper>
            <QuestionsPageStl>
                <Progress step={step} />
                <div className="content">
                    <ChildInfoForm />
                    <div className="warning">
                        <div>
                            <img src={handIcon} alt="hand" />
                            <p>Пожалуйста, внимательно прочитайте каждый вопрос и выберите наиболее подходящий вариант ответа, отражающий поведение и эмоциональное состояние вашего ребенка в течение последних 2-4 недель. Отвечайте максимально честно и искренне, так как от этого зависит точность оценки психоэмоционального развития Вашего ребенка.</p>
                        </div>
                        <div>
                            <img src={flagIcon} alt="flag" />
                            <p>Все вопросы обязательны к заполнению.</p>
                        </div>
                    </div>
                    <AllQuestions />
                    <EmotionalStateSelector />
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                    <div className="bottom-part">
                        <p>Шаг {step}/3</p>
                        <div>
                            <Button text='К загрузке рисунков' link='/upload' isBack />
                            <Button
                                text='Узнать результаты'
                                link='/result'
                                onClick={handleSubmit}
                                disabled={!(isChildInfoValid && isAnswersCompleted)}
                            />
                        </div>
                    </div>
                </div>
            </QuestionsPageStl>
        </Wrapper>
    )
}

const QuestionsPageStl = styled.div`
    .content {
        display: flex;
        flex-direction: column;
        gap: 64px;
        padding: 0 64px;

        .warning {
            display: flex;
            flex-direction: column;
            gap: 16px;
            background-color: #FDEEEF;
            color: ${({ theme }) => theme.colors.default};
            font-size: 14px;
            border-radius: 8px;
            padding: 24px;

            > div {
                display: flex;
                align-items: flex-start;
                gap: 16px;
                img {
                    flex-shrink: 0;
                    width: 32px;
                    height: 32px;
                }
            }
        }
    }

    .bottom-part {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 64px;

        p {
            color: ${({ theme }) => theme.colors.muted};
        }

        > div {
            display: flex;
            gap: 8px;
        }
    }

    @media ${({ theme }) => theme.device.tablet} {
        .content {
            padding: 0 24px;
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        .content {
            padding: 0 16px;
        }
    }
`;
