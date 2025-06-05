import styled from 'styled-components';

const ProgressStl = styled.div`
    display: flex;
    margin-bottom: 64px;
    
    div {
        height: 16px;
        width: 100%;
        background-color: ${({ theme }) => theme.colors.blue050};
        &:first-child {
            border-top-left-radius: 20px;
        }
        &:last-child {
            border-top-right-radius: 20px;
        }
    }
    div.filled {
        height: 16px;
        background-color: ${({ theme }) => theme.colors.blue070};
    }

    @media ${({ theme }) => theme.device.tablet} {
        margin-bottom: 32px;
    }
    @media ${({ theme }) => theme.device.mobile} {
        margin-bottom: 24px;
    }
`;

type ProgressProps = {
    step: number;
};

export default function Progress({ step }: ProgressProps) {
    return (
        <ProgressStl>
            {[1, 2, 3].map((i) => (
                <div key={i} className={step >= i ? 'filled' : ''} />
            ))}
        </ProgressStl>
    );
}
