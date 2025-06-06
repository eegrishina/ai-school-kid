import styled from "styled-components";

export const EmotionalStateSelectorStl = styled.div`
    .emoji-options {
        display: flex;
        justify-content: space-around;
        gap: 24px;

        > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }

        button {
            border: none;
            border-radius: 50%;
            height: 60px;
            width: 60px;
            background-color: #E1F8E9;
            cursor: pointer;

            &:hover, &:active, &:focus, &.selected {
                background-color: ${({ theme }) => theme.colors.violet};
            }

            span {
                font-size: 2.2rem;
                line-height: 1.9;
            }
        }
    }

    @media ${({ theme }) => theme.device.tablet} {
        .emoji-options {
            flex-direction: column;
            justify-content: space-between;
            gap: 16px;
            font-size: 14px;

            > div {
                flex-direction: row;
                align-items: center;
                gap: 8px;
            }
        }
    }

    @media ${({ theme }) => theme.device.mobile} {
        .emoji-options {
            button {
                height: 40px;
                width: 40px;
    
                span {
                    font-size: 1.5rem;
                    line-height: 1.9;
                }
            }
        }
    }
`;
