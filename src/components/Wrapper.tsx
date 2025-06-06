import type { ReactNode } from "react";
import styled from 'styled-components';

const WrapperStl = styled.div`
    max-width: 904px;
    margin: 0 auto;
    padding-bottom: 32px;
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: 20px;

    @media ${({ theme }) => theme.device.tablet} {
        padding-bottom: 24px;
    }

    @media ${({ theme }) => theme.device.mobile} {
        padding-bottom: 16px;
    }
`;

type WrapperProps = {
    children: ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
    return (
        <WrapperStl>
            {children}
        </WrapperStl>
    );
}
