import { Link } from "react-router-dom";
import styled from 'styled-components';

type ButtonProps = {
    text: string;
    link: string;
    isBack?: boolean;
};

export default function Button({ text, link, isBack = false }: ButtonProps) {
    return (
        <LinkStl to={link} isBack={isBack}>
            {text}
        </LinkStl>
    )
}

const LinkStl = styled(Link) <{ isBack: boolean }>`
    display: inline-block;
    background-color: ${({ theme, isBack }) =>
        isBack ? theme.colors.blue050 : theme.colors.blue100};
    color: ${({ theme, isBack }) =>
        isBack ? theme.colors.default : theme.colors.surface};
    border-radius: 100px;
    border: none;
    padding: 10px 24px;
    font-size: 16px;
    text-align: center;
    transition: all 0.3s ease-in;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme, isBack }) =>
        isBack ? theme.colors.blue070 : theme.colors.blue110};
    }

    &:disabled {
        background-color: ${({ theme }) => theme.colors.disabledbtn};
        color: ${({ theme }) => theme.colors.disabled};
    }
`;
