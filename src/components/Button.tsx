import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ButtonProps {
    text: string;
    link: string;
    disabled?: boolean;
    isBack?: boolean;
    onClick?: () => boolean | void | Promise<boolean | void>;
}

export default function Button({ text, link, disabled = false, isBack = false, onClick }: ButtonProps) {
    const navigate = useNavigate();

    const handleClick = async () => {
        if (disabled) return;
        if (onClick) {
            const result = await onClick();
            if (!result) return;
        }
        navigate(link);
    };

    return (
        <ButtonStl onClick={handleClick} disabled={disabled} isBack={isBack}>
            {text}
        </ButtonStl>
    );
}

const ButtonStl = styled.button<{ isBack: boolean }>`
    background-color: ${({ theme, isBack }) =>
        isBack ? theme.colors.blue050 : theme.colors.blue100};
    color: ${({ theme, isBack }) =>
        isBack ? theme.colors.default : theme.colors.surface};
    border-radius: 100px;
    border: none;
    padding: 10px 24px;
    font-size: 16px;
    transition: all 0.3s ease-in;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme, isBack }) =>
        isBack ? theme.colors.blue070 : theme.colors.blue110};
    }

    &:disabled {
        background-color: ${({ theme }) => theme.colors.disabledbtn};
        color: ${({ theme }) => theme.colors.disabled};
        cursor: default;
    }

    @media ${({ theme }) => theme.device.mobile} {
        font-size: 14px;
    }
`;
