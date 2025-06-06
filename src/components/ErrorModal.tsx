import React from 'react';
import styled from 'styled-components';
import Button from "./Button";
import warningIcon from "../assets/warning.svg";

interface ErrorModalProps {
    message: string;
    onClose: () => void;
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    z-index: 999;
`;

const ModalContent = styled.div`
    background: ${({ theme }) => theme.colors.surface};
    padding: 32px;
    border-radius: 16px;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);

    h2 {
        color: ${({ theme }) => theme.colors.red};
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
    }
    img {
        height: 32px;
        width: 32px;
        margin-bottom: 6px;
    }
    p {
        margin-bottom: 32px;
    }
`;

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
    return (
        <ModalOverlay>
            <ModalContent>

                <h2><img src={warningIcon} alt="" />Ошибка</h2>
                <p>{message}</p>
                <Button text="Понятно" link="" onClick={onClose} />
            </ModalContent>
        </ModalOverlay>
    );
};

export default ErrorModal;
