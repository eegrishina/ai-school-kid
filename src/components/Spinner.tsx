import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const SpinnerStl = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-top-color: ${({ theme }) => theme.colors.violet};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-left: 8px;
`;

export default function Spinner() {
    return <SpinnerStl />;
}
