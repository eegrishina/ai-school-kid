import styled from 'styled-components';
import Button from "../components/Button";
import handIcon from "../assets/hand.svg";
import flagIcon from "../assets/flag.svg";

export default function QuestionsPage() {
    const step = 2;

    return (
        <QuestionsPageStl>
            <div className="progress">
                {[1, 2, 3].map((i) => (
                    <div key={i} className={step >= i ? 'filled' : ''}></div>
                ))}
            </div>
            <div className="content">
                {/* <Section0 /> */}
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
                {/* <Sections /> */}

                <div className="bottom-part">
                    <p>Шаг 2/3</p>
                    <div>
                        <Button text='К загрузке рисунков' link='/upload' isBack />
                        <Button text='Узнать результаты' link='/result' />
                    </div>
                </div>
            </div>
        </QuestionsPageStl>
    )
}

const QuestionsPageStl = styled.div`
    max-width: 904px;
    margin: 0 auto;
    padding-bottom: 32px;
    background-color: #fff;
    border-radius: 20px;

    .progress {
        display: flex;
        div {
            height: 16px;
            width: 100%;
            background-color: ${({ theme }) => theme.colors.blue050};
        }
        div.filled {
            height: 16px;
            background-color: ${({ theme }) => theme.colors.blue070};
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 64px;
        padding: 48px 64px 0;

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
`;
