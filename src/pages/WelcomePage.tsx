import styled from 'styled-components';
import Button from "../components/Button";

export default function WelcomePage() {
    return (
        <WelcomePageStl>
            <h1>ИИ-психодиагностика</h1>
            <p>
                Добро пожаловать!
                Вы находитесь на странице исследования психоэмоционального состояния детей.
                С помощью современных ИИ-технологий мы анализируем результаты психодиагностики, чтобы помочь лучше понять внутренний мир ребёнка.
            </p>
            <p>Готовы начать?</p>
            <Button text='Начать тест' link='/upload' />
        </WelcomePageStl>
    )
}

const WelcomePageStl = styled.div`
    max-width: 904px;
    margin: 0 auto;
    padding: 48px;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: 40px;

    h1 {
        font-size: 3rem;
        margin-bottom: 20px;
        color: ${({ theme }) => theme.colors.blue100};
    }

    p {
        font-size: 1.2rem;
        line-height: 1.5;
        margin-bottom: 30px;
    }

    a {
        font-size: 24px;
    }
`;
