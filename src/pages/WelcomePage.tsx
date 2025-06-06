import styled from 'styled-components';
import Button from "../components/Button";
import Wrapper from "../components/Wrapper";

export default function WelcomePage() {
    return (
        <Wrapper>
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
        </Wrapper>
    )
}

const WelcomePageStl = styled.div`
    padding: 64px 64px 32px;
    text-align: center;

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

    @media ${({ theme }) => theme.device.tablet} {
        padding: 24px 24px 0px;
        h1 {
            font-size: 28px;
        }
        p {
            font-size: 16px;
        }
    }
    
    @media ${({ theme }) => theme.device.mobile} {
        padding: 24px 16px 0px;
        h1 {
            font-size: 22px;
        }
        p {
            font-size: 14px;
        }
    }
`;
