import styled from "styled-components";

export const AllQuestionsStl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 64px;

    .questions-block {
        display: flex;
        flex-direction: column;
        gap: 32px;

        > div {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .radio-group {
                display: flex;
                gap: 24px;

                > label {
                    font-size: 12px;
                    cursor: pointer;
                    
                    > input {
                        cursor: pointer;
                    }
                }
            }
            
            > input {
                border: 2px solid ${({ theme }) => theme.colors.muted};
                border-radius: 6px;
                height: 40px;
                width: 100%;
                padding: 10px 12px;

                &:hover, &:active, &:focus, &:valid {
                    border-color: ${({ theme }) => theme.colors.violet};
                }
            }
        }
    }

    .required {
        color: ${({ theme }) => theme.colors.red};
    }
`;
